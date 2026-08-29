import Maia from './maia.js';
import { loadMoves } from './utils.js';

import { Chess } from '../libraries/chessjs/chess.js';

let board = null;
let engine = null;

(async () => {
	try {
		await loadMoves();
		board = new Chess();

		const maia = new Maia('maia_rapid.onnx', Chess, board);
		await maia.initPromise;

		engine = maia;
	} catch(error) {
		postMessage({ type: 'acas_error', message: error?.message || String(error) });
	}
})();

onmessage = e => {
    const { method, args } = e.data;

    if(!engine) {
        postMessage(false);
        return;
    }

    if(engine && method === 'acas_check_loaded') {
        postMessage(true);

        engine.listen = msg => postMessage(msg);
        
        return;
    }

    if(engine[method] && typeof engine[method] === 'function') {
        engine[method](...args);
    }
};
