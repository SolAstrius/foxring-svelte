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

  function hostname(url: string): string {
    try { return new URL(url).hostname; } catch { return url; }
  }
</script>

<div class="left">
  <img class="fox" src="/fox.gif" alt="fox" />

  <div class="lore">
    {#if app.trunic}
      <RuneText ipa="tɹævəl ðə ɹɪŋ dɪskəvɝ wət əðɝz hæv faʊnd" />
    {:else}
      Travel the ring.<br>Discover what others have found.
    {/if}
  </div>

  <div class="ring-nav">
    <a href={`${base}/prev?from=foxring`}>&larr;&nbsp;Prev</a>
    <a href={`${base}/random`}><Dices size={18} /></a>
    <a href={`${base}/next?from=foxring`}>Next&nbsp;&rarr;</a>
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
            <a href={site.url}>{site.name}</a>
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    align-content: start;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .fox { width: 160px; image-rendering: pixelated; grid-column: 1 / -1; justify-self: center; }

  .lore {
    grid-column: 1 / -1;
  }

  .box {
    padding: 1rem 1.25rem;
    flex: 1;
  }
  .box h3 {
    margin-bottom: 0.6rem;
  }

  .member-count {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: normal;
  }

  .site-list { list-style: none; padding-left: 0; margin: 0; }
  .site-list li {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.35rem 0; border-bottom: 1px dashed var(--border-box);
  }
  .site-list li.offline { opacity: 0.4; }
  .idx { color: var(--accent); font-weight: bold; min-width: 1.5em; text-align: right; font-size: 12px; }
  .status-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    background: var(--text-muted);
  }
  .status-dot.online { background: #5a9e6f; }
  .site-icon { width: 14px; height: 14px; flex-shrink: 0; border-radius: 2px; }
  .site-list a { color: var(--text); text-decoration: none; font-weight: bold; font-size: 13px; }
  .site-list li:not(.offline) a:hover { color: var(--accent); }
  .desc { color: var(--text-muted); font-size: 11px; margin-left: auto; white-space: nowrap; }

  .empty { color: var(--text-muted); font-size: 12px; font-style: italic; margin: 0.5rem 0; }

  .page-ref {
    display: block;
    margin-top: 0.6rem;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    text-align: right;
  }
  .page-ref:hover { text-decoration: underline; }

  .ring-nav { display: contents; }
  .ring-nav a {
    font-family: inherit; font-size: 12px; font-weight: bold;
    letter-spacing: 0.08em; text-transform: uppercase;
    background: var(--btn-bg); border: 2px solid var(--btn-border); border-radius: 6px;
    padding: 0.4rem 0.9rem; cursor: pointer; color: var(--text);
    white-space: nowrap; box-shadow: 2px 2px 0 var(--shadow-box);
    text-decoration: none; text-align: center;
    display: flex; align-items: center; justify-content: center;
  }
  .ring-nav a:hover { background: var(--accent); border-color: var(--accent); color: white; box-shadow: 2px 2px 0 var(--accent-dark); text-decoration: none; }

  @media (max-width: 700px) {
    .left { width: 100%; }
    .fox { width: 120px; }
  }
</style>
