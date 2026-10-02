# ACASIOS com Chessinsper — relatório de uso

A base do ACASIOS agora é o **A.C.A.S 2.5.0**. Você instala **um único userscript**, versão **2.5.0-chessinsper.3**, e usa o painel do seu fork. O A.C.A.S carrega a engine, analisa o tabuleiro e desenha as marcações. Ao ativar Chessinsper, você acrescenta os controles de comportamento, aparência e execução dos lances.

## Como começar

1. Atualize o script pelo [arquivo JS](acas.user.js). No celular, você também pode abrir o [arquivo TXT](acas.user.txt), copiar tudo e substituir o conteúdo do script no gerenciador.
2. Deixe o antigo Chessrinsper separado desativado. Mantenha apenas o script integrado para esse uso.
3. Abra o [painel ACASIOS](https://guilhermelourencoismart-bot.github.io/ACASIOS/app/), recarregue a página e selecione o perfil desejado.
4. Escolha uma engine existente no A.C.A.S. Para começar com uma versão leve no celular, experimente **Stockfish 19 Lite Single**.
5. Toque em **Ativar Chessinsper**, no canto inferior direito. O botão passa a indicar **Chessinsper ativo · Desativar** e abre os controles do perfil.
6. Abra um tabuleiro em um site compatível, no navegador em que o gerenciador executa o userscript, e mantenha o painel A.C.A.S disponível para a análise.

O botão controla o perfil selecionado. Um segundo perfil pode continuar com Chessinsper desligado. Em instalações novas, ele começa desligado; perfis que já tinham configurações conservam seu estado salvo.

## O que você pode ajustar

| Controle                     | Efeito visível                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Força e análise              | Define o ELO alvo, profundidade automática ou manual, qualidade e quantidade de candidatos comparados.                                                                      |
| Personalidade                | Permite escolher presets e estilos, além de ajustar criatividade, risco, precisão, ataques, trocas e força nas diferentes fases da partida.                                 |
| Setas                        | Ajusta quantidade, cores, tamanho, espessura, transparência, alternativas, resposta do adversário e filtro por peça. As setas são desenhadas pelo A.C.A.S.                  |
| Indicadores do tabuleiro     | Mostra cravadas, vulnerabilidades, controle de casas, estrutura de peões e outros sinais da análise visual Chessinsper.                                                     |
| Automação                    | Com **Auto Move** ligado, executa o lance por clique, arraste ou alternância. Permite ajustar espera, adaptação ao relógio e tentativas.                                    |
| Sessões e fila               | Limita partidas por sessão/hora, pausa após vitórias seguidas e espera antes de iniciar outra partida. Mostra vitórias, derrotas, empates, ELO efetivo e retomadas AFK.     |
| AFK                          | Salva e recupera o estado da sessão quando a aba volta de uma suspensão. Oferece um pulso WebRTC local opcional.                                                            |
| Comportamento entre partidas | Aquecimento de ELO, fraquezas com semente, variação após derrota, personalidade de clique/arraste, revisão pós-jogo, adaptação opcional ao adversário e à taxa de vitórias. |
| Coach                        | Mostra o melhor candidato, alternativas e resposta prevista. Por padrão, suspende a execução dos lances enquanto você estuda.                                               |
| Complementos                 | Anotação dos candidatos com o desenho nativo, movimento do cursor durante espera e abandono opcional de posições perdidas.                                                  |
| Importar/exportar            | Salva as configurações Chessinsper em JSON e permite importar configurações do script antigo.                                                                               |

**Ativar Chessinsper não liga a automação.** Para isso, abra o grupo **Automação** e marque **Auto Move**. A opção **After User** espera uma mudança da primeira posição observada antes de permitir a execução. Desativar Auto Move ou Chessinsper cancela a execução pendente.

Se você definir **Limite de setas = 0**, as setas desaparecem. Essa alteração não executa outro lance; a automação tem seu próprio controle. O ELO configurado é um alvo de comportamento, sem equivalência garantida com o rating de uma plataforma.

Para voltar ao comportamento nativo, toque em **Chessinsper ativo · Desativar**. O painel restaura as opções nativas da engine. Seus ajustes Chessinsper ficam salvos para a próxima ativação.

## Como usar sessão e AFK

1. Ative Chessinsper pelo botão flutuante e marque **Auto Move** no grupo **Automação** se quiser execução automática.
2. Em **Sessões, fila e AFK**, marque **Nova partida automática** para continuar jogando após o fim de cada partida. A fila só usa um botão de nova partida/revanche reconhecido e visível; depende do site oferecer esse controle.
3. Ajuste os limites. Os padrões são **8 partidas por sessão**, **5 minutos de intervalo**, pausa após **6 vitórias seguidas** e até **6 partidas por hora**. As pausas entre partidas variam de **3 a 12 segundos**. Valores em milissegundos: 1000 ms = 1 segundo.
4. Use **Pausar sessão** para interromper ações, **Retomar sessão** para continuar e **Reiniciar sessão** para zerar os contadores da sessão. O histórico total permanece salvo.
5. Deixe **Recuperar sessão após AFK ou suspensão** ligado. O pulso WebRTC local é opcional; funciona sem servidor externo e pode consumir mais bateria.

O botão flutuante liga ou desliga o conjunto de comportamentos configurados no perfil. Auto Move, fila, Coach e abandono mantêm seus próprios controles: suas escolhas ficam salvas para a próxima ativação. Desligar o botão cancela ações pendentes e libera a aba.

**Aquecimento** começa, por padrão, 150 pontos abaixo do ELO escolhido e aumenta gradualmente ao longo de 12 partidas registradas. O painel mostra o **ELO efetivo**. Marque **Usar ELO configurado durante o aquecimento** ou desligue o aquecimento para aplicar o valor escolhido desde a primeira partida.

Resultados não identificados ficam marcados como desconhecidos; não viram derrotas automaticamente. Se o site mostrar o resultado depois, a estatística é atualizada sem contar outra partida. Recarregar a página também preserva a sessão.

## Funções da base A.C.A.S

As funções nativas foram mantidas: engines e opções UCI, Stockfish 19, sugestões e respostas, variantes, Chess960, avaliação de lances e peças, livros de abertura, áudio, temas, fontes, perfis, painel flutuante, configurações dinâmicas e registro de atividade. Recursos opcionais, como engines externas e webhooks, continuam na base e dependem de configuração própria.

Chessinsper usa xadrez padrão em tabuleiros 8×8. Em variantes e Chess960, o fluxo de análise continua sendo o nativo do A.C.A.S. Os antigos provedores externos de engine e AI do Chessrinsper não são necessários nesta integração. As funções de sessão/AFK e o histórico persistente de comportamento estão incluídos. O histórico fica ligado ao perfil e ao site; o script não faz login nem troca contas. Bancos remotos de partidas continuam fora da integração.

## O que foi verificado

- 27 testes de lógica passaram, incluindo limites de sessão, persistência, AFK, Coach e abandono opcional, além de configurações, candidatos legais, presets, espera pelo relógio, filtros visuais e transições de movimento, incluindo roque, en passant e promoção.
- 16 verificações no Chromium passaram, incluindo a comunicação real entre duas abas locais. Verificaram o botão, persistência, separação de perfis, layout de 390 pixels, cálculo real com Stockfish 19 Lite Single, setas nativas, alteração de cores, desligamento, clique, arraste, cancelamento e promoção a cavalo em tabuleiros locais. Também verificaram a fila automática, os comandos de pausa/retomada, a contagem de resultados, o AFK e a proteção contra duas abas controlando o mesmo perfil.
- Os seis testes de funcionamento básico do A.C.A.S passaram.
- A suíte oficial adicional passou em 146 de 149 verificações. As três falhas também aparecem no código oficial sem alterações e estão descritas no [documento técnico](CHESSINSPER.md).

Ainda é necessária validação em Safari/iPhone e nos sites reais. O teste de tela móvel no Chromium verifica a disposição dos controles, mas não reproduz o funcionamento de um dispositivo iOS. No celular, o navegador também pode pausar a análise se suspender a aba do painel.

## Como reconhecer a integração

No painel correto você verá **Chessinsper · Chess Assistance**, o botão **Ativar Chessinsper** e o grupo **Chessinsper · Personalidade, visual e automação**. A versão do userscript deve ser **2.5.0-chessinsper.3**. Se eles não aparecerem, confirme que abriu o painel do ACASIOS e atualizou tanto a página quanto o script.
