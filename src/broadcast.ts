export const boxcastChannel = 'rs1sn7iap6fgcn3nn8as';

// Options supplied in the church's BoxCast embed code.
export const boxcastOptions = {
  showTitle: 1,
  showDescription: 1,
  showHighlights: 1,
  showRelated: true,
  defaultVideo: 'next',
  playInline: false,
  dvr: true,
  market: 'house-of-worship',
  showCountdown: true,
  showDonations: true,
  showDocuments: true,
  showIndex: true,
  showChat: true,
  hidePreBroadcastTextOverlay: false,
  layout: 'playlist-to-right',
};

type BoxCast = {
  noConflict(): (selector: string) => {
    loadChannel(channel: string, options: typeof boxcastOptions): unknown;
  };
};

declare global {
  interface Window {
    boxcast?: BoxCast;
  }
}

/** Load the supplied provider widget once; keep Facebook available if it fails. */
export function initializeBroadcast() {
  const widget = document.getElementById(`boxcast-widget-${boxcastChannel}`)!;
  const loading = document.getElementById('player-loading')!;
  const fallback = document.getElementById('player-fallback')!;
  let timeout: ReturnType<typeof setTimeout>;
  const observer = new MutationObserver(() => {
    if (!widget.childElementCount) return;
    clearTimeout(timeout);
    loading.hidden = true;
    fallback.hidden = true;
    widget.hidden = false;
    widget.closest('.service-viewer')?.classList.add('player-initialized');
    // Keep observing so a slow provider response can recover after the fallback.
  });
  observer.observe(widget, { childList: true, subtree: true });

  function showFallback() {
    loading.hidden = true;
    fallback.hidden = false;
    if (!widget.childElementCount) widget.hidden = true;
  }

  const script = document.createElement('script');
  script.src = 'https://js.boxcast.com/v3.min.js';
  script.charset = 'utf-8';
  script.async = true;
  script.addEventListener('load', () => {
    try {
      const player = window.boxcast?.noConflict();
      if (!player) throw new Error('BoxCast player unavailable');
      const result = player(`#boxcast-widget-${boxcastChannel}`).loadChannel(boxcastChannel, boxcastOptions);
      if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
        Promise.resolve(result).catch(showFallback);
      }
    } catch {
      showFallback();
    }
  });
  script.addEventListener('error', showFallback);
  timeout = setTimeout(showFallback, 18000);
  document.head.append(script);
}
