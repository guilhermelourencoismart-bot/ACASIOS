import { Chess } from '../../engines/libraries/chessjs/chess.js';
import { getRepertoireMoves } from './OpeningRepertoire.js';

const PIECE_VALUE = Object.freeze({ p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 });
const CENTER = new Set(['c3','d3','e3','f3','c4','d4','e4','f4','c5','d5','e5','f5','c6','d6','e6','f6']);
const EXTENDED_CENTER = new Set(['b3','g3','b4','g4','b5','g5','b6','g6']);
const toUci = move => `${move.from}${move.to}${move.promotion || ''}`;

function legalMoves(fen) {
    try {
        return new Chess(fen).moves({ verbose: true }).map(move => ({
            ...move,
            uci: toUci(move),
            isCapture: Boolean(move.captured) || /[ce]/.test(move.flags || ''),
            isCheck: /[+#]/.test(move.san || ''),
            isCastle: /[kq]/.test(move.flags || '')
        }));
    } catch(error) {
        console.warn('Move control could not parse FEN.', error);
        return [];
    }
}

function preferredMovesForMode(moves, mode) {
    switch(mode) {
        case 'pawns-only': return moves.filter(move => move.piece === 'p');
        case 'knights-only': return moves.filter(move => move.piece === 'n');
        case 'bishops-only': return moves.filter(move => move.piece === 'b');
        case 'rooks-only': return moves.filter(move => move.piece === 'r');
        case 'queen-only': return moves.filter(move => move.piece === 'q');
        case 'captures-only': return moves.filter(move => move.isCapture);
        case 'checks-only': return moves.filter(move => move.isCheck);
        case 'quiet-only': return moves.filter(move => !move.isCapture && !move.isCheck);
        case 'no-queen': return moves.filter(move => move.piece !== 'q');
        case 'king-walk': return moves.filter(move => move.piece === 'k');
        case 'pawn-storm': return moves.filter(move => move.piece === 'p');
        default: return [];
    }
}

export function getControlledSearchMoves({ fen, funMode = 'off', repertoireId = 'off', repertoireMode = 'off', repertoireMaxPly = 16 }) {
    const legal = legalMoves(fen);
    if(!legal.length) return { moves: null, repertoireMoves: [], reason: null };

    const legalSet = new Set(legal.map(move => move.uci));
    const repertoireEntries = getRepertoireMoves(fen, repertoireId, repertoireMaxPly)
        .filter(entry => legalSet.has(entry.move));
    const repertoireMoves = repertoireEntries.map(entry => entry.move);
    const restricted = preferredMovesForMode(legal, funMode);
    let moves = null;
    const reasons = [];

    if(funMode !== 'off' && funMode !== 'roulette') {
        if(restricted.length) {
            moves = restricted.map(move => move.uci);
            reasons.push(funMode);
        } else {
            reasons.push(`${funMode}: no legal move, unrestricted`);
        }
    }

    if(repertoireMode === 'strict' && repertoireMoves.length) {
        moves = moves ? moves.filter(move => repertoireMoves.includes(move)) : repertoireMoves;
        if(!moves.length && restricted.length) moves = restricted.map(move => move.uci);
        else reasons.push(repertoireEntries[0]?.lineName || 'repertoire');
    }

    return {
        moves: moves?.length ? [...new Set(moves)] : null,
        repertoireMoves,
        reason: reasons.filter(Boolean).join(' · ') || null
    };
}

function seededNoise(seed) {
    let hash = 2166136261;
    for(let i = 0; i < seed.length; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return ((hash >>> 0) / 4294967295) - 0.5;
}

function styleWeights(style, aggression, risk) {
    const a = Math.max(0, Math.min(100, Number(aggression) || 0)) / 100;
    const r = Math.max(0, Math.min(100, Number(risk) || 0)) / 100;
    const base = { capture: 80, check: 110, center: 25, develop: 25, castle: 35, pawn: 8, queenEarly: -25, promotion: 100, noise: 15 * r };
    const applyAggression = weights => {
        const offset = a - 0.5;
        return { ...weights, capture: (weights.capture || 0) + 140 * offset, check: (weights.check || 0) + 220 * offset, promotion: (weights.promotion || 0) + 180 * offset };
    };

    switch(style) {
        case 'engine': return { capture: 0, check: 0, center: 0, develop: 0, castle: 0, pawn: 0, queenEarly: 0, promotion: 0, noise: 0 };
        case 'aggressive': return applyAggression({ ...base, capture: 205, check: 260, promotion: 180, noise: 25 * r });
        case 'tactical': return applyAggression({ ...base, capture: 220, check: 280, promotion: 250, center: 5, noise: 10 * r });
        case 'positional': return applyAggression({ ...base, capture: 25, check: 35, center: 120, develop: 140, castle: 150, queenEarly: -120, noise: 5 * r });
        case 'defensive': return applyAggression({ ...base, capture: 50, check: 30, center: 75, develop: 90, castle: 220, queenEarly: -100, noise: 3 * r });
        case 'gambit': return applyAggression({ ...base, capture: 100, check: 240, center: 130, pawn: 100, queenEarly: 20, noise: 80 * Math.max(0.3, r) });
        case 'materialist': return applyAggression({ ...base, capture: 330, check: 60, center: 20, develop: 25, castle: 70, queenEarly: -70, noise: 2 * r });
        case 'initiative': return applyAggression({ ...base, capture: 100, check: 300, center: 170, develop: 170, castle: 55, queenEarly: -15, noise: 20 * r });
        case 'endgame': return applyAggression({ ...base, capture: 130, check: 90, center: 100, develop: 0, castle: 0, pawn: 150, king: 180, promotion: 400, queenEarly: 0, noise: 8 * r });
        case 'anti-trade': return applyAggression({ ...base, capture: -180, check: 80, center: 110, develop: 100, castle: 130, queenEarly: -80, noise: 10 * r });
        case 'human': return applyAggression({ ...base, capture: 60, check: 75, center: 50, develop: 65, castle: 80, queenEarly: -65, noise: 45 * Math.max(0.25, r) });
        case 'chaos': return applyAggression({ ...base, capture: 20, check: 30, center: 5, develop: 5, castle: 5, queenEarly: 0, noise: 500 * Math.max(0.1, r) });
        default: return applyAggression(base);
    }
}

export function rankControlledMoves(moveObjects, { fen, style = 'engine', aggression = 50, risk = 20, funMode = 'off', repertoireMoves = [], repertoireMode = 'off', visibleCount = 2 }) {
    if(Number(visibleCount) <= 0) return [];
    const legal = legalMoves(fen);
    const legalByUci = new Map(legal.map(move => [move.uci, move]));
    const weights = styleWeights(style || 'engine', aggression, risk);
    const fullmove = Number(String(fen).split(' ')[5]) || 1;

    const candidates = moveObjects.filter(move => move?.player?.[0] && move?.player?.[1]).map(move => {
        const uci = `${move.player[0]}${move.player[1]}${move.playerPromotion || ''}`;
        const meta = legalByUci.get(uci);
        if(!meta) return { ...move, controlScore: -Infinity, controlReason: 'illegal/obsolete' };
        let score = -Math.max(1, Number(move.ranking) || 99) * 100;
        const reasons = [];

        if(meta.isCapture) { score += weights.capture + (PIECE_VALUE[meta.captured] || 0) * 0.16; reasons.push('capture'); }
        if(meta.isCheck) { score += weights.check; reasons.push('check'); }
        if(meta.promotion) { score += weights.promotion || 0; reasons.push('promotion'); }
        if(CENTER.has(meta.to)) { score += weights.center; reasons.push('center'); }
        else if(EXTENDED_CENTER.has(meta.to)) score += weights.center * 0.35;
        if(meta.isCastle) { score += weights.castle; reasons.push('castle'); }
        if((meta.piece === 'n' || meta.piece === 'b') && fullmove <= 10) { score += weights.develop; reasons.push('develop'); }
        if(meta.piece === 'p') score += weights.pawn;
        if(meta.piece === 'k' && fullmove >= 18) score += weights.king || 0;
        if(meta.piece === 'q' && fullmove <= 8) score += weights.queenEarly;
        if(repertoireMode !== 'off' && repertoireMoves.includes(uci)) { score += repertoireMode === 'strict' ? 2000 : 450; reasons.push('repertoire'); }
        score += seededNoise(`${fen}|${uci}`) * (funMode === 'roulette' ? Math.max(350, weights.noise) : weights.noise);
        return { ...move, controlScore: score, controlReason: reasons.join(', ') || 'engine' };
    });

    let ranked = candidates.sort((a, b) => b.controlScore - a.controlScore);
    const preferred = preferredMovesForMode(legal, funMode).map(move => move.uci);
    if(funMode !== 'off' && funMode !== 'roulette' && preferred.length) {
        const filtered = ranked.filter(move => preferred.includes(`${move.player[0]}${move.player[1]}${move.playerPromotion || ''}`));
        if(filtered.length) ranked = filtered;
    }
    return ranked.slice(0, Math.max(1, Number(visibleCount) || 1));
}
