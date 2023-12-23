<script lang="ts">
	import { fade } from "svelte/transition";

	import JSConfetti from "js-confetti";
	import { onDestroy, onMount } from "svelte";

	export let data;

	let confetti: JSConfetti | undefined;

	let board = new Array(data.count).fill(undefined);

	board = [...board.slice(0, data.count - data.winners.length), ...data.winners];

	onMount(() => {
		confetti = new JSConfetti();
		confetti.addConfetti({
			confettiNumber: 1000
		});
	});

	onDestroy(() => {
		confetti?.clearCanvas();
		confetti?.destroyCanvas();
	});
</script>

<div
	class="relative z-50 flex h-full w-full flex-col items-center justify-center"
	transition:fade={{ duration: 1500 }}
>
	<img src="/santas-list.png" alt="santa-list" class="absolute h-[100%] w-[90%]" />
	<div class="z-10 mb-6 mt-10 w-[47%] font-flower font-bold">
		<div class="grid w-full grid-cols-2 text-6xl">
			<div>Prize</div>
			<div>Department</div>
		</div>
	</div>

	<div
		class="no-scrollbar z-10 grid h-[72%] w-[47%] grid-cols-7 gap-y-6 space-y-2 overflow-y-auto bg-auto font-flower text-6xl font-semibold"
	>
		{#each board as item, i}
			<div class="col-span-2 flex items-center">
				{#if i === 0}
					35,000
				{:else if i === 1}
					30,000
				{:else if i === 2}
					25,000
				{:else}
					15,000
				{/if}
			</div>
			<div class="col-span-5 border-b-2 border-black">
				{#if typeof item === typeof data.winners[0] && item !== undefined}
					{item.name}
				{/if}
			</div>
		{/each}
	</div>
</div>
