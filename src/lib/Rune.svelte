<script lang="ts">
  import type { RuneToken } from "./runic";

  type Props = { token: RuneToken };
  let { token }: Props = $props();

  const lines: [number,number,number,number][] = [
    [0,3,3,3],[1.5,0,3,1],[3,5,1.5,6],[1.5,6,0,5],
    [0,5,0,4],[0,3,0,1],[0,1,1.5,0],[1.5,0,1.5,2],
    [3,1,1.5,2],[1.5,4,3,5],[1.5,4,1.5,6],[1.5,4,0,5],
    [1.5,2,0,1],[1.5,2,1.5,3],
  ];
</script>

<svg viewBox="-0.3 -0.3 3.6 7.6" xmlns="http://www.w3.org/2000/svg">
  {#each lines as [x1,y1,x2,y2], i}
    {#if (token.bitmask & (1 << (14 - i))) !== 0}
      <line {x1} {y1} {x2} {y2} />
    {/if}
  {/each}
  {#if (token.bitmask & 1) !== 0}
    <circle cx={1.5} cy={6.5} r={0.5} fill="none" />
  {/if}
</svg>

<style>
  svg {
    height: 1.4em;
    vertical-align: text-bottom;
    display: inline-block;
  }
  line {
    stroke: currentColor;
    stroke-width: 0.35;
    stroke-linecap: round;
  }
  circle {
    stroke: currentColor;
    stroke-width: 0.35;
  }
</style>
