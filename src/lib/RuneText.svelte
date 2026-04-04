<script lang="ts">
  import { parseString, type RenderableToken } from "./runic";
  import Rune from "./Rune.svelte";

  type Props = { ipa: string };
  let { ipa }: Props = $props();

  let tokens: RenderableToken[] = $derived(parseString(ipa));
</script>

<span class="rune-text">{#each tokens as token}{#if token.type === "phoneticSymbol"}<Rune {token} />{:else}{token.char}{/if}{/each}</span>

<style>
  .rune-text {
    white-space: normal;
  }
</style>
