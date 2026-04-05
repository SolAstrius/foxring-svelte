<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";
  import { page } from '$app/state';
  import { getUser, getMySites, addSite, deleteSite, authUrl, type User, type Site } from "$lib/api";
  import { Trash2 } from "lucide-svelte";

  let copied = $state(false);

  const base = __BACKEND_URL__;
  const pub = __PUBLIC_URL__;
  const widgetCode = `<nav id="foxring">
  <a href="${pub}/prev?from=YOUR_NAME">\u2190 Prev</a>
  <a href="${pub}">\ud83e\udd8a Foxring</a>
  <a href="${pub}/next?from=YOUR_NAME">Next \u2192</a>
</nav>`;

  let user = $state<User | null>(null);
  let mySites = $state<Site[]>([]);
  let loading = $state(true);
  let newUrl = $state("");
  let newName = $state("");
  let submitting = $state(false);
  let error = $state("");

  $effect(() => {
    (async () => {
      user = await getUser();
      if (user) mySites = await getMySites();
      loading = false;
    })();
  });

  async function handleAdd() {
    error = "";
    submitting = true;
    const result = await addSite(newUrl, newName || null);
    submitting = false;
    if (result.ok) {
      mySites = [...mySites, result.site];
      newUrl = "";
      newName = "";
    } else {
      error = result.error;
    }
  }

  async function handleDelete(site: Site) {
    if (await deleteSite(site.id)) {
      mySites = mySites.filter(s => s.id !== site.id);
    }
  }

  function signInUrl() {
    return authUrl(page.url.href);
  }

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
    <span class="check-item"><span class="check"></span> Register your site</span>
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
        <code>GET /next?from=name → 307</code>
        <code>GET /prev?from=name → 307</code>
        <code>GET /random → 307</code>
        <code>GET /first → 307</code>
      </div>
      <a class="gallery-link" href="/widgets">More widgets &rarr;&nbsp;p.3</a>
    </div>

    <div class="divider"></div>

    <div class="col">
      <div class="path-label">Register your site</div>
      <div class="account-section">
        {#if loading}
          <p class="muted">Checking auth...</p>
        {:else if !user}
          <p class="muted">To get an account, <a href="https://t.me/vanutp">message vanutp</a>.</p>
          <a class="btn" href={signInUrl()}>Sign in</a>
        {:else}
          <div class="user-header">
            <span class="muted">Signed in as <strong>{user.username}</strong></span>
          </div>
          {#if mySites.length > 0}
            <ul class="my-sites">
              {#each mySites as site}
                <li>
                  <a href={site.url}>{site.name}</a>
                  <span class="muted site-url">{site.url}</span>
                  <button class="delete-btn" onclick={() => handleDelete(site)} aria-label="Delete {site.name}">
                    <Trash2 size={12} />
                  </button>
                </li>
              {/each}
            </ul>
          {/if}
          <form class="add-form" onsubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <input class="field" type="url" placeholder="https://your.site" bind:value={newUrl} required />
            <input class="field" type="text" placeholder="Name (optional)" bind:value={newName} />
            <button class="btn" type="submit" disabled={submitting || !newUrl.trim()}>
              {submitting ? "Add" : "Add"}
            </button>
          </form>
          {#if error}
            <p class="error">{error}</p>
          {/if}
        {/if}
      </div>

      <div class="path-label">JSON API</div>
      <div class="endpoints">
        <code>GET /next/json?from=name</code>
        <code>GET /prev/json?from=name</code>
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

  <div class="how-it-works lore">
    <div class="flow">
      <span class="flow-node">Visitor</span>
      <span class="flow-arrow">&rarr;</span>
      <span class="flow-node">Your widget</span>
      <span class="flow-arrow">&rarr;</span>
      <span class="flow-node accent">foxr.ing</span>
      <span class="flow-arrow">&rarr;</span>
      <span class="flow-node">Next site</span>
      <span class="flow-arrow">&rarr;</span>
      <span class="flow-node">...</span>
      <span class="flow-arrow">&rarr;</span>
      <span class="flow-node">Your widget</span>
    </div>
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

  .account-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--bg-lore);
    border: 1px solid var(--border-lore);
    border-radius: 6px;
    padding: 0.6rem 0.75rem;
  }

  .user-header { font-size: 12px; }

  .my-sites {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .my-sites li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0;
    border-bottom: 1px dashed var(--border-box);
    font-size: 12px;
  }
  .my-sites a {
    color: var(--text);
    font-weight: bold;
    text-decoration: none;
  }
  .my-sites a:hover { color: var(--accent); }
  .site-url { font-size: 10px; margin-left: auto; }
  .delete-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .delete-btn:hover { color: var(--accent); }

  .add-form {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .field {
    font-family: 'Courier Prime', monospace;
    font-size: 11px;
    padding: 0.35rem 0.6rem;
    border: 2px solid var(--btn-border);
    border-radius: 4px;
    background: var(--btn-bg);
    color: var(--text);
    outline: none;
    flex: 1;
    min-width: 0;
  }
  .field:focus {
    border-color: var(--accent);
  }
  .field::placeholder { color: var(--text-muted); }

  .btn {
    font-family: 'Courier Prime', monospace;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    text-align: center;
  }
  .btn:hover { background: var(--accent-dark); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .muted { color: var(--text-muted); font-size: 12px; margin: 0; }

  .error {
    color: #c44;
    font-size: 11px;
    margin: 0;
  }

  .how-it-works {
    width: 100%;
    text-align: center;
    font-style: normal;
  }
  .flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  .flow-node {
    background: var(--code-bg);
    color: var(--code-text);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 10px;
    font-family: 'Courier Prime', monospace;
  }
  .flow-node.accent {
    background: var(--accent);
    color: white;
    font-weight: bold;
  }
  .flow-arrow {
    color: var(--text-muted);
    font-size: 12px;
  }

  .gallery-link {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    text-align: right;
  }
  .gallery-link:hover { text-decoration: underline; }

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
