# A.C.A.S × Chessinsper

Esta versão do ACASIOS integra as funções de perfil, leitura visual e execução de lances do script enviado, **Chessrinsper — Stockfish 18 Mobile 1.2.1-rc.1**, à base do [A.C.A.S](https://github.com/Psyyke/A.C.A.S).

A base foi atualizada para **A.C.A.S 2.5.0**, commit oficial `8522bf6bfb2363e666b8fd655327a39d885d0124`, de 1º de outubro de 2026. O userscript integrado é **2.5.0-chessinsper.3**. A atualização mantém as funções nativas, incluindo Stockfish 19, configurações dinâmicas, registro de atividade, avaliação de lances, variantes, livros de abertura e personalização da interface. Veja o [relatório para o usuário](RELATORIO-USUARIO.md).

A engine é escolhida, carregada e executada pelo A.C.A.S. Chessinsper configura a análise e escolhe entre os candidatos legais retornados por ela. Setas, textos e marcações usam o `UniversalBoardDrawer` já empregado pelo A.C.A.S, tanto na interface quanto no tabuleiro externo.

## Instalar e usar

1. Instale ou atualize **[acas.user.js](acas.user.js)** no seu gerenciador de userscripts. Se preferir copiar o código, use **[acas.user.txt](acas.user.txt)**, que tem o mesmo conteúdo. O arquivo já inclui os componentes Chessinsper; não é necessário instalar outro script.
2. Desative o Chessrinsper standalone para evitar dois scripts executando movimentos ou desenhando simultaneamente.
3. Abra a interface **desta versão do ACASIOS**, selecione um perfil e uma das engines disponíveis no A.C.A.S.
4. Toque no botão flutuante **Ativar Chessinsper**, no canto inferior direito. Ele ativa o perfil selecionado e leva você ao painel **Chessinsper · Personalidade, visual e automação**. Ajuste força, estilo, candidatos e aparência das setas. As configurações acompanham o perfil selecionado, inclusive os filtros de instância do A.C.A.S. Instalações novas começam com Chessinsper desligado; perfis existentes conservam a ativação salva.
5. Para executar lances, habilite **Auto Move** dentro do grupo Automação. Essa opção continua desligada por padrão. **After User** preserva a primeira posição observada para que você faça o lance inicial.

É necessário atualizar a interface e o userscript juntos, pois eles usam novos comandos de comunicação. As versões públicas do A.C.A.S upstream não incluem esse painel.

O mesmo botão desativa Chessinsper e restaura as configurações nativas da engine. Ativar Chessinsper não liga **Auto Move**. No celular, o botão respeita as margens seguras da tela; a disponibilidade da engine depende dos recursos do navegador. Quando falta memória compartilhada, as engines que a exigem usam Stockfish 19 Lite Single como alternativa.

## Funções integradas

| Área                      | Comportamento                                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Engine                    | Força de 400–3000, profundidade automática ou manual, qualidade da análise, quantidade de candidatos e opções UCI suportadas pela engine escolhida.                                                                                                          |
| Personalidade             | Presets do script original, estilos de jogo, criatividade, risco, tática, jogo posicional, segurança do rei, trocas, simplificação, precisão e variação por fase.                                                                                            |
| Seleção                   | Modelo original de seleção humana e calibração de força aplicado aos candidatos legais da engine do A.C.A.S. Preferência opcional pelos candidatos do repertório nativo.                                                                                     |
| Setas                     | Limite de sugestões, escala, espessura, opacidade, cores, filtro por peça, alternativas e resposta do adversário. Zero sugestões limpa as setas sem executar outro lance.                                                                                    |
| Leitura visual            | Cravadas e seus valores, peças vulneráveis, controle de casas, segurança do rei, estrutura de peões, raios-X, garfos e outros indicadores calculados pelo `BoardIntelligence` original.                                                                      |
| Automação                 | Clique, arraste ou alternância, espera configurável com adaptação ao relógio, confirmação da posição resultante, tentativas limitadas e cancelamento ao desligar Auto Move ou alterar o comportamento do perfil.                                             |
| Sessões e fila            | Histórico por perfil/site, resultados sem duplicação, limites por sessão/hora e por vitórias seguidas, pausa entre partidas, revisão pós-jogo, travamento do ritmo e fila automática com três tentativas no máximo. Pausar, retomar e reiniciar pelo painel. |
| AFK                       | Worker com timer de reserva, checkpoints GM, recuperação por foco, visibilidade, retorno de suspensão e restauração da aba. WebRTC local opcional, sem servidor ICE externo. Recursos liberados ao desligar.                                                 |
| Comportamento persistente | Aquecimento gradual do ELO, perfil de fraquezas com semente, ritmo consistente, variação após derrotas, personalidade de clique/arraste, ajuste opcional à taxa de vitórias e ao rating do adversário.                                                       |
| Coach e complementos      | Melhor candidato e alternativas próximas, resposta prevista e peças penduradas; execução suspensa por padrão durante Coach. Anotações nativas em reflexões longas, cursor durante espera e abandono opcional com confirmação e prazo limite.                 |
| Configuração              | Persistência por perfil e importação/exportação de JSON Chessinsper. A importação aceita o objeto de configuração antigo e descarta campos de provedores de engine.                                                                                          |

O ELO é um alvo do perfil, sem garantia de equivalência com um rating de plataforma. Quando a engine anuncia opções UCI de força, seus limites são respeitados; abaixo deles, a profundidade e a seleção de candidatos fazem a adaptação. A qualidade das alternativas depende da engine e da análise realizada.

As funções Chessinsper se aplicam ao xadrez padrão em tabuleiros 8×8. Variantes e Chess960 continuam usando o fluxo nativo do A.C.A.S.

Os carregadores Stockfish 18, APIs e provedores externos do script enviado não foram incorporados. A interface flutuante e seu renderizador separado também foram substituídos pelos componentes do A.C.A.S. O estado persistente de comportamento é mantido por perfil/site, sem login nem troca de contas. Banco remoto de partidas e alterações das APIs de visibilidade do navegador não foram incorporados. Os controles visuais e de análise passam pelos componentes nativos, e os recursos opcionais de cursor/anotação ficam desligados inicialmente. Engines, temas, fontes e repertórios já presentes no A.C.A.S continuam disponíveis.

## Estado e ciclo de vida

As configurações permanecem em `AcasConfig`, junto ao perfil nativo. Histórico e sessão ficam separados em `ChessinsperBehavior:<site>:<perfil>`, com resultados, movimentos e avaliações limitados em memória/armazenamento. Uma identificação da partida persiste entre recarregamentos; a mesma posição final não credita outra partida. Resultados inicialmente desconhecidos podem ser identificados depois, sem incrementar a quantidade de partidas novamente.

A execução e a fila compartilham uma concessão temporária por perfil/site: somente uma aba controla o comportamento. A aba em espera não sobrescreve os resultados da aba ativa. Após suspensão, a concessão é renovada e o estado mais recente é restaurado antes de qualquer ação. Retomar pede uma análise nova ao A.C.A.S.

A fila exige Chessinsper ativo, Auto Move, a opção de nova partida automática, fim da partida e um botão reconhecido/visível. Não procura botões genéricos fora do diálogo de fim de jogo. Limites e esperas usam horários persistidos, sem uma sequência longa de sleeps; desativar, pausar ou trocar o perfil impede a próxima ação. O abandono opcional verifica posições distintas, respeita seu prazo, revalida o estado e libera a execução se o controle não responder.

AFK mantém o estado e tenta retomar a análise nativa. Não pode impedir que iOS/Safari suspenda ou encerre uma aba, nem manter uma engine executando quando o sistema bloqueia a aba do painel.

## Desenvolvimento

Os componentes editáveis estão em `userscript-components/ChessinsperCore.js`, `userscript-components/ChessinsperAutomation.js` e `userscript-components/ChessinsperBehavior.js`. A integração da interface fica em `app/assets/js/chessinsper/`. Depois de alterar um componente do userscript, gere novamente o arquivo instalável:

```sh
node scripts/build-userscript.mjs
node tests/chessinsper.test.mjs
node tests/chessinsper-behavior.test.mjs
```

A geração também atualiza `acas.user.txt`, mantendo as versões para instalação e cópia com o mesmo conteúdo.

O teste funcional requer a aplicação servida com os cabeçalhos de isolamento necessários às engines WASM, Chromium e Playwright. No ambiente de desenvolvimento preparado para este repositório:

```sh
bash /workspace/acasios-cloud/start.sh
node scripts/test-chessinsper-browser.cjs
```

`ACAS_TEST_BASE_URL` permite apontar o teste para outra instalação local. `ACAS_TEST_SCREENSHOT_DIR` salva capturas do painel. O teste injeta uma implementação local das APIs GM, verifica a comunicação real entre duas abas locais e usa a engine Stockfish existente no repositório; a execução de movimentos é verificada em um tabuleiro artificial.

Passaram **27 testes de lógica**, **16 verificações no Chromium** e **6 testes básicos nativos**. Foram verificados cálculos reais com Stockfish 19 Lite Single, desenho nativo de setas e indicadores, persistência, separação de perfis, layout em viewport móvel, retorno às configurações nativas e execução/cancelamento locais, incluindo arraste e promoção a cavalo. A fila, os comandos de sessão, a estatística sem duplicação, a retomada AFK e a exclusividade da aba foram verificados no userscript compilado com fixtures locais. A execução em sites reais e em Safari/iOS precisa de validação nesses ambientes; viewport móvel do Chromium não equivale a esse teste.

A suíte oficial `app/dev/dynamic-graph-tests.html` apresentou 146 verificações aprovadas em 149. As três falhas também ocorrem na base oficial sem alterações: a fixture do visualizador de atividade, a fixture de mudança de variante e o texto de contexto ausente nos atalhos. Os seis testes de funcionamento básico do ambiente passaram. O caminho relativo de abertura na página de desenvolvimento ainda produz um 404; o carregamento das aberturas na interface funciona.

## Origem e licença

Os módulos de comportamento e inteligência visual foram adaptados do script fornecido pelo usuário, identificado com `@author Chessrinsper` e `@license MIT`. Os cabeçalhos dos componentes preservam essa atribuição. O projeto A.C.A.S mantém sua licença GPL-3.0.
