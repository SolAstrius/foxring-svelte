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

  <div class="letter">
    <p class="greeting">
      {#if app.trunic}
        <RuneText ipa="dɪɹ tɹævəlɝ" />
      {:else}
        Dear traveler,
      {/if}
    </p>

    <p class="body-text">
      {#if app.trunic}
        <RuneText ipa="tu dʒɔɪn ðə ɹɪŋ ju nid" />
      {:else}
        To join the ring, you need:
      {/if}
    </p>

    <ul class="checklist">
      <li>
        <span class="check"></span>
        <span>{#if app.trunic}<RuneText ipa="ə pɝsənəl wɛbsaɪt wɪð ə fɑksɹɪŋ wɪdʒɪt" />{:else}A personal website with a <a href="/widgets">foxring widget</a> on it{/if}</span>
      </li>
      <li>
        <span class="check"></span>
        <span>{#if app.trunic}<RuneText ipa="ən əkaʊnt ɑn wən" />{:else}An account on <a href="https://one.vanutp.dev/">one.vanutp.dev</a>{/if}</span>
      </li>
      <li>
        <span class="check"></span>
        <span>{#if app.trunic}<RuneText ipa="ɹɛdʒɪstɝ jɔɹ saɪt ɑn ðə ɹɪŋ" />{:else}To <a href="/my">register your site</a> on the ring{/if}</span>
      </li>
    </ul>

    <p class="section-label">
      {#if app.trunic}<RuneText ipa="ðə wɪdʒɪt" />{:else}The widget{/if}
    </p>

    <div class="code-wrap">
      <pre>{widgetCode}</pre>
      <button class="copy-btn" onclick={copyWidget}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>

    <p class="body-text">
      {#if app.trunic}
        <RuneText ipa="pleɪn lɪŋks ðæt hɪt ðə ɹɪŋ peɪst ɪt ɛniwɛɹ ɑn jɔɹ saɪt" />
      {:else}
        Plain links that hit the ring. Paste it anywhere on your site.
      {/if}
    </p>

    <div class="links">
      <a class="page-link" href="/widgets">
        {#if app.trunic}<RuneText ipa="wɑnt fænsiɝ" />{:else}Want fancier?{/if}
        <span class="dots"></span>
        {#if app.trunic}<RuneText ipa="wɪdʒɪt ɡæləɹi" />{:else}Widget Gallery{/if}
        &rarr;&nbsp;p.3
      </a>
      <a class="page-link" href="https://foxr.ing/docs">
        {#if app.trunic}<RuneText ipa="fʊl eɪpiːaɪ" />{:else}Full API{/if}
        <span class="dots"></span>
        {#if app.trunic}<RuneText ipa="dɑks" />{:else}foxr.ing/docs{/if}
      </a>
    </div>

  </div>

</div>

<style>
  .full {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .letter {
    width: 100%;
    max-width: 60%;
    font-style: normal;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: auto 0;
  }

  .greeting {
    font-size: var(--fs-lg);
    font-weight: bold;
    font-style: italic;
    margin: 0;
  }

  .body-text {
    font-size: var(--fs-sm);
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0;
  }

  .checklist {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: var(--fs-sm);
  }
  .checklist li {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  .check {
    width: 12px;
    height: 12px;
    border: 2px solid var(--border-box);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .section-label {
    font-size: var(--fs-sm);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin: 0.5rem 0 0;
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
    font-size: var(--fs-xs);
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
    font-size: var(--fs-xs);
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

  .links {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .page-link {
    font-size: var(--fs-xs);
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    display: flex;
    align-items: baseline;
  }
  .page-link:hover { text-decoration: underline; }
  .dots {
    flex: 1;
    overflow: hidden;
    margin: 0 0.3rem;
    color: var(--accent);
    height: 1em;
    line-height: 1;
  }
  .dots::before {
    content: '......................................................';
    white-space: nowrap;
  }

  @media (max-width: 865px) {
    .letter { max-width: 100%; }
  }
</style>
