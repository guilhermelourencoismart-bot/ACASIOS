import { Chess } from '../libraries/chessjs/chess.js';

let currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let engineMode = 'random';
let multiPV = 3;
let lastBestMove = '0000';

const PIECE_VALUE = Object.freeze({ p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 });
const CENTER = new Set(['c3','d3','e3','f3','c4','d4','e4','f4','c5','d5','e5','f5','c6','d6','e6','f6']);
const send = message => postMessage(message);
const uci = move => `${move.from}${move.to}${move.promotion || ''}`;

function noise(seed) {
    let hash = 0x811c9dc5;
    for(let i = 0; i < seed.length; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0) / 0xffffffff;
}

function scoreMove(move, fen) {
    const capture = PIECE_VALUE[move.captured] || 0;
    const check = /[+#]/.test(move.san || '') ? 1 : 0;
    const center = CENTER.has(move.to) ? 1 : 0;
    const pawn = move.piece === 'p' ? 1 : 0;
    const knight = move.piece === 'n' ? 1 : 0;
    const king = move.piece === 'k' ? 1 : 0;
    const random = noise(`${fen}|${uci(move)}`);

    switch(engineMode) {
        case 'greedy': return capture * 3 + check * 500 + center * 30 + random;
        case 'pawn-storm': return pawn * 1000 + capture * 1.5 + center * 100 + check * 150 + random;
        case 'knightmare': return knight * 1200 + capture * 2 + center * 150 + check * 250 + random;
        case 'king-hunt': return check * 2000 + capture * 2 + center * 60 + random;
        case 'king-walk': return king * 1500 + capture + random;
        default: return random * 1000 + capture * 0.05;
    }
}

function getReply(board, seed) {
    const replies = board.moves({ verbose: true });
    if(!replies.length) return '';
    return uci(replies.sort((a, b) => noise(`${seed}|${uci(b)}`) - noise(`${seed}|${uci(a)}`))[0]);
}

function calculate(command) {
    let board;
    try { board = new Chess(currentFen); }
    catch(error) { send(`info string Failed to load FEN: ${error.message}`); send('bestmove 0000'); return; }

    const searchMatch = command.match(/\bsearchmoves\s+(.+)$/);
    const allowed = searchMatch ? new Set(searchMatch[1].trim().split(/\s+/)) : null;
    let moves = board.moves({ verbose: true });
    if(allowed) moves = moves.filter(move => allowed.has(uci(move)));
    if(!moves.length) { send('bestmove 0000'); return; }

    const ranked = moves.map(move => ({ move, score: scoreMove(move, currentFen) })).sort((a, b) => b.score - a.score);
    const selected = ranked.slice(0, Math.max(1, multiPV));
    selected.forEach(({ move, score }, index) => {
        const next = new Chess(currentFen);
        next.move({ from: move.from, to: move.to, promotion: move.promotion || 'q' });
        const reply = getReply(next, uci(move));
        const pv = `${uci(move)}${reply ? ` ${reply}` : ''}`;
        const cp = Math.round(Math.max(-900, Math.min(900, score / 3)));
        send(`info depth 1 seldepth 1 multipv ${index + 1} score cp ${cp} nodes ${moves.length} pv ${pv}`);
    });
    lastBestMove = uci(selected[0].move);
    send(`bestmove ${lastBestMove}`);
}

function setOption(line) {
    const match = line.match(/^setoption\s+name\s+(.+?)(?:\s+value\s+(.+))?$/i);
    if(!match) return;
    const name = match[1].trim().toLowerCase();
    const value = match[2]?.trim();
    if(name === 'multipv') multiPV = Math.max(1, Math.min(20, Number(value) || 1));
    if(name === 'fun style') engineMode = value || engineMode;
}

async function processUci(line) {
    const command = String(line || '').trim();
    if(command === 'uci') {
        send(`id name A.C.A.S Fun Engine (${engineMode})`);
        send('id author A.C.A.S iOS fork');
        send('option name MultiPV type spin default 3 min 1 max 20');
        send('option name Fun Style type combo default random var random var greedy var pawn-storm var knightmare var king-hunt var king-walk');
        send('uciok'); return;
    }
    if(command === 'isready') { send('readyok'); return; }
    if(command === 'ucinewgame') { currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; return; }
    if(command.startsWith('setoption ')) { setOption(command); return; }
    if(command.startsWith('position startpos')) { currentFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; return; }
    if(command.startsWith('position fen ')) { currentFen = command.slice('position fen '.length).split(' moves ')[0]; return; }
    if(command.startsWith('go')) { calculate(command); return; }
    if(command === 'stop') { send(`bestmove ${lastBestMove}`); return; }
    if(command === 'd') send(`Fen: ${currentFen}`);
}

self.onmessage = async event => {
    const { method, args = [] } = event.data || {};
    if(method === 'acas_check_loaded') { postMessage(true); return; }
    try { if(method === 'uci') await processUci(...args); }
    catch(error) { postMessage({ type: 'acas_error', message: error?.message || String(error) }); }
};

postMessage(true);
