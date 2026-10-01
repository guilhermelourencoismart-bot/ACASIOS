import { saveSetting } from "../gui/settings.js";

let storage,
  panel,
  activationButton,
  saving = Promise.resolve(),
  initialized = false;
const clone = (value) => JSON.parse(JSON.stringify(value));
const readPath = (object, path) =>
  path.split(".").reduce((value, key) => value?.[key], object);
const writePath = (object, path, value) => {
  const keys = path.split("."),
    key = keys.pop();
  keys.reduce((value, part) => value[part], object)[key] = value;
};

function control(parent, path, label, options = {}) {
  const field = document.createElement("label");
  field.className = "chessinsper-field";
  const title = document.createElement("span");
  title.textContent = label;
  field.append(title);
  const input = document.createElement(options.options ? "select" : "input");
  input.dataset.chessinsper = path;
  input.setAttribute("aria-label", label);
  if (options.options)
    for (const [value, text] of options.options) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      input.append(option);
    }
  else {
    input.type = options.type || "checkbox";
    for (const key of ["min", "max", "step"])
      if (options[key] != null) input[key] = options[key];
  }
  input.addEventListener("change", () => {
    const value =
      input.type === "checkbox"
        ? input.checked
        : input.type === "number" || input.type === "range"
          ? Number(input.value)
          : input.value;
    const settings = ChessinsperCore.normalizeSettings(storage.value);
    writePath(settings, path, value);
    commit(settings);
  });
  field.append(input);
  parent.append(field);
  return input;
}
function group(title, open = false) {
  const details = document.createElement("details");
  details.open = open;
  const summary = document.createElement("summary");
  summary.textContent = title;
  details.append(summary);
  const body = document.createElement("div");
  body.className = "chessinsper-grid";
  details.append(body);
  panel.append(details);
  return body;
}
function commit(settings) {
  const value = JSON.stringify(ChessinsperCore.normalizeSettings(settings)),
    filter = { ...SETTING_FILTER_OBJ };
  storage.value = value;
  refreshChessinsperPanel();
  const snapshot = storage.cloneNode();
  snapshot.value = value;
  saving = saving
    .then(async () => {
      await saveSetting(snapshot, true, filter);
    })
    .catch((error) => {
      console.error("Chessinsper settings:", error);
      toast.error("Não foi possível salvar o perfil Chessinsper.");
    });
  return saving;
}
export function refreshChessinsperPanel() {
  if (!storage || !panel) return;
  const settings = ChessinsperCore.normalizeSettings(storage.value);
  for (const input of panel.querySelectorAll("[data-chessinsper]")) {
    const value = readPath(settings, input.dataset.chessinsper);
    if (input.type === "checkbox") input.checked = !!value;
    else input.value = value;
  }
  panel.classList.toggle("chessinsper-disabled", !settings.enabled);
  if (activationButton) {
    activationButton.disabled = !SETTING_FILTER_OBJ.profileID;
    activationButton.textContent = settings.enabled
      ? "Chessinsper ativo · Desativar"
      : "Ativar Chessinsper";
    activationButton.setAttribute("aria-pressed", String(settings.enabled));
    activationButton.title = `Perfil: ${SETTING_FILTER_OBJ.profileID || "padrão"}`;
  }
  // Show one set of style and arrow controls while this profile owns them.
  for (const key of [
    "engineElo",
    "candidatePoolSize",
    "playStyle",
    "aggressionLevel",
    "riskLevel",
    "autoMoveLegit",
    "autoMoveRandom",
    "arrowOpacity",
    "primaryArrowColorHex",
    "secondaryArrowColorHex",
    "opponentArrowColorHex",
    "showOpponentMoveGuess",
    "showOpponentMoveGuessConstantly",
    "moveSuggestionAmount",
  ]) {
    const input = document.querySelector(`input[data-key="${key}"]`);
    const field = input?.closest(".custom-input");
    if (field)
      field.classList.toggle("chessinsper-native-hidden", settings.enabled);
  }
}
export function initializeChessinsperPanel() {
  if (initialized) return;
  initialized = true;
  activationButton = document.createElement("button");
  activationButton.id = "chessinsper-activate";
  activationButton.type = "button";
  activationButton.className = "chessinsper-activate";
  activationButton.setAttribute("aria-controls", "chessinsper-panel");
  activationButton.addEventListener("click", async () => {
    const settings = ChessinsperCore.normalizeSettings(storage.value);
    settings.enabled = !settings.enabled;
    await commit(settings);
    if (settings.enabled) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      panel.querySelector("details").open = true;
    }
  });
  document.body.append(activationButton);
  panel = document.createElement("section");
  panel.id = "chessinsper-panel";
  panel.className = "setting-panel chessinsper-panel";
  const heading = document.createElement("div");
  heading.className = "setting-panel-title";
  heading.textContent = "Chessinsper · Personalidade, visual e automação";
  panel.append(heading);
  const note = document.createElement("p");
  note.className = "chessinsper-description";
  note.textContent =
    "Configure o comportamento deste perfil com a engine escolhida acima. Seus controles são salvos junto ao perfil do A.C.A.S.";
  panel.append(note);
  storage = document.createElement("input");
  storage.type = "hidden";
  storage.dataset.key = "chessinsper";
  storage.dataset.defaultValue = JSON.stringify(ChessinsperCore.defaults());
  storage.value = storage.dataset.defaultValue;
  panel.append(storage);
  control(panel, "enabled", "Usar funções Chessinsper neste perfil");
  const engine = group("Força e análise", true);
  control(engine, "engineUI.strength", "Força do perfil (ELO)", {
    type: "number",
    min: 400,
    max: 3000,
    step: 50,
  });
  control(engine, "engineUI.analysisQuality", "Qualidade da análise", {
    options: [
      ["fast", "Rápida"],
      ["balanced", "Equilibrada"],
      ["deep", "Profunda"],
    ],
  });
  control(engine, "engineUI.depthMode", "Profundidade", {
    options: [
      ["auto", "Adaptar ao perfil"],
      ["manual", "Manual"],
    ],
  });
  control(engine, "engineUI.manualDepth", "Profundidade manual", {
    type: "number",
    min: 1,
    max: 22,
    step: 1,
  });
  control(engine, "engineUI.candidateMoves", "Candidatos para comparar", {
    type: "number",
    min: 1,
    max: 20,
    step: 1,
  });
  control(engine, "engineUI.playingStyle", "Estilo de jogo", {
    options: [
      ["universal", "Universal"],
      ["aggressive", "Agressivo"],
      ["tactical", "Tático"],
      ["positional", "Posicional"],
      ["defensive", "Defensivo"],
      ["endgame_specialist", "Especialista em finais"],
    ],
  });
  control(engine, "engineUI.humanMode", "Seleção humana de candidatos");
  control(engine, "engineUI.eloCalibration", "Calibrar qualidade pelo ELO");
  control(engine, "engineUI.openingBook", "Preferir candidatos do repertório");
  const preset = document.createElement("select");
  preset.setAttribute("aria-label", "Preset Chessinsper");
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Aplicar preset…";
  defaultOption.value = "";
  preset.append(defaultOption);
  const presets = ChessinsperCore.createRuntime().presets;
  for (const name of Object.keys(presets)) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    preset.append(option);
  }
  preset.addEventListener("change", () => {
    if (!presets[preset.value]) return;
    const s = ChessinsperCore.normalizeSettings(storage.value),
      p = presets[preset.value];
    s.engineUI = {
      ...s.engineUI,
      ...clone(p),
      personality: { ...s.engineUI.personality, ...p.personality },
      advanced: { ...s.engineUI.advanced, ...p.advanced },
    };
    commit(s);
    preset.value = "";
  });
  engine.append(preset);
  const personality = group("Personalidade e precisão");
  for (const [key, label] of Object.entries({
    creativity: "Criatividade",
    risk: "Risco",
    tactical: "Tática",
    positional: "Posicional",
    kingSafety: "Segurança do rei",
    materialInitiative: "Iniciativa sobre material",
    attackPreference: "Preferência por ataques",
    exchangePreference: "Preferência por trocas",
    queenTradePreference: "Troca de damas",
    simplification: "Simplificação",
  }))
    control(personality, `engineUI.personality.${key}`, label, {
      type: "number",
      min: 0,
      max: 100,
      step: 5,
    });
  for (const [key, label] of Object.entries({
    openingStrength: "Força na abertura (%)",
    middlegameStrength: "Força no meio-jogo (%)",
    endgameStrength: "Força no final (%)",
    consistency: "Consistência",
    mistakeSeverity: "Intensidade dos erros",
    alternativeQuality: "Qualidade das alternativas",
    humanVariation: "Variação humana",
    movePrecision: "Precisão",
  }))
    control(personality, `engineUI.advanced.${key}`, label, {
      type: "number",
      min: key.endsWith("Strength") ? 70 : 0,
      max: key.endsWith("Strength") ? 125 : 100,
      step: 5,
    });
  control(personality, "engineUI.advanced.mistakeProfile", "Perfil de erros", {
    options: [
      ["off", "Sem erros intencionais"],
      ["rare", "Raros"],
      ["natural", "Naturais"],
      ["frequent", "Frequentes"],
    ],
  });
  for (const [key, label] of Object.entries({
    comebackMode: "Adaptação em desvantagem",
    conversionMode: "Converter vantagem",
    criticalBoost: "Mais análise em posições críticas",
    easyRelaxation: "Menos análise em posições simples",
    autoBalance: "Equilibrar o perfil automaticamente",
  }))
    control(personality, `engineUI.advanced.${key}`, label);
  const arrows = group("Setas e leitura do tabuleiro");
  control(arrows, "visualIntelligence.enabled", "Exibir leitura visual");
  control(arrows, "visualIntelligence.maxArrows", "Limite de setas", {
    type: "number",
    min: 0,
    max: 20,
    step: 1,
  });
  control(arrows, "visualIntelligence.arrowScale", "Tamanho das setas", {
    type: "number",
    min: 0.25,
    max: 2,
    step: 0.05,
  });
  control(arrows, "visualIntelligence.lineWidth", "Espessura das setas", {
    type: "number",
    min: 0.5,
    max: 8,
    step: 0.5,
  });
  control(
    arrows,
    "visualIntelligence.arrowOpacity",
    "Opacidade das setas (%)",
    { type: "number", min: 0, max: 100, step: 5 },
  );
  control(arrows, "visualIntelligence.pieceFilter", "Mostrar setas de", {
    options: [
      ["all", "Todas as peças"],
      ["p", "Peões"],
      ["n", "Cavalos"],
      ["b", "Bispos"],
      ["r", "Torres"],
      ["q", "Damas"],
      ["k", "Rei"],
    ],
  });
  for (const [key, label] of Object.entries({
    bestMove: "Lance escolhido",
    alternatives: "Alternativas",
    threats: "Resposta do adversário",
    showOnlyOwnTurn: "Visual apenas na minha vez",
    pins: "Peças cravadas",
    pinValues: "Valor das cravadas",
    hanging: "Peças penduradas",
    loose: "Peças sem defesa",
    vulnerableOwn: "Minhas peças vulneráveis",
    vulnerableEnemy: "Peças adversárias vulneráveis",
    ownVision: "Controle das minhas peças",
    enemyVision: "Controle adversário",
    contested: "Casas disputadas",
    safeSquares: "Casas seguras",
    neutralSquares: "Casas neutras",
    controlIntensity: "Intensidade do controle",
    attackerDefenderBalance: "Atacantes × defensores",
    kingSafety: "Segurança do rei",
    kingDiagonals: "Diagonais do rei",
    potentialChecks: "Xeques possíveis",
    pawnStructure: "Estrutura de peões",
    weakSquares: "Casas fracas",
    xray: "Raios-X e ataques descobertos",
    overloaded: "Peças sobrecarregadas",
    forks: "Garfos",
    forkPotential: "Garfos possíveis",
    trapped: "Peças presas",
    pieceContributions: "Contribuição das peças",
  }))
    control(arrows, `visualIntelligence.${key}`, label);
  control(
    arrows,
    "visualIntelligence.markerOpacity",
    "Opacidade das marcações",
    { type: "number", min: 0, max: 1, step: 0.05 },
  );
  control(arrows, "visualIntelligence.markerScale", "Tamanho das marcações", {
    type: "number",
    min: 0.25,
    max: 2,
    step: 0.05,
  });
  for (const [key, label] of Object.entries({
    best: "Cor do lance escolhido",
    alt: "Cor das alternativas",
    response: "Cor da resposta",
    own: "Cor do controle próprio",
    enemy: "Cor do controle adversário",
    contested: "Cor das casas disputadas",
    safe: "Cor das casas seguras",
    neutral: "Cor das casas neutras",
    ownPin: "Cor das minhas cravadas",
    enemyPin: "Cor das cravadas adversárias",
    weak: "Cor de vulnerabilidade",
  }))
    control(arrows, `visualIntelligence.colors.${key}`, label, {
      type: "color",
    });
  const automation = group("Automação");
  for (const key of ["autoMove", "autoMoveAfterUser"]) {
    const input = document.querySelector(`input[data-key="${key}"]`);
    const field = input?.closest(".custom-input");
    if (field) automation.append(field);
  }
  control(automation, "automation.method", "Execução do lance", {
    options: [
      ["mixed", "Alternar clique e arraste"],
      ["click", "Clique"],
      ["drag", "Arraste"],
    ],
  });
  control(automation, "dragSpeed", "Duração do arraste (multiplicador)", {
    type: "number",
    min: 0.25,
    max: 3,
    step: 0.25,
  });
  control(automation, "automation.minDelayMs", "Espera mínima (ms)", {
    type: "number",
    min: 0,
    max: 60000,
    step: 100,
  });
  control(automation, "automation.maxDelayMs", "Espera máxima (ms)", {
    type: "number",
    min: 0,
    max: 60000,
    step: 100,
  });
  control(automation, "automation.clockAware", "Adaptar a espera ao relógio");
  control(automation, "inputExecution.maxAttempts", "Tentativas por lance", {
    type: "number",
    min: 1,
    max: 3,
    step: 1,
  });
  control(
    automation,
    "inputExecution.confirmationTimeoutMs",
    "Tempo para confirmar o lance (ms)",
    { type: "number", min: 200, max: 5000, step: 100 },
  );
  const actions = document.createElement("div");
  actions.className = "chessinsper-actions";
  const importButton = document.createElement("button");
  importButton.type = "button";
  importButton.textContent = "Importar Chessinsper";
  const exportButton = document.createElement("button");
  exportButton.type = "button";
  exportButton.textContent = "Exportar Chessinsper";
  const file = document.createElement("input");
  file.type = "file";
  file.accept = ".json,application/json";
  file.hidden = true;
  importButton.onclick = () => file.click();
  file.onchange = async () => {
    try {
      if (!file.files[0]) return;
      const json = JSON.parse(await file.files[0].text());
      if (!json || (!json.engineUI && !json.chessinsper))
        throw new Error("Selecione um JSON de configurações do Chessinsper.");
      const input = json.chessinsper || json;
      if (input.timing?.base)
        input.automation = {
          ...input.automation,
          minDelayMs: input.timing.base.min,
          maxDelayMs: input.timing.base.max,
        };
      await commit(input);
      toast.message("Perfil Chessinsper importado.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      file.value = "";
    }
  };
  exportButton.onclick = () =>
    saveAs(
      new Blob(
        [
          JSON.stringify(
            ChessinsperCore.normalizeSettings(storage.value),
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
      "chessinsper-profile.json",
    );
  actions.append(importButton, exportButton, file);
  panel.append(actions);
  document.querySelector("#move-control-panel").after(panel);
  const logo = document.querySelector("#acas-logo-secondary");
  if (logo) logo.classList.add("chessinsper-brand");
  document.addEventListener("acas:settings-loaded", refreshChessinsperPanel);
  storage.addEventListener("change", refreshChessinsperPanel);
  refreshChessinsperPanel();
}
