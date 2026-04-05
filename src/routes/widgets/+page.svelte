<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app, accents } from "$lib/state.svelte";

  let copiedIdx = $state(-1);
  let siteName = $state("");
  let inputEl: HTMLInputElement;

  $effect(() => { inputEl?.focus(); });

  let dark = $derived(
    app.theme === 'dark' || (app.theme === null && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  let accent = $derived(accents[app.accent][dark ? 'dark' : 'light'][0]);

  const base = __BACKEND_URL__;
  let from = $derived(siteName.trim() || "YOUR_NAME");
  let prev = $derived(`${base}/prev?from=${from}`);
  let hub  = base;
  let next = $derived(`${base}/next?from=${from}`);

  type WidgetFn = (p: string, h: string, n: string, a: string) => string;
  type Widget = { name: string; light: WidgetFn; dark?: WidgetFn };

  const widgets: Widget[] = [
    {
      name: "Minimal",
      light: (p, h, n) => `<nav id="foxring">
  <a href="${p}">\u2190 Prev</a>
  <a href="${h}">\ud83e\udd8a Foxring</a>
  <a href="${n}">Next \u2192</a>
</nav>`,
    },
    {
      name: "Banner",
      light: (p, h, n, a) => `<div id="foxring" style="background:#f4f0ec;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;border:1px solid #c8bea8">
  <a href="${p}" style="color:${a};text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:#2e2a25;text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:${a};text-decoration:none">Next \u2192</a>
</div>`,
      dark: (p, h, n, a) => `<div id="foxring" style="background:#1e1e24;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;border:1px solid #3a3a42">
  <a href="${p}" style="color:${a};text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:#e8e0d4;text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:${a};text-decoration:none">Next \u2192</a>
</div>`,
    },
    {
      name: "Parchment",
      light: (p, h, n, a) => `<div id="foxring" style="background:#f4f0ec;border:2px solid #c8bea8;border-radius:8px;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;box-shadow:2px 2px 0 #c8bea8">
  <a href="${p}" style="color:${a};text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:#2e2a25;text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:${a};text-decoration:none">Next \u2192</a>
</div>`,
      dark: (p, h, n, a) => `<div id="foxring" style="background:#2a2a30;border:2px solid #3a3a42;border-radius:8px;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;box-shadow:2px 2px 0 #1a1a20">
  <a href="${p}" style="color:${a};text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:#e8e0d4;text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:${a};text-decoration:none">Next \u2192</a>
</div>`,
    },
    {
      name: "Pill",
      light: (p, h, n, a) => `<nav id="foxring" style="display:inline-flex;gap:0;font-family:monospace;font-size:12px;border-radius:999px;overflow:hidden;border:2px solid #8faabe">
  <a href="${p}" style="padding:6px 12px;color:#2e2a25;text-decoration:none;background:#d4dfeb">\u2190</a>
  <a href="${h}" style="padding:6px 14px;color:white;text-decoration:none;background:${a};font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="padding:6px 12px;color:#2e2a25;text-decoration:none;background:#d4dfeb">\u2192</a>
</nav>`,
      dark: (p, h, n, a) => `<nav id="foxring" style="display:inline-flex;gap:0;font-family:monospace;font-size:12px;border-radius:999px;overflow:hidden;border:2px solid #4a4a54">
  <a href="${p}" style="padding:6px 12px;color:#e8e0d4;text-decoration:none;background:#2a2a30">\u2190</a>
  <a href="${h}" style="padding:6px 14px;color:white;text-decoration:none;background:${a};font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="padding:6px 12px;color:#e8e0d4;text-decoration:none;background:#2a2a30">\u2192</a>
</nav>`,
    },
    {
      name: "Frost",
      light: (p, h, n, a) => `<div id="foxring" style="background:#d4dfeb;border:2px solid #8faabe;border-radius:6px;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;box-shadow:2px 2px 0 #8faabe">
  <a href="${p}" style="color:#2e2a25;text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:${a};text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:#2e2a25;text-decoration:none">Next \u2192</a>
</div>`,
      dark: (p, h, n, a) => `<div id="foxring" style="background:#1a2030;border:2px solid #2a3a50;border-radius:6px;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:monospace;font-size:13px;box-shadow:2px 2px 0 #101828">
  <a href="${p}" style="color:#8faabe;text-decoration:none">\u2190 Prev</a>
  <a href="${h}" style="color:${a};text-decoration:none;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="color:#8faabe;text-decoration:none">Next \u2192</a>
</div>`,
    },
    {
      name: "Outline",
      light: (p, h, n, a) => `<nav id="foxring" style="display:inline-flex;gap:8px;font-family:monospace;font-size:12px">
  <a href="${p}" style="padding:5px 10px;color:${a};text-decoration:none;border:2px solid ${a};border-radius:4px">\u2190 Prev</a>
  <a href="${h}" style="padding:5px 10px;color:white;text-decoration:none;background:${a};border:2px solid ${a};border-radius:4px;font-weight:bold">\ud83e\udd8a Foxring</a>
  <a href="${n}" style="padding:5px 10px;color:${a};text-decoration:none;border:2px solid ${a};border-radius:4px">Next \u2192</a>
</nav>`,
    },
  ];

  function getCode(widget: Widget): string {
    const fn = dark && widget.dark ? widget.dark : widget.light;
    return fn(prev, hub, next, accent);
  }

  async function copyWidget(idx: number) {
    await navigator.clipboard.writeText(getCode(widgets[idx]));
    copiedIdx = idx;
    setTimeout(() => copiedIdx = -1, 2000);
  }
</script>

<div class="full">
  <div class="ribbon">
    {#if app.trunic}<RuneText ipa="wɪdʒɪt ɡæləɹi" />{:else}Widget Gallery{/if}
  </div>

  <div class="controls">
    <input
      class="alias-input"
      type="text"
      placeholder="your site name"
      bind:this={inputEl}
      bind:value={siteName}
    />
  </div>

  <div class="grid">
    {#each widgets as widget, i}
      <div class="card">
        <div class="card-name">{widget.name}</div>
        <div class="card-preview">{@html getCode(widget)}</div>
        <button class="copy-btn" onclick={() => copyWidget(i)}>
          {copiedIdx === i ? "Copied!" : "Copy"}
        </button>
      </div>
    {/each}
  </div>

  <p class="note">These are just starting points&mdash;you can design your own widget however you like, as long as it links to <a href={prev}>/prev</a>, <a href={next}>/next</a>, and <a href={hub}>the hub</a>.</p>

  <a class="back" href="/join">&larr; Back to Join</a>
</div>

<style>
  .full {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: -1.5rem -2.5rem -2rem;
    padding: 1.5rem 2.5rem 2rem;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .alias-input {
    font-family: 'Courier Prime', monospace;
    font-size: 13px;
    text-align: center;
    padding: 0.4rem 1.25rem;
    border: 2px solid var(--btn-border);
    border-radius: 999px;
    background: var(--btn-bg);
    color: var(--text);
    outline: none;
    width: 14em;
    box-shadow: 2px 2px 0 var(--shadow-box);
  }
  .alias-input:focus {
    border-color: var(--accent);
    box-shadow: 2px 2px 0 var(--accent-dark);
  }
  .alias-input::placeholder {
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    width: 100%;
  }

  .card {
    background: var(--bg-box);
    border: 2px solid var(--border-box);
    border-radius: 8px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 2px 2px 0 var(--shadow-box);
  }

  .card-name {
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
  }
  .card-preview {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 40px;
    background: var(--btn-bg);
    border-radius: 4px;
    padding: 0.5rem;
  }

  .copy-btn {
    font-family: 'Courier Prime', monospace;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.3rem 0.75rem;
    cursor: pointer;
  }
  .copy-btn:hover { background: var(--accent-dark); }

  .note {
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
    font-style: italic;
    margin: 0;
    max-width: 360px;
  }

  .back {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
  }
  .back:hover { text-decoration: underline; }

  @media (max-width: 700px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
