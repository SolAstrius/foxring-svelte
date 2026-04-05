<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";
  import { page } from '$app/state';
  import { getUser, getMySites, addSite, deleteSite, authUrl, type User, type Site } from "$lib/api";
  import { Trash2 } from "lucide-svelte";

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

  let confirmingId = $state<number | null>(null);
  let confirmTimer: ReturnType<typeof setTimeout>;

  function requestDelete(site: Site) {
    if (confirmingId === site.id) {
      clearTimeout(confirmTimer);
      confirmingId = null;
      deleteSite(site.id).then(ok => {
        if (ok) mySites = mySites.filter(s => s.id !== site.id);
      });
    } else {
      confirmingId = site.id;
      clearTimeout(confirmTimer);
      confirmTimer = setTimeout(() => confirmingId = null, 3000);
    }
  }

  function signInUrl() {
    return authUrl(page.url.href);
  }
</script>

<div class="manage">
  <div class="ribbon">
    {#if app.trunic}<RuneText ipa="mænədʒ saɪts" />{:else}Manage Sites{/if}
  </div>

  {#if loading}
    <p class="muted">Loading...</p>
  {:else if !user}
    <div class="auth-box box">
      <p class="muted">To get an account, <a href="https://t.me/vanutp">message vanutp</a>.</p>
      <a class="btn" href={signInUrl()}>Sign in</a>
    </div>
  {:else}
    <p class="muted">Signed in as <strong>{user.username}</strong></p>

    <div class="box sites-box">
      <h3>Your sites</h3>
      {#if mySites.length > 0}
        <ul class="my-sites">
          {#each mySites as site}
            <li>
              <span class="site-name">{site.name}</span>
              <span class="site-url">{site.url}</span>
              {#if confirmingId === site.id}
                <button class="confirm-btn" onclick={() => requestDelete(site)}>sure?</button>
              {:else}
                <button class="delete-btn" onclick={() => requestDelete(site)} aria-label="Delete {site.name}">
                  <Trash2 size={12} />
                </button>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="muted">No sites yet.</p>
      {/if}

      <form class="add-form" onsubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <div class="form-row">
          <input class="field" type="url" placeholder="https://your.site" bind:value={newUrl} required />
          <input class="field" type="text" placeholder="Name (optional)" bind:value={newName} />
          <button class="btn" type="submit" disabled={submitting || !newUrl.trim()}>
            {submitting ? "Adding..." : "Add site"}
          </button>
        </div>
      </form>
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </div>
  {/if}

  <a class="back" href="/join">&larr; Back to Join</a>
</div>

<style>
  .manage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .auth-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    max-width: 320px;
    text-align: center;
  }

  .sites-box {
    width: 100%;
    max-width: 500px;
  }

  .my-sites {
    list-style: none;
    padding: 0;
    margin: 0 0 0.75rem;
  }
  .my-sites li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0;
    border-bottom: 1px dashed var(--border-box);
    font-size: var(--fs-xs);
  }
  .site-name {
    font-weight: bold;
    color: var(--text);
  }
  .site-url {
    color: var(--text-muted);
    font-size: var(--fs-xs);
    margin-left: auto;
  }
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
  .confirm-btn {
    background: none;
    border: none;
    color: #c44;
    cursor: pointer;
    padding: 0.1rem 0.3rem;
    font-family: 'Courier Prime', monospace;
    font-size: var(--fs-xs);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }
  .confirm-btn:hover { text-decoration: underline; }

  .add-form { margin: 0; }
  .form-row {
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }
  .field {
    font-family: 'Courier Prime', monospace;
    font-size: var(--fs-xs);
    padding: 0.35rem 0.6rem;
    border: 2px solid var(--btn-border);
    border-radius: 4px;
    background: var(--btn-bg);
    color: var(--text);
    outline: none;
    flex: 1;
    min-width: 0;
  }
  .field:focus { border-color: var(--accent); }
  .field::placeholder { color: var(--text-muted); }

  .btn {
    font-family: 'Courier Prime', monospace;
    font-size: var(--fs-xs);
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
  }
  .btn:hover { background: var(--accent-dark); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .muted { color: var(--text-muted); font-size: var(--fs-xs); margin: 0; }

  .error {
    color: #c44;
    font-size: var(--fs-xs);
    margin: 0.25rem 0 0;
  }

  .back {
    font-size: var(--fs-xs);
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
  }
  .back:hover { text-decoration: underline; }

  @media (max-width: 865px) {
    .form-row { flex-direction: column; }
  }
</style>
