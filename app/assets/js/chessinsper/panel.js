import { saveSetting } from "../gui/settings.js";

let storage,
  panel,
  activationButton,
  sessionStatus,
  sessionTimer,
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
async function sessionStates() {
  if (!window.USERSCRIPT?.listValues) return [];
  const profile = SETTING_FILTER_OBJ.profileID;
  const keys = (await USERSCRIPT.listValues()).filter(
    (key) =>
      key.startsWith("ChessinsperBehavior:") && key.endsWith(":" + profile),
  );
  return (
    await Promise.all(
      keys.map(async (key) => ({ key, value: await USERSCRIPT.getValue(key) })),
    )
  ).filter((entry) => entry.value?.version === 1);
}
async function refreshSessionStatus() {
  if (!sessionStatus) return;
  try {
    const states = (await sessionStates()).sort(
      (a, b) => b.value.updatedAt - a.value.updatedAt,
    );
    if (!states.length) {
      sessionStatus.textContent =
        "Abra uma partida para acompanhar a sessão deste perfil.";
      return;
    }
    sessionStatus.textContent = states
      .map(({ key, value }) => {
        const s = value.status;
        const wait =
          s.waitUntil > Date.now()
            ? ` · ${Math.ceil((s.waitUntil - Date.now()) / 1000)} s`
            : "";
        const stale =
          Date.now() - value.updatedAt > 30000 ? " · último estado salvo" : "";
        return `${key.split(":")[1]} · ${s.reason}${wait}${stale}\n${s.games} partidas · ${s.wins} vitórias / ${s.losses} derrotas / ${s.draws} empates${s.unknown ? ` / ${s.unknown} sem resultado identificado` : ""}\nELO efetivo ${s.effectiveRating} · ${s.totalGames} partidas no histórico · ${s.moves} lances · perda média ${s.averageCPLoss} cp · ${s.recoveries} retomadas AFK`;
      })
      .join("\n\n");
  } catch (error) {
    console.warn("Chessinsper session status:", error);
  }
}
async function sessionCommand(type) {
  const states = await sessionStates();
  for (const { key } of states)
    USERSCRIPT.setValue(key + ":command", {
      type,
      id: `${Date.now()}:${Math.random()}`,
    });
  if (!states.length)
    toast.message("Abra uma partida para controlar a sessão.");
  else toast.message("Comando enviado à sessão deste perfil.");
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
  void refreshSessionStatus();
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
  const sessions = group("Sessões, fila e AFK");
  control(sessions, "session.enabled", "Aplicar limites de sessão");
  control(
    sessions,
    "session.autoQueue",
    "Nova partida automática (requer Auto Move)",
  );
  for (const [path, label, min, max, step] of [
    ["session.maxGamesPerSession", "Partidas por sessão", 1, 100, 1],
    [
      "session.breakDurationMs",
      "Intervalo de sessão (ms)",
      1000,
      86400000,
      1000,
    ],
    [
      "session.maxWinStreak",
      "Pausar após vitórias seguidas (0 = desligado)",
      0,
      100,
      1,
    ],
    ["session.maxGamesPerHour", "Partidas por hora", 1, 100, 1],
    [
      "session.betweenGamesMs.min",
      "Pausa mínima entre partidas (ms)",
      0,
      300000,
      1000,
    ],
    [
      "session.betweenGamesMs.max",
      "Pausa máxima entre partidas (ms)",
      0,
      300000,
      1000,
    ],
  ])
    control(sessions, path, label, { type: "number", min, max, step });
  control(
    sessions,
    "tcLock.enabled",
    "Manter o ritmo de jogo durante a sessão",
  );
  control(sessions, "afk.enabled", "Recuperar sessão após AFK ou suspensão");
  control(
    sessions,
    "afk.localKeepAlive",
    "Pulso WebRTC local para segundo plano",
  );
  const afkNote = document.createElement("p");
  afkNote.className = "chessinsper-description";
  afkNote.textContent =
    "O AFK retoma o estado salvo quando o navegador permite. No celular, mantenha o painel aberto: o sistema pode suspender as abas. O pulso local é opcional e pode aumentar o consumo de bateria.";
  sessions.append(afkNote);
  sessionStatus = document.createElement("div");
  sessionStatus.id = "chessinsper-session-status";
  sessionStatus.className = "chessinsper-session-status";
  sessionStatus.setAttribute("aria-live", "polite");
  sessions.append(sessionStatus);
  const sessionActions = document.createElement("div");
  sessionActions.className = "chessinsper-actions";
  for (const [type, label] of [
    ["pause", "Pausar sessão"],
    ["resume", "Retomar sessão"],
    ["reset", "Reiniciar sessão"],
  ]) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.onclick = () => sessionCommand(type);
    sessionActions.append(button);
  }
  sessions.append(sessionActions);
  const account = group("Comportamento entre partidas");
  control(account, "warmup.enabled", "Aquecimento gradual do ELO");
  control(
    account,
    "warmup.manualOverride",
    "Usar ELO configurado durante o aquecimento",
  );
  control(account, "warmup.durationGames", "Partidas para aquecer", {
    type: "number",
    min: 1,
    max: 100,
    step: 1,
  });
  control(account, "warmup.startEloOffset", "Redução inicial de ELO", {
    type: "number",
    min: -1000,
    max: 0,
    step: 50,
  });
  control(
    account,
    "weaknessProfile.enabled",
    "Fraquezas e ritmo consistentes por perfil",
  );
  control(account, "seed", "Semente da personalidade", { type: "text" });
  control(account, "tilt.enabled", "Variar comportamento após derrota");
  control(account, "tilt.durationGames", "Partidas de variação após derrota", {
    type: "number",
    min: 1,
    max: 10,
    step: 1,
  });
  control(
    account,
    "tilt.suboptimalBoost",
    "Variação extra na escolha (0 a 0,3)",
    { type: "number", min: 0, max: 0.3, step: 0.01 },
  );
  control(account, "tilt.timingMult", "Espera após derrota (multiplicador)", {
    type: "number",
    min: 0.5,
    max: 3,
    step: 0.1,
  });
  control(
    account,
    "hardwarePersona.enabled",
    "Personalidade de clique e arraste",
  );
  control(
    account,
    "opponentAdaptation.enabled",
    "Adaptar ELO ao adversário após aquecimento",
  );
  control(
    account,
    "opponentAdaptation.ratingEdge",
    "Diferença de ELO sobre o adversário",
    { type: "number", min: -500, max: 500, step: 50 },
  );
  control(
    account,
    "annotations.enabled",
    "Anotar candidatos durante reflexão longa",
  );
  control(
    account,
    "annotations.minThinkMs",
    "Reflexão mínima para anotar (ms)",
    { type: "number", min: 1000, max: 60000, step: 500 },
  );
  control(
    account,
    "annotations.chancePerLongThink",
    "Chance de anotação (0 a 1)",
    { type: "number", min: 0, max: 1, step: 0.1 },
  );
  control(
    account,
    "autoResign.enabled",
    "Abandonar automaticamente em posição perdida",
  );
  control(
    account,
    "autoResign.evalThreshold",
    "Avaliação para abandono (peões)",
    { type: "number", min: -30, max: -0.5, step: 0.5 },
  );
  control(
    account,
    "autoResign.consecutiveMoves",
    "Posições perdidas seguidas para abandonar",
    { type: "number", min: 1, max: 20, step: 1 },
  );
  control(
    account,
    "autoResign.minMoveNumber",
    "Número mínimo do lance para abandono",
    { type: "number", min: 1, max: 100, step: 1 },
  );
  control(account, "autoResign.resignChance", "Chance de abandono (0 a 1)", {
    type: "number",
    min: 0,
    max: 1,
    step: 0.1,
  });
  control(
    account,
    "winrateTarget.enabled",
    "Adaptar força à taxa recente de vitórias",
  );
  control(account, "winrateTarget.target", "Taxa de vitórias alvo (0 a 1)", {
    type: "number",
    min: 0,
    max: 1,
    step: 0.01,
  });
  control(
    account,
    "winrateTarget.sampleGames",
    "Partidas consideradas na taxa",
    { type: "number", min: 2, max: 50, step: 1 },
  );
  control(account, "idleMouse.enabled", "Movimento do cursor durante espera");
  control(
    account,
    "idleMouse.triggerAfterMs",
    "Espera antes de mover o cursor (ms)",
    { type: "number", min: 1000, max: 60000, step: 500 },
  );
  control(account, "postGame.enabled", "Pausa de revisão após a partida");
  control(
    account,
    "postGame.reviewChance",
    "Chance de pausa de revisão (0 a 1)",
    { type: "number", min: 0, max: 1, step: 0.05 },
  );
  for (const [key, label] of [
    ["min", "Revisão mínima (ms)"],
    ["max", "Revisão máxima (ms)"],
  ])
    control(account, `postGame.reviewDurationMs.${key}`, label, {
      type: "number",
      min: 0,
      max: 300000,
      step: 1000,
    });
  const coach = group("Coach e estudo");
  control(coach, "coach.enabled", "Ativar Coach");
  control(
    coach,
    "coach.disableAutoOnEnable",
    "Suspender execução automática durante Coach",
  );
  control(coach, "coach.showAlternatives", "Explicar alternativas próximas");
  control(coach, "coach.showThreats", "Mostrar resposta prevista");
  control(
    coach,
    "coach.showHangingPieces",
    "Incluir peças penduradas nas marcações",
  );
  control(
    coach,
    "coach.altEvalWindow",
    "Diferença máxima das alternativas (peões)",
    { type: "number", min: 0, max: 5, step: 0.1 },
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
  sessionTimer = setInterval(() => {
    if (!document.hidden) void refreshSessionStatus();
  }, 3000);
  window.addEventListener("pagehide", () => clearInterval(sessionTimer), {
    once: true,
  });
}
