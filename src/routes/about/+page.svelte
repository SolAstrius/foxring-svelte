<script lang="ts">
  import RuneText from "$lib/RuneText.svelte";
  import { app } from "$lib/state.svelte";
</script>

<div class="spread">
  <div class="dark-panel">
    <div class="dark-header">
      {#if app.trunic}
        <RuneText ipa="ə lɔŋ lɔŋ taɪm əɡoʊ" />
      {:else}
        A long, long time ago...
      {/if}
    </div>

    <div class="dark-body">
      {#if app.trunic}
        <RuneText ipa="nɛtɪzənz kɹæftɪd hoʊmpeɪdʒɪz ænd ʃɛɹd ðɛm fɹili ðeɪ hɑɪpɝlɪŋkt tu wən ənəðɝ fɔɹmɪŋ ɹɪŋz əv dɪskəvɝi ðæt spænd ðə ɛntaɪɝ ɪntɝwɛb" />
      {:else}
        Netizens crafted homepages and shared them freely.
        They hyperlinked to one another, forming
        webrings that spanned the entire interweb.
      {/if}
    </div>

    <div class="dark-body">
      {#if app.trunic}
        <RuneText ipa="ðɛn keɪm ðə ɡɹeɪt saɪloʊz ænd ðə ɹɪŋz wɝ fɔɹɡɑtən" />
      {:else}
        Then came the great silos,
        and the rings were forgotten.
      {/if}
    </div>
  </div>

  <div class="light-side">
    <div class="section">
      <h3>
        {#if app.trunic}<RuneText ipa="ðə ɹɪŋ ɹɪtɝnz" />{:else}The Ring Returns{/if}
      </h3>
      <p>
        {#if app.trunic}
          <RuneText ipa="fɑksɹɪŋ ɪz ə wɛbɹɪŋ ə kəlɛkʃən əv pɝsənəl wɛbsaɪts lɪŋkt ɪn ə luːp ɪts ðə oʊld weɪ əv faɪndɪŋ ɪntɹɛstɪŋ kɔɹnɝz əv ðə wɛb bɪlt baɪ ɹil pipəl" />
        {:else}
          Foxring is a <strong>webring</strong>&mdash;a collection of
          personal websites linked in a loop. It's the old way of
          finding interesting corners of the web, built by real people.
        {/if}
      </p>
    </div>

    <div class="section credits">
      <p>
        {#if app.trunic}
          <RuneText ipa="dɪzaɪnd baɪ soʊl ɑstɹius fɔɪnɪks meɪnteɪnd baɪ vɑnutp" />
        {:else}
          Designed by <a href="https://solastrius.ink" class="credit-link">Sol Astrius Phoenix</a><br>
          Maintained by <a href="https://vanutp.dev" class="credit-link">vanutp</a>
        {/if}
      </p>
    </div>
  </div>
</div>

<style>
  .spread {
    display: flex;
    flex: 1;
    gap: 0;
    margin: -1.5rem -2.5rem -2rem;
  }

  /* dark left panel — inspired by TUNIC p.7 */
  .dark-panel {
    flex: 0 0 45%;
    background: var(--dark-panel-bg);
    color: var(--dark-panel-text);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    border-right: 2px solid var(--bg-page-border);
  }

  .dark-header {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.1em;
    color: var(--dark-panel-heading);
  }

  .dark-body {
    font-size: 13px;
    line-height: 1.8;
    color: var(--dark-panel-muted);
  }

  /* right side — warm parchment */
  .light-side {
    flex: 1;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    justify-content: center;
  }

  .section h3 {
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 0.5rem 0;
    color: var(--accent);
  }

  .section p {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0;
  }

  .credits {
    font-style: italic;
  }
  .credits :global(.credit-link) {
    color: var(--accent);
    font-weight: bold;
    text-decoration: none;
  }
  .credits :global(.credit-link:hover) { text-decoration: underline; }

  @media (max-width: 700px) {
    .spread {
      flex-direction: column;
      margin: -1.5rem;
    }
    .dark-panel {
      flex: none;
      border-right: none;
      border-bottom: 2px solid var(--bg-page-border);
      padding: 1.5rem;
    }
    .light-side {
      padding: 1.5rem;
    }
  }
</style>
