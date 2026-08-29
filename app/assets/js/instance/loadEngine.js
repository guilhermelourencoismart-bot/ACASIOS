import { setProfileBubbleStatus } from '../gui/profiles.js';
import { getEngineCompatibility, isIOS, isMobile } from '../platformCapabilities.js';

export default async function loadEngine(profileName, engineName, attempt = 0) {
    const profileObj = await GET_PROFILE(profileName);
    const requestedEngine = engineName || profileObj.config.chessEngine;
    const compatibility = getEngineCompatibility(requestedEngine);
    const profileChessEngine = compatibility.supported ? requestedEngine : compatibility.fallback;
    const isReload = attempt > 0;
    let alreadyRestarted = false;

    if(!compatibility.supported) {
        const warning = `${requestedEngine} is unavailable on this device. ${compatibility.reason} Using ${profileChessEngine} instead.`;
        console.warn('[A.C.A.S engine fallback]', warning);
        setProfileBubbleStatus('warning', profileName, warning);
        toast.warning(warning);
    }

    if(isReload) {
        setProfileBubbleStatus('error', profileName, 'Engine crashed and engine is trying to reload...');

        console.warn('RELOAD ATTEMPT', attempt, '-> Loading engine', engineName, profileName);
    }

    if(attempt > 3) {
        toast.warning(`Restarting the engine ${profileChessEngine} failed despite several attempts. Refresh A.C.A.S.`);
        
        setProfileBubbleStatus('error', profileName, 'Engine crashed, could not restart it.');

        return;
    }

    const processEngineMessage = msg => {
        try {
            this.engineMessageProcessor(msg, profileName);
        } catch(e) {
            console.error('Engine', this.instanceID, profileName, 'error:', e);
        }
    };

    // Load pollers were cleared only when the engine reported back. If the worker failed
    // to load instead, the interval kept posting to it at 10Hz for the life of the page
    // and the worker was never terminated, because it only reaches this.engines on the
    // successful handshake.
    this.pendingEngineLoads ??= new Set();

    const trackLoad = (worker, intervalId, engineLabel) => {
        const entry = { worker, intervalId, timeoutId: null };

        entry.timeoutId = setTimeout(() => {
            restartEngine.bind(this)(
                engineLabel,
                new Error(`${engineLabel} did not initialize before the timeout`),
                entry
            );
        }, isMobile ? 120000 : 60000);

        this.pendingEngineLoads.add(entry);

        return entry;
    };

    const finishLoad = entry => {
        if(!entry) return;

        clearInterval(entry.intervalId);
        clearTimeout(entry.timeoutId);
        this.pendingEngineLoads.delete(entry);
    };

    const abandonLoad = entry => {
        if(!entry) return;

        clearInterval(entry.intervalId);
        clearTimeout(entry.timeoutId);
        entry.worker?.terminate?.();
        this.pendingEngineLoads.delete(entry);
    };

    function restartEngine(name, e, loadEntry) {
        abandonLoad(loadEntry);

        // This guard was dead, the flag was never set, so every onerror re-closed the instance
        if(alreadyRestarted) return;
        alreadyRestarted = true;

        setProfileBubbleStatus('warning', profileName, `Restarting the instance due to the error: ${e?.message}`);
        console.error(`Restarting the instance "${name}" due to the error:`, e);

        if(isIOS && (name === 'maia2' || name === 'maia3')) {
            this.engines = this.engines.filter(item => item.worker !== loadEntry?.worker);
            const fallback = 'stockfish-17-lite-single';
            const message = `${name} failed on iOS. Switching to ${fallback}.`;
            setProfileBubbleStatus('warning', profileName, message);
            toast.warning(message);
            loadEngine.call(this, profileName, fallback, attempt + 1);
            return;
        }

        this.close(); // closing whole instance!
    }

    async function startGame(variant = 'chess') {
        await this.engineStartNewGame(variant, profileName);
        await WAIT_UNTIL_VAR(() => this.instanceReady);

        this.Interface.updateBoardFen({ 'skipValidityChecks': true, 'specificProfileName': profileName });
    }
    
    function loadStockfish(folderName, fileName = folderName) {
        const stockfish = new Worker(`../app/assets/engines/${folderName}/${fileName}.js`);
        let stockfish_loaded = false;

        stockfish.onmessage = async e => {
            if(!stockfish_loaded) {
                stockfish_loaded = true;

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => stockfish[method](...a),
                    'sendMsg': msg => stockfish.postMessage(msg),
                    'worker': stockfish,
                    profileName
                });
    
                startGame.bind(this)();
            }

            processEngineMessage(e.data);
        };

        stockfish.onerror = e => {
            restartEngine.bind(this)(folderName, e);
        };
    }

    function loadFairyStockfish() {
        const stockfish = new Worker(`../app/assets/engines/fairy-stockfish-nnue.wasm/stockfishWorker.js`);
        let stockfish_loaded = false;

        stockfish.onmessage = async e => {
            if(e.data === true && !stockfish_loaded) {
                stockfish_loaded = true;

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => stockfish.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => stockfish.postMessage({ method: 'postMessage', args: [msg] }),
                    'worker': stockfish,
                    profileName
                });

                startGame.bind(this)(FORMAT_VARIANT(this.pV[profileName].chessVariant));
            } else if(e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(stockfish, setInterval(() => {
            if(stockfish_loaded) {
                finishLoad(loadEntry);
                return;
            }

            stockfish.postMessage({ method: 'acas_check_loaded' });
        }, 250), 'fairy-stockfish-nnue-wasm');

        stockfish.onerror = e => {
            restartEngine.bind(this)('fairy-stockfish-nnue-wasm', e, loadEntry);
        };
    }

    function loadLilaStockfish(workerName, engineName) {
        const stockfish = new Worker(`../app/assets/engines/lila-stockfish/${workerName}.js`, { type: 'module' });
        let stockfish_loaded = false;

        stockfish.onmessage = async e => {
            if(e.data === true && !stockfish_loaded) {
                stockfish_loaded = true;

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => stockfish.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => stockfish.postMessage({ method: 'uci', args: [msg] }),
                    'worker': stockfish,
                    profileName
                });

                startGame.bind(this)('chess');
            } else if(e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(stockfish, setInterval(() => {
            if(stockfish_loaded) {
                finishLoad(loadEntry);
                return;
            }

            stockfish.postMessage({ method: 'acas_check_loaded' });
        }, 250), engineName);

        stockfish.onerror = e => {
            restartEngine.bind(this)(engineName, e, loadEntry);
        };
    }

    function loadLc0() {
        const lc0 = new Worker('../app/assets/engines/zerofish/zerofishWorker.js', { type: 'module' });
        let lc0_loaded = false;

        lc0.onmessage = async e => {
            if(e.data?.type === 'acas_error') {
                restartEngine.bind(this)('lc0', new Error(e.data.message), loadEntry);
            } else if(e.data === true && !lc0_loaded) {
                lc0_loaded = true;
                finishLoad(loadEntry);

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => lc0.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => lc0.postMessage({ method: 'zero', args: [msg] }),
                    'worker': lc0,
                    profileName
                });

                await this.setEngineWeight(this.pV[profileName].lc0WeightName, profileName);
    
                startGame.bind(this)();
            } else if(e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(lc0, setInterval(() => {
            if(lc0_loaded) {
                finishLoad(loadEntry);
                return;
            }

            lc0.postMessage({ method: 'acas_check_loaded' });
        }, 250), 'lc0');

        lc0.onerror = e => {
            restartEngine.bind(this)('lc0', e, loadEntry);
        };
    }

    function loadFusion() {
        const Fusion = new Worker('../app/assets/engines/Fusion/fusionWorker.js', { type: 'module' });
        let fusion_loaded = false;

        Fusion.onmessage = async e => {
            if(e.data?.type === 'acas_error') {
                restartEngine.bind(this)('acas-fusion', new Error(e.data.message), loadEntry);
            } else if(e.data === true && !fusion_loaded) {
                fusion_loaded = true;
                finishLoad(loadEntry);

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => Fusion.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => Fusion.postMessage({ method: 'uci', args: [msg] }),
                    'worker': Fusion,
                    profileName
                });
    
                startGame.bind(this)();
            } else if (e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(Fusion, setInterval(() => {
            if(fusion_loaded) {
                finishLoad(loadEntry);
                return;
            }

            Fusion.postMessage({ method: 'acas_check_loaded' });
        }, 250), 'acas-fusion');

        Fusion.onerror = e => {
            restartEngine.bind(this)('acas-fusion', e, loadEntry);
        };
    }

    function loadLozza(version) {
        const lozza = new Worker(`../app/assets/engines/Lozza/lozza-${version}.js`);

        lozza.onmessage = e => processEngineMessage(e.data);
        lozza.onerror = e => restartEngine.bind(this)('lozza-' + version, e);

        this.engines.push({
            'type': profileChessEngine,
            'engine': (method, a) => lozza[method](...a),
            'sendMsg': msg => lozza.postMessage(msg),
            'worker': lozza,
            profileName
        });

        startGame.bind(this)();
    }

    function loadFunEngine(mode) {
        const fun = new Worker('../app/assets/engines/AcasFun/worker.js', { type: 'module' });
        let funLoaded = false;

        fun.onmessage = async event => {
            if(event.data?.type === 'acas_error') {
                restartEngine.bind(this)(profileChessEngine, new Error(event.data.message), loadEntry);
            } else if(event.data === true && !funLoaded) {
                funLoaded = true;
                finishLoad(loadEntry);
                this.engines.push({
                    type: profileChessEngine,
                    engine: (method, args) => fun.postMessage({ method, args: [...args] }),
                    sendMsg: message => fun.postMessage({ method: 'uci', args: [message] }),
                    worker: fun,
                    profileName
                });
                fun.postMessage({ method: 'uci', args: [`setoption name Fun Style value ${mode}`] });
                startGame.bind(this)();
            } else if(event.data) {
                processEngineMessage(event.data);
            }
        };

        const loadEntry = trackLoad(fun, setInterval(() => {
            if(funLoaded) { finishLoad(loadEntry); return; }
            fun.postMessage({ method: 'acas_check_loaded', args: [] });
        }, 250), profileChessEngine);
        fun.onerror = event => restartEngine.bind(this)(profileChessEngine, event, loadEntry);
    }

    function loadMaia3() {
        const maia = new Worker('../app/assets/engines/Maia3/acasWorker.js', { type: 'module' });
        let maia_loaded = false;

        maia.onmessage = async e => {
            if(e.data?.type === 'acas_error') {
                restartEngine.bind(this)('maia3', new Error(e.data.message), loadEntry);
            } else if(e.data === true && !maia_loaded) {
                maia_loaded = true;
                finishLoad(loadEntry);

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => maia.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => maia.postMessage({ method: 'uci', args: [msg] }),
                    'worker': maia,
                    profileName
                });
    
                startGame.bind(this)();
            } else if (e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(maia, setInterval(() => {
            if(maia_loaded) {
                finishLoad(loadEntry);
                return;
            }
            maia.postMessage({ method: 'acas_check_loaded', args: [] });
        }, 250), 'maia3');

        maia.onerror = e => {
            restartEngine.bind(this)('maia3', e, loadEntry);
        };
    }

    function loadMaia2() {
        const maia = new Worker('../app/assets/engines/Maia2/worker.js', { type: 'module' });
        let maia_loaded = false;

        maia.onmessage = async e => {
            if(e.data?.type === 'acas_error') {
                restartEngine.bind(this)('maia2', new Error(e.data.message), loadEntry);
            } else if(e.data === true && !maia_loaded) {
                maia_loaded = true;
                finishLoad(loadEntry);

                this.engines.push({
                    'type': profileChessEngine,
                    'engine': (method, a) => maia.postMessage({ method: method, args: [...a] }),
                    'sendMsg': msg => maia.postMessage({ method: 'uci', args: [msg] }),
                    'worker': maia,
                    profileName
                });
    
                startGame.bind(this)();
            } else if (e.data) {
                processEngineMessage(e.data);
            }
        };

        const loadEntry = trackLoad(maia, setInterval(() => {
            if(maia_loaded) {
                finishLoad(loadEntry);
                return;
            }

            maia.postMessage({ method: 'acas_check_loaded' });
        }, 250), 'maia2');

        maia.onerror = e => {
            restartEngine.bind(this)('maia2', e, loadEntry);
        };
    }
    
    // When using loadStockfish(folderName, fileName), make sure the folder name
    // is exactly the same as the switch case string, since otherwise reloading wont work
    // "Maia 3" is the default
    switch(profileChessEngine) {
        case 'stockfish-18-single':
            loadStockfish.bind(this)('stockfish-18-single');
            break;

        case 'stockfish-18-lite-single':
            loadStockfish.bind(this)('stockfish-18-lite-single');
            break;

        case 'stockfish-17-single':
            loadStockfish.bind(this)('stockfish-17-single');
            break;

        case 'stockfish-17-lite-single':
            loadStockfish.bind(this)('stockfish-17-lite-single');
            break;

        case 'stockfish-16-1-wasm':
            loadLilaStockfish.bind(this)('16-0-worker', 'stockfish-16-1-wasm');
            break;

        case 'stockfish-11':
            loadStockfish.bind(this)('stockfish-11');
            break;

        case 'stockfish-8':
            loadStockfish.bind(this)('stockfish-8');
            break;

        case 'fairy-stockfish-nnue-wasm':
            loadFairyStockfish.bind(this)();
            break;

        case 'lozza-5':
            loadLozza.bind(this)(5);
            break;

        case 'lozza-9':
            loadLozza.bind(this)(9);
            break;

        case 'acas-random': loadFunEngine.bind(this)('random'); break;
        case 'acas-greedy': loadFunEngine.bind(this)('greedy'); break;
        case 'acas-pawn-storm': loadFunEngine.bind(this)('pawn-storm'); break;
        case 'acas-knightmare': loadFunEngine.bind(this)('knightmare'); break;
        case 'acas-king-hunt': loadFunEngine.bind(this)('king-hunt'); break;
        case 'acas-king-walk': loadFunEngine.bind(this)('king-walk'); break;

        case 'lc0':
            loadLc0.bind(this)();
            break;

        case 'acas-fusion':
            loadFusion.bind(this)();
            break;

        case 'maia3':
            loadMaia3.bind(this)();
            break;

        case 'maia2':
            loadMaia2.bind(this)();
            break;

        default:
            loadMaia3.bind(this)();
            break;
    }
}
