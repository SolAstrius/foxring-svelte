<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";

  let copied = $state(false);

  const pub = __PUBLIC_URL__;
  const widgetCode = `<nav id="foxring">
  <a href="${pub}/prev?from=YOUR_URL">\u2190 Prev</a>
  <a href="${pub}">\ud83e\udd8a Foxring</a>
  <a href="${pub}/next?from=YOUR_URL">Next \u2192</a>
</nav>`;

  async function copyWidget() {
    await navigator.clipboard.writeText(widgetCode);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<div class="full">
  <div class="ribbon">
    {#if app.trunic}<RuneText ipa="dʒɔɪn ðə ɹɪŋ" />{:else}Join the Ring{/if}
  </div>

  <div class="checklist">
    <span class="check-item"><span class="check"></span> Have a personal website</span>
    <span class="sep">&middot;</span>
    <span class="check-item"><span class="check"></span> Add a widget</span>
    <span class="sep">&middot;</span>
    <span class="check-item"><span class="check"></span> <a href="/my">Register your site</a></span>
  </div>

  <div class="two-cols">
    <div class="col">
      <div class="path-label">Add a widget</div>
      <p class="path-desc">
        Plain HTML links that hit the ring API.
        Visitors click, get 307'd to the next site.
      </p>
      <div class="code-wrap">
        <pre>{widgetCode}</pre>
        <button class="copy-btn" onclick={copyWidget}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div class="endpoints">
        <code>GET /next?from=url → 307</code>
        <code>GET /prev?from=url → 307</code>
        <code>GET /random → 307</code>
        <code>GET /first → 307</code>
      </div>
    </div>

    <div class="divider"></div>

    <div class="col">
      <div class="path-label">JSON API</div>
      <p class="path-desc">
        Fetch neighbor data client&#8209;side and build your own UI.
        Requires JavaScript on the visitor's end.
      </p>
      <div class="endpoints">
        <code>GET /next/json?from=url</code>
        <code>GET /prev/json?from=url</code>
        <code>GET /random/json</code>
        <code>GET /first/json</code>
        <code>GET /list</code>
      </div>
      <p class="path-desc response-hint">
        Returns <code>{`{id, name, url, faviconName, status}`}</code>.
        All endpoints serve CORS <code>*</code>.
      </p>
    </div>
  </div>

  <div class="bottom-links">
    <a class="page-link" href="/widgets">Widget gallery &rarr;&nbsp;p.3</a>
    <a class="page-link" href="/my">Manage your sites &rarr;&nbsp;p.5</a>
  </div>
</div>

<style>
  .full {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .checklist {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 12px;
    color: var(--text-muted);
    flex-wrap: wrap;
    justify-content: center;
  }
  .check-item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .check {
    width: 10px;
    height: 10px;
    border: 2px solid var(--border-box);
    border-radius: 2px;
    flex-shrink: 0;
  }
  .sep { color: var(--border-lore); }

  .two-cols {
    display: flex;
    gap: 1.25rem;
    width: 100%;
    flex: 1;
  }

  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .divider {
    width: 2px;
    background: var(--divider);
    align-self: stretch;
    flex-shrink: 0;
  }

  .path-label {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
  }

  .path-desc {
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
  }

  .endpoints {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 11px;
    color: var(--text-muted);
  }
  .endpoints code {
    background: var(--code-bg);
    color: var(--code-text);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 10px;
    font-family: 'Courier Prime', monospace;
  }

  .response-hint {
    font-size: 11px;
    line-height: 1.6;
  }
  .response-hint code {
    background: var(--bg-lore);
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 10px;
  }

  .code-wrap {
    position: relative;
    background: var(--code-bg);
    border-radius: 4px;
    overflow: hidden;
  }
  .code-wrap pre {
    color: var(--code-text);
    font-family: 'Courier Prime', monospace;
    font-size: 10px;
    line-height: 1.5;
    padding: 0.5rem 0.6rem;
    margin: 0;
    overflow-x: auto;
    white-space: pre;
  }
  .copy-btn {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-family: 'Courier Prime', monospace;
    font-size: 9px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    cursor: pointer;
  }
  .copy-btn:hover { background: var(--accent-dark); }

  .bottom-links {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .page-link {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
  }
  .page-link:hover { text-decoration: underline; }

  @media (max-width: 700px) {
    .two-cols {
      flex-direction: column;
    }
    .divider {
      width: 100%;
      height: 2px;
    }
  }
</style>
