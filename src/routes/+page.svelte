<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";
  import type { Site } from "$lib/api";
  import { Dices } from "lucide-svelte";

  let { data } = $props();

  const base = __BACKEND_URL__;
  let sites = $derived(data.sites);

  function faviconUrl(site: Site): string | null {
    if (!site.faviconName) return null;
    return `${base}/favicons/${site.faviconName}`;
  }

  function isOnline(site: Site): boolean {
    return site.status?.status === 'success';
  }

  function ensureProtocol(url: string): string {
    return /^https?:\/\//.test(url) ? url : `https://${url}`;
  }

  function hostname(url: string): string {
    try { return new URL(ensureProtocol(url)).hostname; } catch { return url; }
  }
</script>

<div class="left">
  <div class="lore">
    {#if app.trunic}
      <RuneText ipa="tɹævəl ðə ɹɪŋ dɪskəvɝ wət əðɝz hæv faʊnd" />
    {:else}
      Travel the ring.<br>Discover what others have found.
    {/if}
  </div>

  <div class="fox-frame"><img class="fox" src="/fox.gif" alt="fox" /></div>

  <div class="ring-nav" class:trunic={app.trunic}>
    <a href="/random">
      {#if app.trunic}<RuneText ipa="vɛntʃɝ fɔɹθ" />{:else}<span class="venture-text">Venture forth</span>{/if}
      <span class="dots"></span>
      <Dices size={18} />
    </a>
  </div>

  <div class="left-bottom">
    <div class="news">
      <div class="news-header">
        {#if app.trunic}<RuneText ipa="læst nuz" />{:else}Last News{/if}
      </div>
      <div class="news-entry">
        <span class="news-date">2025-04-06</span>
        {#if app.trunic}
          <RuneText ipa="ðə ɹɪŋ ɪz oʊpən wɛlkəm tɹævəlɝ" />
        {:else}
          The ring is open. Welcome, traveler.
        {/if}
      </div>
    </div>

    <div class="ring-status">
      <span class="status-indicator"></span>
      {sites.filter(s => isOnline(s)).length}/{sites.length} online
    </div>

    <div class="sidebar-links">
      <a class="sidebar-badge" href="https://foxlab.dev">
        {#if app.trunic}<RuneText ipa="sɔɹs koʊd" />{:else}Src. Code{/if}
      </a>
      <a class="sidebar-badge" href="https://foxr.ing/docs">
        {#if app.trunic}<RuneText ipa="eɪpiːaɪ dɑks" />{:else}API Docs{/if}
      </a>
    </div>
  </div>
</div>

<div class="right">
  <div class="ribbon">
    {#if app.trunic}<RuneText ipa="fɑksɹɪŋ" />{:else}Foxring{/if}
  </div>

  <div class="box">
    <h3>
      {#if app.trunic}<RuneText ipa="ɹɪŋ mɛmbɝz" />{:else}Ring Members{/if}
      {#if sites.length > 0}
        <span class="member-count">{sites.length}</span>
      {/if}
    </h3>
    {#if sites.length > 0}
      <ul class="site-list">
        {#each sites as site, i}
          <li class:offline={!isOnline(site)}>
            <span class="idx">{i + 1}</span>
            <span class="status-dot" class:online={isOnline(site)} title={isOnline(site) ? 'online' : 'offline'}></span>
            {#if faviconUrl(site)}
              <img class="site-icon" src={faviconUrl(site)} alt="" />
            {/if}
            <a href={ensureProtocol(site.url)}>{site.name}</a>
            <span class="desc">{hostname(site.url)}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty">Could not load ring members.</p>
    {/if}
    <a class="page-ref" href="/join">
      {#if app.trunic}<RuneText ipa="dʒɔɪn ðə ɹɪŋ" />{:else}Join the Ring{/if}&nbsp;&rarr;&nbsp;p.2
    </a>
  </div>
</div>

<style>
  .left {
    flex: 0 0 auto;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .fox-frame {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 4px dashed color-mix(in srgb, var(--accent) 60%, transparent);
    box-sizing: border-box;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }
  .fox {
    width: 75%;
    image-rendering: pixelated;
  }

  .lore {
    margin-top: calc(var(--fs-xl) + 1rem + 1.25rem);
  }

  .box {
    padding: 1rem 1.25rem;
    flex: 1;
  }
  .box h3 {
    margin-bottom: 0.6rem;
  }

  .member-count {
    font-size: var(--fs-xs);
    color: var(--text-muted);
    font-weight: normal;
  }

  .site-list { list-style: none; padding-left: 0; margin: 0; }
  .site-list li {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 0; border-bottom: 1px dashed var(--border-box);
  }
  .site-list li.offline { opacity: 0.4; }
  .idx { color: var(--accent); font-weight: bold; min-width: 1.5em; text-align: right; font-size: var(--fs-xs); }
  .status-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: var(--text-muted);
  }
  .status-dot.online { background: var(--online); }
  .site-icon { width: 14px; height: 14px; flex-shrink: 0; border-radius: 2px; }
  .site-list a { color: var(--text); text-decoration: none; font-weight: bold; font-size: var(--fs-sm); }
  .site-list li:not(.offline) a:hover { color: var(--accent); }
  .desc { color: var(--text-muted); font-size: var(--fs-xs); margin-left: auto; white-space: nowrap; }

  .empty { color: var(--text-muted); font-size: var(--fs-sm); font-style: italic; margin: 0.5rem 0; }

  .page-ref {
    display: block;
    margin-top: 0.6rem;
    font-size: var(--fs-xs);
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    text-align: right;
  }
  .page-ref:hover { text-decoration: underline; }

  .left-bottom {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .news {
    border: 1px solid var(--border-lore);
    overflow: hidden;
    font-size: var(--fs-xs);
  }
  .news-header {
    background: var(--accent);
    color: white;
    font-size: var(--fs-xs);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.5rem;
  }
  .news-entry {
    padding: 0.4rem 0.5rem;
    line-height: 1.6;
    color: var(--text-muted);
  }
  .news-date {
    color: var(--accent);
    font-weight: bold;
    margin-right: 0.3rem;
  }

  .ring-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: var(--fs-xs);
    color: var(--text-muted);
    border: 1px solid var(--border-lore);
    padding: 0.3rem 0.5rem;
  }
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--online);
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .sidebar-links {
    display: flex;
    gap: 0.4rem;
  }
  .sidebar-badge {
    flex: 1;
    text-align: center;
    font-size: var(--fs-xs);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.4rem 0.5rem 0.22rem;
    border: 1px solid var(--border-lore);
    color: var(--accent);
    text-decoration: none;
  }
  .sidebar-badge:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
    text-decoration: none;
  }

  .ring-nav { grid-column: 1 / -1; text-align: center; }
  .ring-nav a {
    font-size: var(--fs-sm); font-weight: bold;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--accent); text-decoration: none;
    display: flex; align-items: baseline; justify-content: space-between;
    width: 100%;
  }
  .venture-text { position: relative; left: 1px; }
  .ring-nav a :global(svg) { position: relative; top: 0.2em; flex-shrink: 0; }
  .dots {
    flex: 1;
    overflow: hidden;
    margin: 0 0.3rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    height: 1em;
    line-height: 1;
  }
  .dots::before {
    content: '.....................................................';
    white-space: nowrap;
  }
  .ring-nav.trunic a { align-items: center; }
  .ring-nav.trunic a :global(svg) { top: 0; }
  .ring-nav a:hover { text-decoration: underline; }

  @media (max-width: 865px) {
    .left { display: contents; }
    .fox-frame { border: none; aspect-ratio: auto; margin: 0 auto; width: auto; order: -1; }
    .fox { width: 120px; }
    .right { order: 1; }
    .lore { order: 2; margin-top: 0; }
    .left-bottom { order: 3; }
    .ring-nav { order: 4; }
  }
</style>
