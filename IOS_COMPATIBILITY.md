# A.C.A.S on iOS

This fork includes a mobile-first interface and a conservative runtime for iOS
WebKit.

| Engine | iOS behaviour |
| --- | --- |
| Maia 3 | Single-thread ONNX/WASM; skips WebGPU. |
| Maia 2 | Single-thread ONNX/WASM; skips WebGPU. |
| Stockfish `*-single` | Supported; Lite builds use less memory. |
| Lozza | Supported as a JavaScript fallback. |
| A.C.A.S Fun engines | Supported without WASM. |
| Fairy Stockfish | Used only when shared memory is available. |
| Lc0 / ZeroFish | Redirected to Maia 3 on iOS. |
| Stockfish 16 multithread | Redirected to Stockfish 17 Lite without shared memory. |

The bundled ZeroFish artifact allocates roughly 256 MB of shared WebAssembly
memory and uses pthreads. A true iOS Lc0 option requires a separately compiled
single-thread build; the runtime fallback prevents an endless loading state.

Recommended starting configuration: one profile, candidate pool 2, one or two
visible suggestions, and Stockfish 17 Lite or Maia 3. Keep the GUI in the
foreground during the first model load.
