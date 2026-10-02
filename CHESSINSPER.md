# Chessinsper como complemento do A.C.A.S oficial

A distribuição atual usa **dois userscripts**: o [A.C.A.S original](https://github.com/Psyyke/A.C.A.S) e [chessinsper-acas.user.js](chessinsper-acas.user.js). O complemento também está disponível em [TXT](chessinsper-acas.user.txt), com conteúdo idêntico. O fork ACASIOS e sua interface deixam de ser necessários para esta instalação.

## Instalação

1. Desative o Chessrinsper antigo e o userscript integrado `A.C.A.S × Chessinsper`, se estiverem instalados.
2. Instale o **[userscript oficial A.C.A.S](https://github.com/Psyyke/A.C.A.S/raw/refs/heads/main/acas.user.js)**.
3. Instale **[Chessinsper para A.C.A.S — Complemento](chessinsper-acas.user.js)** como **outro script** no mesmo gerenciador. Se usar o TXT, crie um novo userscript e substitua todo o código pelo conteúdo do arquivo. Mantenha os dois scripts habilitados.
4. Abra **[o painel oficial](https://psyyke.github.io/A.C.A.S/app/)**, escolha a engine e o perfil do A.C.A.S e toque em **Ativar Chessinsper**, no canto inferior direito.
5. Abra o tabuleiro no Chess.com ou Lichess, mantendo o painel oficial aberto. Os dois scripts precisam de permissão para executar tanto no painel quanto no site de xadrez.
6. Para jogar os lances, marque **Executar lances automaticamente** no grupo **Automação**. A ativação geral começa apenas com análise/visual. Para fila entre partidas, habilite também **Nova partida automática** no grupo **Sessões, fila e AFK**.

Mantenha a opção nativa **Display Moves On External Site** ligada. O complemento identifica a aba correta usando o transporte e o desenho externos do A.C.A.S. Modo Ghost Script ou ocultação do desenho externo pode impedir essa conexão.

O botão funciona por perfil. Desativar Chessinsper cancela a execução, interrompe seu AFK e restaura as opções nativas da engine. Os ajustes do complemento permanecem salvos. Durante a ativação, seus controles substituem os controles nativos equivalentes de automação/estilo/setas no painel; a configuração original do A.C.A.S é preservada.

## O que cada script faz

| A.C.A.S oficial | Chessinsper complementar |
| --- | --- |
| Detecta a posição e acompanha a partida | Aplica personalidade e seleção humana aos candidatos legais |
| Escolhe, carrega e executa suas próprias engines | Ajusta força, profundidade e quantidade de candidatos |
| Comunica-se com a aba do tabuleiro | Coordena comportamento, execução e retomada |
| Desenha setas e marcações com seu UniversalBoardDrawer | Define quantidade, aparência, filtros e leitura visual |
| Mantém sua interface, temas, fontes e recursos nativos | Acrescenta botão flutuante e grupos de configurações |

O complemento não carrega Stockfish, engines de IA ou APIs de engines do script antigo e não fornece outro renderizador de setas. Os arquivos oficiais, a interface hospedada e os dados `AcasConfig` não recebem modificações para instalar ou salvar o complemento. A conexão com as instâncias ocorre durante a execução do painel.

## Funções disponíveis

- **Análise e personalidade:** força alvo, qualidade/profundidade, presets, estilo, criatividade, risco, tática, segurança do rei, trocas, simplificação, precisão e variação por fase. Preferência opcional por candidatos do livro de abertura carregado no A.C.A.S.
- **Setas e leitura visual:** quantidade, escala, espessura, cores, opacidade, filtros por peça, alternativas e resposta adversária; cravadas, peças vulneráveis, controle de casas, segurança do rei, estrutura de peões, raios-X, garfos e outros indicadores. Todos os desenhos usam os componentes nativos. Zero setas não altera a automação.
- **Automação:** clique, arraste ou alternância, espera ajustável e adaptada ao relógio, confirmação da posição resultante, tentativas limitadas e cancelamento ao desativar ou trocar o comportamento. **Começar após meu primeiro lance** espera uma mudança da primeira posição sugerida.
- **Sessões:** resultados e histórico por perfil/site, limites por sessão/hora, pausa por vitórias seguidas, espera entre partidas, fila automática e botões de pausar, retomar e reiniciar.
- **AFK:** heartbeat em worker com timer de reserva, salvamento e retomada por foco/visibilidade/restauração. Pulso WebRTC local opcional, sem servidor ICE externo.
- **Comportamento persistente:** aquecimento do ELO, fraquezas com semente, ritmo consistente, variação após derrota, personalidade de clique/arraste, pausa de revisão, ajustes opcionais pela taxa recente de vitórias e rating adversário.
- **Coach e complementos:** explicação do candidato, alternativas e resposta prevista; suspende execução por padrão durante Coach. Anotações com desenho nativo, movimento opcional do cursor e abandono opcional com confirmação e prazo.
- **Configuração:** importação/exportação JSON, inclusive campos compatíveis das configurações antigas. Dados de provedores de engine são descartados.

Configuração e histórico ficam no armazenamento **do userscript Chessinsper**, separado do A.C.A.S. É necessário importar seu JSON antigo se quiser reaproveitá-lo; não há acesso automático ao armazenamento privado de outro userscript. O histórico do A.C.A.S/fork anterior também não é migrado automaticamente.

A execução e a fila têm uma concessão temporária por perfil/site: uma aba controla as ações, e as outras aguardam. A identificação da instância nativa impede enviar o lance a outra aba com a mesma posição. Após suspensão, a aba restaura o estado e pede nova análise nativa.

## Compatibilidade e limites

Validado com **A.C.A.S 2.5.0**, commit upstream `8522bf6bfb2363e666b8fd655327a39d885d0124`, e complemento **1.0.0**. A base oficial é instalada e atualizada diretamente pelo usuário; o complemento não fixa nem copia sua versão. Mudanças futuras nas interfaces internas do A.C.A.S podem exigir atualizar o complemento.

Os comportamentos Chessinsper atendem **xadrez padrão 8×8 em Chess.com e Lichess**. Variantes, Chess960 e engines externas seguem o fluxo nativo do A.C.A.S. Força ELO é um alvo de comportamento, sem equivalência garantida com ratings de plataformas; a variedade de candidatos depende da engine e de sua análise.

AFK não impede iOS/Safari de suspender ou encerrar abas e não mantém a engine rodando quando o sistema bloqueia a aba do painel. O botão/layout foram verificados em uma tela de 390 px no Chromium; isso não substitui um teste em dispositivo iOS real. Fila, relógio, rating e fim de partida dependem dos elementos reconhecidos no site. A execução depende de o site aceitar eventos do userscript: o Chessground de demonstração rejeita eventos sintéticos. O teste de lance usa um fixture de entrada Chess.com espelhado no tabuleiro oficial; não houve teste em partidas públicas.

## Desenvolvimento e validação

Os componentes `userscript-components/ChessinsperAddon*.js` fazem a integração independente. `ChessinsperCore.js`, `ChessinsperAutomation.js` e `ChessinsperBehavior.js` preservam estratégia, execução e ciclo de vida adaptados do original.

```sh
node scripts/build-chessinsper-addon.mjs
node tests/chessinsper.test.mjs
node tests/chessinsper-behavior.test.mjs
node scripts/test-chessinsper-addon-browser.cjs
```

O teste de navegador usa um checkout **oficial sem alterações**, indicado por `ACAS_OFFICIAL_ROOT` (padrão `/workspace/acas-official`), servido em `http://localhost/A.C.A.S/`. Requer Chromium/Playwright, cabeçalhos de isolamento e acesso às dependências públicas do painel. Emula dois armazenamentos GM separados para testar a mesma separação existente no gerenciador de userscripts; todas as ações são realizadas em tabuleiros e botões locais.

O build gera `chessinsper-acas.user.js` e `chessinsper-acas.user.txt` com conteúdo idêntico e sem dependências hospedadas no fork ACASIOS. `acas.user.js`, `acas.user.txt` e `scripts/build-userscript.mjs` pertencem à distribuição integrada anterior; não são os arquivos de instalação deste complemento.

Resultados: **27 testes de estratégia/ciclo de vida e 11 verificações funcionais aprovadas**. Veja [o registro de validação](docs/chessinsper-addon-validation.json).
