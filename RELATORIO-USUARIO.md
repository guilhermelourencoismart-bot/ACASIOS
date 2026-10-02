# Chessinsper + A.C.A.S oficial — relatório de uso

Agora você instala **dois scripts separados**. O **A.C.A.S original** fornece as engines, acompanha o tabuleiro e desenha as setas. O **Chessinsper 1.0.0** acrescenta seus controles e comportamentos no painel oficial. A instalação funciona sem a interface ou a base do fork ACASIOS.

## Instalar

1. Desative os scripts antigos Chessrinsper e `A.C.A.S × Chessinsper`, se houver.
2. Instale o [A.C.A.S original](https://github.com/Psyyke/A.C.A.S/raw/refs/heads/main/acas.user.js).
3. Instale o [complemento Chessinsper em JS](chessinsper-acas.user.js) como **outro userscript**. O [arquivo TXT](chessinsper-acas.user.txt) contém exatamente o mesmo código: crie um novo script no gerenciador e cole seu conteúdo inteiro.
4. Mantenha ambos habilitados e permita sua execução no painel oficial e no site de xadrez.
5. Abra [o painel oficial A.C.A.S](https://psyyke.github.io/A.C.A.S/app/), selecione engine/perfil e toque em **Ativar Chessinsper**, no canto inferior direito.
6. Abra um tabuleiro Chess.com ou Lichess e mantenha o painel oficial aberto. Deixe **Display Moves On External Site** habilitado no A.C.A.S.

## Onde verificar a integração

No painel oficial devem aparecer o botão flutuante **Ativar Chessinsper**, o grupo **Chessinsper · Personalidade, visual e automação** e o aviso **A.C.A.S oficial conectado**. Ao abrir o tabuleiro, o A.C.A.S deve mostrar a instância da partida normalmente.

Ative Chessinsper, altere **Cor do lance escolhido** e **Limite de setas** e veja o desenho nativo mudar no tabuleiro. O botão vale para o perfil selecionado. Desativá-lo interrompe os comportamentos e devolve a engine aos ajustes nativos; as configurações Chessinsper continuam salvas separadamente.

## Usar os comportamentos

| Grupo | O que você controla |
| --- | --- |
| Força e análise | ELO alvo, profundidade, qualidade, quantidade de candidatos e presets, com a engine escolhida no A.C.A.S |
| Personalidade e precisão | Estilo, risco, criatividade, ataques, trocas, segurança do rei e precisão |
| Setas e leitura do tabuleiro | Cores, quantidade, tamanho, espessura, filtros e indicadores de posição com desenho nativo |
| Automação | Execução por clique/arraste, espera, relógio e confirmação do lance |
| Sessões, fila e AFK | Limites, intervalos, resultados, pausar/retomar/reiniciar, nova partida automática e retomada após suspensão |
| Comportamento entre partidas | Aquecimento, fraquezas persistentes, variação após derrota, ritmo, revisão, ajustes opcionais de força e abandono |
| Coach e estudo | Candidato, alternativas e resposta prevista; suspende execução por padrão |

**A ativação geral começa com a execução de lances desligada.** Para executá-los, marque **Executar lances automaticamente** em **Automação**. O botão principal passa a ligar/desligar também essa função conforme sua configuração salva. Para iniciar outras partidas, habilite **Nova partida automática**, que exige execução de lances ligada e um botão de nova partida reconhecido ao final do jogo.

**Pausar sessão** bloqueia execução/fila; **Retomar sessão** solicita uma análise nova e retoma quando os limites permitem; **Reiniciar sessão** zera os contadores daquela sessão e preserva o histórico/limite por hora. O quadro de sessão mostra resultados, ELO efetivo, lances confirmados e retomadas AFK.

## Resultado da validação

Foram aprovados **27 testes de estratégia/ciclo de vida** e **11 verificações funcionais em Chromium** com o A.C.A.S oficial **2.5.0**, commit `8522bf6bfb2363e666b8fd655327a39d885d0124`. O checkout oficial permaneceu sem alterações.

As verificações funcionais cobriram armazenamento separado dos dois userscripts, botão e persistência, tela de 390 px, perfis com nomes Unicode, comunicação entre abas, Stockfish 19 carregado pelo A.C.A.S, profundidade/candidatos, setas nativas, prevenção de execução duplicada, mudança de cores/zero setas, confirmação de lance, sessão/fila, AFK e retorno às opções nativas ao desativar.

O lance foi verificado em um **tabuleiro local com entrada no formato Chess.com**, espelhado no tabuleiro oficial de demonstração. O Chessground de demonstração rejeita eventos sintéticos de mouse; esse bloqueio foi preservado. Não houve testes em partidas públicas. A execução em cada site depende de ele aceitar a entrada do userscript; análise e setas podem funcionar mesmo quando a execução é recusada.

Também não houve teste em um dispositivo iOS real. **AFK salva e tenta retomar; não impede o celular de suspender/encerrar abas.** ELO é um alvo de comportamento. Variantes, Chess960 e engines externas continuam no fluxo nativo do A.C.A.S. As configurações/histórico antigos precisam ser importados quando compatíveis, pois outro userscript tem armazenamento privado.

O complemento não inclui carregadores de engine, provedores de IA ou outro renderizador de setas do Chessrinsper antigo. A base oficial pode ser atualizada separadamente; uma atualização futura que mude suas interfaces internas pode exigir atualizar o complemento.

Detalhes e instruções de desenvolvimento: [CHESSINSPER.md](CHESSINSPER.md).
