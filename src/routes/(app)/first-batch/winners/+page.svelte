<script lang="ts">
	import { fade } from "svelte/transition";

	export let data;

	let board = new Array(data.count).fill(undefined);

	board = [...board.slice(0, data.count - data.winners.length), ...data.winners];
</script>

<div class="flex flex-col items-center justify-center w-full h-full relative z-50">
	<img
		src="/santas-list.png"
		alt="santa-list"
		transition:fade={{ duration: 1500 }}
		class="absolute h-[100%] w-[90%]"
	/>
	<div class="z-10 font-flower w-[47%] mt-10 font-bold mb-6">
		<div class="w-full grid grid-cols-2 text-4xl">
			<div>Name</div>
			<div>Department</div>
		</div>
	</div>

	<div
		class="grid grid-cols-6 gap-y-6 overflow-y-auto z-10 font-flower w-[47%] no-scrollbar h-[72%] space-y-2 bg-auto text-4xl"
	>
		{#each board as item, i}
			<div class="col-span-1 flex items-center justify-center">
				{#if i === 0}
					40,000
				{:else if i === 1}
					30,000
				{:else if i === 2}
					20,000
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
