<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";
  import { members } from "$lib/members";
  import { Dices } from "lucide-svelte";

  const base = __BACKEND_URL__;
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
    </h3>
    <ul class="site-list">
      {#each members as member, i}
        <li>
          <span class="idx">{i + 1}</span>
          <a href={member.url}>{member.title}</a>
          <span class="desc">{member.alias}</span>
        </li>
      {/each}
      {#if members.length < 10}
        {@const labels = ["X", "Y", "Z"]}
        {@const count = Math.min(10 - members.length, 3)}
        {#each { length: count } as _, j}
          <li class="ghost">
            <span class="idx">{labels[j]}</span>
            <span class="ghost-name">{j === count - 1 ? "maybe you?" : "???"}</span>
          </li>
        {/each}
      {/if}
    </ul>
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

  .site-list { list-style: none; padding-left: 0; }
  .site-list li {
    display: flex; align-items: baseline; gap: 0.75rem;
    padding: 0.4rem 0; border-bottom: 1px dashed var(--border-box);
  }
  .idx { color: var(--accent); font-weight: bold; min-width: 1.5em; text-align: right; }
  .site-list a { color: var(--text); text-decoration: none; font-weight: bold; }
  .site-list a:hover { color: var(--accent); }
  .desc { color: var(--text-muted); font-size: 12px; margin-left: auto; }

  .ghost { opacity: 0.4; font-style: italic; }
  .ghost .idx { color: var(--border-box); }
  .ghost-name { color: var(--border-box); }

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
