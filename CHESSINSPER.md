# A.C.A.S × Chessinsper

Esta versão do ACASIOS integra as funções de perfil, leitura visual e execução de lances do script enviado, **Chessrinsper — Stockfish 18 Mobile 1.2.1-rc.1**, à base do [A.C.A.S](https://github.com/Psyyke/A.C.A.S).

A engine é escolhida, carregada e executada pelo A.C.A.S. Chessinsper configura a análise e escolhe entre os candidatos legais retornados por ela. Setas, textos e marcações usam o `UniversalBoardDrawer` já empregado pelo A.C.A.S, tanto na interface quanto no tabuleiro externo.

## Instalar e usar

1. Instale ou atualize **[acas.user.js](acas.user.js)** no seu gerenciador de userscripts. Se preferir copiar o código, use **[acas.user.txt](acas.user.txt)**, que tem o mesmo conteúdo. O arquivo já inclui os componentes Chessinsper; não é necessário instalar outro script.
2. Desative o Chessrinsper standalone para evitar dois scripts executando movimentos ou desenhando simultaneamente.
3. Abra a interface **desta versão do ACASIOS**, selecione um perfil e uma das engines disponíveis no A.C.A.S.
4. No painel **Chessinsper · Personalidade, visual e automação**, ajuste força, estilo, candidatos e aparência das setas. As configurações acompanham o perfil selecionado, inclusive os filtros de instância do A.C.A.S.
5. Para executar lances, habilite **Auto Move** dentro do grupo Automação. Essa opção continua desligada por padrão. **After User** preserva a primeira posição observada para que você faça o lance inicial.

É necessário atualizar a interface e o userscript juntos, pois eles usam novos comandos de comunicação. As versões públicas do A.C.A.S upstream não incluem esse painel.

## Funções integradas

| Área | Comportamento |
| --- | --- |
| Engine | Força de 400–3000, profundidade automática ou manual, qualidade da análise, quantidade de candidatos e opções UCI suportadas pela engine escolhida. |
| Personalidade | Presets do script original, estilos de jogo, criatividade, risco, tática, jogo posicional, segurança do rei, trocas, simplificação, precisão e variação por fase. |
| Seleção | Modelo original de seleção humana e calibração de força aplicado aos candidatos legais da engine do A.C.A.S. Preferência opcional pelos candidatos do repertório nativo. |
| Setas | Limite de sugestões, escala, espessura, opacidade, cores, filtro por peça, alternativas e resposta do adversário. Zero sugestões limpa as setas sem executar outro lance. |
| Leitura visual | Cravadas e seus valores, peças vulneráveis, controle de casas, segurança do rei, estrutura de peões, raios-X, garfos e outros indicadores calculados pelo `BoardIntelligence` original. |
| Automação | Clique, arraste ou alternância, espera configurável com adaptação ao relógio, confirmação da posição resultante, tentativas limitadas e cancelamento ao desligar Auto Move ou alterar o comportamento do perfil. |
| Configuração | Persistência por perfil e importação/exportação de JSON Chessinsper. A importação aceita o objeto de configuração antigo e descarta campos de provedores de engine. |

O ELO é um alvo do perfil, sem garantia de equivalência com um rating de plataforma. Quando a engine anuncia opções UCI de força, seus limites são respeitados; abaixo deles, a profundidade e a seleção de candidatos fazem a adaptação. A qualidade das alternativas depende da engine e da análise realizada.

As funções Chessinsper se aplicam ao xadrez padrão em tabuleiros 8×8. Variantes e Chess960 continuam usando o fluxo nativo do A.C.A.S.

Os carregadores Stockfish 18, APIs e provedores externos do script enviado não foram incorporados. A interface flutuante e seu renderizador separado também foram substituídos pelos componentes do A.C.A.S. Gerenciamento de contas, sessões/AFK, telemetria, banco remoto de partidas e alterações de APIs do navegador não fazem parte desta integração. Engines, temas, fontes e repertórios já presentes no A.C.A.S continuam disponíveis.

## Desenvolvimento

Os componentes editáveis estão em `userscript-components/ChessinsperCore.js` e `userscript-components/ChessinsperAutomation.js`. A integração da interface fica em `app/assets/js/chessinsper/`. Depois de alterar um componente do userscript, gere novamente o arquivo instalável:

```sh
node scripts/build-userscript.mjs
node --test tests/chessinsper.test.mjs
```

A geração também atualiza `acas.user.txt`, mantendo as versões para instalação e cópia com o mesmo conteúdo.

O teste funcional requer a aplicação servida com os cabeçalhos de isolamento necessários às engines WASM, Chromium e Playwright. No ambiente de desenvolvimento preparado para este repositório:

```sh
bash /workspace/acasios-cloud/start.sh
node scripts/test-chessinsper-browser.cjs
```

`ACAS_TEST_BASE_URL` permite apontar o teste para outra instalação local. `ACAS_TEST_SCREENSHOT_DIR` salva capturas do painel. O teste injeta uma implementação local das APIs GM e usa a engine Stockfish existente no repositório; a execução de movimentos é verificada em um tabuleiro artificial.

Foram verificados cálculos reais com a engine do A.C.A.S, desenho nativo de setas e indicadores, persistência, separação de perfis, layout em viewport móvel, retorno às configurações nativas e execução/cancelamento locais, incluindo arraste e promoção a cavalo. A execução em sites reais e em Safari/iOS precisa de validação nesses ambientes; viewport móvel do Chromium não equivale a esse teste.

## Origem e licença

Os módulos de comportamento e inteligência visual foram adaptados do script fornecido pelo usuário, identificado com `@author Chessrinsper` e `@license MIT`. Os cabeçalhos dos componentes preservam essa atribuição. O projeto A.C.A.S mantém sua licença GPL-3.0.
