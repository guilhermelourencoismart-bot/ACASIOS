# Move Lab

Move Lab separates the calculation engine from move-selection policy. Stockfish,
Maia, Lozza or an A.C.A.S Fun engine generates legal candidates; Move Lab then
ranks that pool according to the selected style.

## Controls

| Control | Purpose |
| --- | --- |
| Playing style | Reorders legal MultiPV candidates using a strategic profile. |
| Aggressiveness | Rewards checks, captures, promotions and forcing play. |
| Risk | Adds deterministic variety without visual flicker. |
| Candidate pool | Gives the controller 1–20 engine candidates to compare. |
| Fun restriction | Sends a legal UCI `searchmoves` restriction to the engine. |
| Repertoire behaviour | `prefer` boosts book moves; `strict` searches only them. |
| Repertoire horizon | Maximum number of half-moves for internal lines. |

## Styles and modes

Styles: pure engine, balanced, aggressive, tactical, positional, defensive,
gambit, materialist, initiative, endgame, anti-trade, human and chaos.

Fun restrictions: pawn, knight, bishop, rook or queen only; captures only;
checks only; quiet moves; no queen; king walk; pawn storm; and roulette. A
restriction stays strict only while a legal themed move exists, so the game
does not become permanently blocked.

## Repertoires

White: King's Indian Attack, Italian, Vienna, London, Queen's Gambit, English,
Ruy Lopez, Scotch and an automatic active-classics set.

Black: King's Indian Defense, Sicilian Dragon, Sicilian Najdorf, Caro-Kann,
French, Scandinavian, Pirc, Slav, Dutch, Queen's Gambit Declined and an
automatic dynamic-defense set.

## Lightweight engines

- A.C.A.S Random
- A.C.A.S Greedy
- A.C.A.S Pawn Storm
- A.C.A.S Knightmare
- A.C.A.S King Hunt
- A.C.A.S King Walk

These tiny JavaScript engines prioritize themed legal moves. They are intended
for bots, analysis boards and casual private games, not maximum strength.
