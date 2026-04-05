<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { app, pages, accents, accentNames } from '$lib/state.svelte';
  import { page } from '$app/state';
  import { Sun, Moon, Monitor } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let { children } = $props();

  let systemDark = $state(false);

  let effectiveTheme = $derived(app.theme ?? (systemDark ? 'dark' : 'light'));

  $effect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark = mq.matches;
    const handler = (e: MediaQueryListEvent) => systemDark = e.matches;
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  $effect(() => {
    document.documentElement.dataset.theme = effectiveTheme;
  });

  $effect(() => {
    if (app.theme) {
      localStorage.setItem('theme', app.theme);
    } else {
      localStorage.removeItem('theme');
    }
  });

  $effect(() => {
    localStorage.setItem('accent', app.accent);
    const variant = effectiveTheme === 'dark' ? 'dark' : 'light';
    const [a, ad, adk] = accents[app.accent][variant];
    const s = document.documentElement.style;
    s.setProperty('--accent', a);
    s.setProperty('--accent-dark', ad);
    s.setProperty('--accent-darker', adk);
  });

  function cycleTheme() {
    if (app.theme === null) app.theme = 'light';
    else if (app.theme === 'light') app.theme = 'dark';
    else app.theme = null;
  }

  $effect(() => {
    localStorage.setItem("trunic", String(app.trunic));
  });

  let currentIdx = $derived(pages.findIndex(p => p.path === page.url.pathname));
  let prevPage = $derived(currentIdx > 0 ? pages[currentIdx - 1] : null);
  let nextPage = $derived(currentIdx < pages.length - 1 ? pages[currentIdx + 1] : null);
  let pageNum = $derived(currentIdx >= 0 ? pages[currentIdx].num : 1);
</script>

