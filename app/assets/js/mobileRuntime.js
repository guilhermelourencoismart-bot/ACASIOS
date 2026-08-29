import { applyPlatformClasses, isIOS } from './platformCapabilities.js';

export function initializeMobileRuntime() {
    applyPlatformClasses();

    const applyHints = () => {
        const lc0Option = document.querySelector('[data-value="lc0"]');
        if(isIOS && lc0Option) {
            lc0Option.title = 'Desktop build: on iOS A.C.A.S uses Maia 3 instead.';
            lc0Option.classList.add('mobile-engine-fallback');
        }
    };

    if(document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', applyHints, { once: true });
    else
        applyHints();
}
