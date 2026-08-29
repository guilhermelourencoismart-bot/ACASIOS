const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;
const platform = typeof navigator === 'undefined' ? '' : navigator.platform;
const touchPoints = typeof navigator === 'undefined' ? 0 : navigator.maxTouchPoints || 0;

export const isIOS = /iPad|iPhone|iPod/i.test(ua)
    || (platform === 'MacIntel' && touchPoints > 1);
export const isMobile = isIOS
    || (typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches)
    || /Android|Mobile/i.test(ua);

export const engineCapabilities = Object.freeze({
    webAssembly: typeof WebAssembly === 'object',
    sharedMemory: typeof SharedArrayBuffer === 'function' && globalThis.crossOriginIsolated === true,
    webGPU: typeof navigator !== 'undefined' && Boolean(navigator.gpu)
});

const JS_ENGINES = new Set([
    'lozza-5', 'lozza-9',
    'acas-random', 'acas-greedy', 'acas-pawn-storm',
    'acas-knightmare', 'acas-king-hunt', 'acas-king-walk'
]);

export function getEngineCompatibility(engineName = 'maia3') {
    if(JS_ENGINES.has(engineName)) return { supported: true, fallback: null, reason: null };

    if(!engineCapabilities.webAssembly) {
        return {
            supported: false,
            fallback: 'lozza-9',
            reason: 'WebAssembly is unavailable.'
        };
    }

    if(isIOS && engineName === 'lc0') {
        return {
            supported: false,
            fallback: 'maia3',
            reason: 'The bundled Lc0/ZeroFish build requires about 256 MB of shared memory and pthreads.'
        };
    }

    if(!engineCapabilities.sharedMemory && ['stockfish-16-1-wasm', 'fairy-stockfish-nnue-wasm'].includes(engineName)) {
        return {
            supported: false,
            fallback: 'stockfish-17-lite-single',
            reason: 'This engine requires cross-origin isolated shared memory.'
        };
    }

    return { supported: true, fallback: null, reason: null };
}

export function applyPlatformClasses(root = document.documentElement) {
    root.classList.toggle('acas-ios', isIOS);
    root.classList.toggle('acas-mobile', isMobile);
    root.classList.toggle('acas-no-shared-memory', !engineCapabilities.sharedMemory);
    root.dataset.acasPlatform = isIOS ? 'ios' : (isMobile ? 'mobile' : 'desktop');
}