<svelte:window onkeydown={(e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 'ArrowLeft' && prevPage) goto(prevPage.path);
  if (e.key === 'ArrowRight' && nextPage) goto(nextPage.path);
}} />

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="desk">
  <div class="toggles">
    <button class="toggle" class:active={app.trunic} onclick={() => app.trunic = !app.trunic}>
      Trunic
    </button>
    <button class="toggle theme-btn" onclick={cycleTheme} aria-label="Cycle theme">
      {#if app.theme === null}<Monitor size={14} />{:else if app.theme === 'light'}<Sun size={14} />{:else}<Moon size={14} />{/if}
    </button>
    <div class="accent-dots">
      {#each accentNames as name}
        <button
          class="accent-dot"
          class:active={app.accent === name}
          style="--dot-color: {accents[name][effectiveTheme === 'dark' ? 'dark' : 'light'][0]}"
          onclick={() => app.accent = name}
          aria-label="{name} accent"
        ></button>
      {/each}
    </div>
  </div>

  <div class="page">
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>

    {#if prevPage}
      <a class="page-turn prev" href={prevPage.path} aria-label="Previous page"></a>
    {/if}
    {#if nextPage}
      <a class="page-turn next" href={nextPage.path} aria-label="Next page"></a>
    {/if}

    <div class="page-inner">
      {@render children()}
    </div>

    <div class="page-num">{pageNum}</div>
  </div>

  <footer>
    Runes by <a href="https://github.com/aryanpingle/Runic">Aryan Pingle</a> &middot; Inspired by <a href="https://tunicgame.com">TUNIC</a>
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

  :global(:root) {
    --fs-xs: 13px;
    --fs-sm: 15px;
    --fs-base: 16px;
    --fs-lg: 20px;
    --fs-xl: 24px;

    --bg-page: #e8e0d0;
    --bg-page-border: #c8c0b4;
    --bg-box: #d4dfeb;
    --border-box: #8faabe;
    --shadow-box: #8faabe;
    --bg-lore: #ece4d2;
    --border-lore: #c8bea8;
    --shadow-lore: #c8bea8;
    --text: #2e2a25;
    --text-muted: #5a5550;
    --accent: #c46b7a;
    --accent-dark: #a35663;
    --accent-darker: #8a3a4a;
    --corner: #c8bea8;
    --code-bg: #2e2a25;
    --code-text: #e8e0d4;
    --btn-bg: white;
    --btn-border: #8faabe;
    --divider: #c8bea8;
    --dark-panel-bg: #1e1e24;
    --dark-panel-text: #d4d0cc;
    --dark-panel-heading: #e8e0d4;
    --bg-desk: #3a3a42;
    --dark-panel-muted: #a09a94;
  }

  :global(:root[data-theme="dark"]) {
    --bg-page: #1e1e24;
    --bg-page-border: #3a3a42;
    --bg-box: #242830;
    --border-box: #4a5a6e;
    --shadow-box: #12141a;
    --bg-lore: #22201c;
    --border-lore: #4a4840;
    --shadow-lore: #12100e;
    --text: #e8e0d4;
    --text-muted: #a09a94;
    --accent: #d4808e;
    --accent-dark: #b35a68;
    --accent-darker: #8a3a4a;
    --corner: #4a4840;
    --code-bg: #121018;
    --code-text: #e8e0d4;
    --btn-bg: #2a2a30;
    --btn-border: #4a5a6e;
    --divider: #3a3a42;
    --dark-panel-bg: #121218;
    --dark-panel-text: #d4d0cc;
    --dark-panel-heading: #e8e0d4;
    --bg-desk: #1a1a20;
    --dark-panel-muted: #a09a94;
  }

  :global(body) {
    margin: 0;
    font-family: 'Courier Prime', monospace;
    font-size: var(--fs-base);
    color: var(--text);
  }

  :global(a) {
    color: var(--accent);
    text-decoration: none;
  }
  :global(a:hover) {
    text-decoration: underline;
  }

  /* shared page components */
  :global(.ribbon) {
    background: var(--accent);
    color: white;
    text-align: center;
    font-size: var(--fs-xl);
    font-weight: bold;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.6rem 2.5rem 0.4rem;
    line-height: 1;
    position: relative;
    align-self: center;
  }
  :global(.ribbon::before), :global(.ribbon::after) {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 1.5rem;
  }
  :global(.ribbon::before) { right: 100%; background: var(--accent-dark); clip-path: polygon(100% 0, 100% 100%, 0 50%); filter: drop-shadow(-2px 3px 0 var(--accent-darker)); }
  :global(.ribbon::after) { left: 100%; background: var(--accent-dark); clip-path: polygon(0 0, 100% 50%, 0 100%); filter: drop-shadow(2px 3px 0 var(--accent-darker)); }

  :global(.lore) {
    background: var(--bg-lore);
    border: 1px solid var(--border-lore);
    padding: 0.75rem 1rem;
    text-align: center;
    font-style: italic;
    color: var(--text-muted);
    line-height: 1.7;
    font-size: var(--fs-sm);
    box-shadow: 3px 3px 0 var(--shadow-lore);
  }

  :global(.box) {
    background: var(--bg-box);
    border: 2px solid var(--border-box);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    box-shadow: 3px 3px 0 var(--shadow-box);
  }
  :global(.box h3) {
    font-size: var(--fs-sm);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 0.5rem 0;
  }

  .desk {
    min-height: 100vh;
    background: var(--bg-desk);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .page {
    position: relative;
    width: 100%;
    max-width: min(900px, 100%);
    max-height: 100%;
    aspect-ratio: 4 / 3;
    background: var(--bg-page);
    border: 2px solid var(--bg-page-border);
    box-shadow: 2px 3px 12px #0003;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .corner {
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: var(--corner);
    border-style: solid;
    z-index: 2;
    pointer-events: none;
  }
  .corner.tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
  .corner.tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
  .corner.bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
  .corner.br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

  /* invisible clickable page-turn strips along left/right edges */
  .page-turn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 48px;
    z-index: 3;
    cursor: pointer;
    text-decoration: none;
  }
  .page-turn.prev { left: 0; cursor: w-resize; }
  .page-turn.next { right: 0; cursor: e-resize; }
  .page-turn:hover { background: linear-gradient(to right, #0000000a, transparent); }
  .page-turn.next:hover { background: linear-gradient(to left, #0000000a, transparent); }

  .page-inner {
    flex: 1;
    display: flex;
    gap: 2.7rem;
    padding: 1.5rem 2.5rem 2rem;
    position: relative;
    z-index: 1;
  }

  .page-num {
    position: absolute;
    bottom: 0.75rem;
    right: 1.25rem;
    font-weight: bold;
    font-size: var(--fs-xl);
    color: var(--accent);
    z-index: 1;
  }

  .toggles {
    position: fixed; top: 1rem; right: 1rem; z-index: 10;
    display: flex; gap: 0.4rem;
  }

  .toggle {
    font-family: 'Courier Prime', monospace; font-size: var(--fs-xs); font-weight: bold;
    letter-spacing: 0.08em; text-transform: uppercase;
    background: var(--btn-bg); border: 2px solid var(--btn-border); border-radius: 6px;
    padding: 0.4rem 0.8rem; cursor: pointer; color: var(--text);
    display: flex; align-items: center; gap: 0.3rem;
  }
  .toggle:hover, .toggle.active { background: var(--accent); border-color: var(--accent); color: white; }

  .theme-btn { padding: 0.4rem 0.5rem; }

  .accent-dots {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    background: var(--btn-bg);
    border: 2px solid var(--btn-border);
    border-radius: 6px;
    padding: 0.3rem 0.45rem;
  }

  .accent-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: var(--dot-color);
    cursor: pointer;
    padding: 0;
    transition: transform 0.15s;
  }
  .accent-dot:hover { transform: scale(1.25); }
  .accent-dot.active { border-color: var(--text); }

  footer {
    padding: 0.75rem;
    font-size: var(--fs-xs);
    color: #7a7a80;
    text-align: center;
  }
  footer a { color: #a0a0a8; }

  @media (max-width: 700px) {
    .desk { background: var(--bg-page); }
    .page { aspect-ratio: auto; border: none; box-shadow: none; }
    .page-inner { flex-direction: column; padding: 1.5rem; gap: 1.4rem; }
    .corner { display: none; }
    .page-turn { display: none; }
    .page-num { display: none; }
  }
</style>
