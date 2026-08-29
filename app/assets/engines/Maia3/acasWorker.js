import MaiaEngine from './maiaEngine.js';

let engine = null;

(async () => {
    try {
        engine = new MaiaEngine({
            onMessage: msg => postMessage(msg),
            onError: error => postMessage({ type: 'acas_error', message: error?.message || String(error) })
        });

        postMessage(true);
    } catch(error) {
        postMessage({ type: 'acas_error', message: error?.message || String(error) });
    }
})();

onmessage = e => {
    const { method, args } = e.data;

    if(method === 'acas_check_loaded') {
        postMessage(Boolean(engine));
        return;
    }

    if(!engine) {
        postMessage(false);
        return;
    }

    if(engine[method] && typeof engine[method] === 'function') {
        engine[method](...args);
    }
};
