import { Chess } from '../../engines/libraries/chessjs/chess.js';

const line = (name, moves, weight = 1) => ({ name, moves: moves.trim().split(/\s+/), weight });

export const WHITE_REPERTOIRES = Object.freeze([
    { id: 'off', name: 'Engine choice', lines: [] },
    { id: 'kings-indian-attack', name: "King's Indian Attack", lines: [
        line('KIA main setup', 'g1f3 d7d5 g2g3 g8f6 f1g2 e7e6 e1g1 f8e7 d2d3 e8g8 b1d2 c7c5 e2e4')
    ]},
    { id: 'italian', name: 'Italian Game', lines: [
        line('Giuoco Piano', 'e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4 e5d4 c3d4')
    ]},
    { id: 'vienna', name: 'Vienna Game', lines: [
        line('Vienna Gambit', 'e2e4 e7e5 b1c3 g8f6 f2f4 d7d5 f4e5 f6e4')
    ]},
    { id: 'london', name: 'London System', lines: [
        line('London setup', 'd2d4 d7d5 g1f3 g8f6 c1f4 e7e6 e2e3 f8d6 f4g3 e8g8')
    ]},
    { id: 'queens-gambit', name: "Queen's Gambit", lines: [
        line('QGD Exchange', 'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c4d5 e6d5 c1f4')
    ]},
    { id: 'english', name: 'English Opening', lines: [
        line('Four Knights', 'c2c4 e7e5 b1c3 g8f6 g2g3 d7d5 c4d5 f6d5 f1g2')
    ]},
    { id: 'ruy-lopez', name: 'Ruy Lopez', lines: [
        line('Closed Spanish', 'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7')
    ]},
    { id: 'scotch', name: 'Scotch Game', lines: [
        line('Scotch main line', 'e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 g8f6')
    ]},
    { id: 'auto-white', name: 'Auto: active classics', lines: [
        line('Italian', 'e2e4 e7e5 g1f3 b8c6 f1c4', 3),
        line('Vienna', 'e2e4 e7e5 b1c3 g8f6 f2f4', 2),
        line('Queen’s Gambit', 'd2d4 d7d5 c2c4 e7e6 b1c3', 3),
        line('English', 'c2c4 e7e5 b1c3 g8f6 g2g3', 2)
    ]}
]);

export const BLACK_REPERTOIRES = Object.freeze([
    { id: 'off', name: 'Engine choice', lines: [] },
    { id: 'kings-indian-defense', name: "King's Indian Defense", lines: [
        line('KID classical setup', 'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3 e8g8')
    ]},
    { id: 'sicilian-dragon', name: 'Sicilian Dragon', lines: [
        line('Dragon setup', 'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6')
    ]},
    { id: 'sicilian-najdorf', name: 'Sicilian Najdorf', lines: [
        line('Najdorf setup', 'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6')
    ]},
    { id: 'caro-kann', name: 'Caro-Kann', lines: [
        line('Classical Caro-Kann', 'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5')
    ]},
    { id: 'french', name: 'French Defense', lines: [
        line('French advance', 'e2e4 e7e6 d2d4 d7d5 b1c3 g8f6 e4e5 f6d7')
    ]},
    { id: 'scandinavian', name: 'Scandinavian', lines: [
        line('Modern Scandinavian', 'e2e4 d7d5 e4d5 d8d5 b1c3 d5d8 d2d4 g8f6')
    ]},
    { id: 'pirc', name: 'Pirc Defense', lines: [
        line('Pirc setup', 'e2e4 d7d6 d2d4 g8f6 b1c3 g7g6 f2f4 f8g7')
    ]},
    { id: 'slav', name: 'Slav Defense', lines: [
        line('Main Slav', 'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 d5c4')
    ]},
    { id: 'dutch', name: 'Dutch Defense', lines: [
        line('Leningrad setup', 'd2d4 f7f5 g2g3 g8f6 f1g2 g7g6 g1f3 f8g7')
    ]},
    { id: 'qgd', name: "Queen's Gambit Declined", lines: [
        line('Orthodox QGD', 'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 f8e7')
    ]},
    { id: 'auto-defense', name: 'Auto: dynamic defense', lines: [
        line('Najdorf vs e4', 'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6', 3),
        line('Caro-Kann vs e4', 'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5', 2),
        line('KID vs d4', 'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6', 3),
        line('Slav vs d4', 'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6', 2)
    ]}
]);

const positionCache = new Map();
const simpleFen = fen => String(fen || '').split(' ').slice(0, 4).join(' ');
const uci = move => `${move.from}${move.to}${move.promotion || ''}`;

function buildPositionIndex(repertoire) {
    if(positionCache.has(repertoire.id)) return positionCache.get(repertoire.id);
    const index = new Map();

    for(const variation of repertoire.lines) {
        const board = new Chess();
        for(let ply = 0; ply < variation.moves.length; ply++) {
            const key = simpleFen(board.fen());
            const nextMove = variation.moves[ply];
            const entries = index.get(key) || [];
            entries.push({ move: nextMove, lineName: variation.name, weight: variation.weight, ply });
            index.set(key, entries);

            const legal = board.moves({ verbose: true }).find(move => uci(move) === nextMove);
            if(!legal) break;
            board.move(legal);
        }
    }

    positionCache.set(repertoire.id, index);
    return index;
}

export function getRepertoire(id, color) {
    const source = color === 'b' ? BLACK_REPERTOIRES : WHITE_REPERTOIRES;
    return source.find(item => item.id === id) || source[0];
}

export function getRepertoireMoves(fen, repertoireId, maxPly = 16) {
    if(!repertoireId || repertoireId === 'off') return [];
    const repertoire = getRepertoire(repertoireId, String(fen).split(' ')[1]);
    const candidates = buildPositionIndex(repertoire).get(simpleFen(fen)) || [];

    return candidates
        .filter(entry => entry.ply < Number(maxPly))
        .sort((a, b) => b.weight - a.weight)
        .filter((entry, index, arr) => index === arr.findIndex(other => other.move === entry.move));
}
