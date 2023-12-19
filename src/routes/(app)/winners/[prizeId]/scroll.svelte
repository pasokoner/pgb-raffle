<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	export let winners: {
		employees: {
			name: string;
			onDuty: boolean;
		} | null;
		departments: {
			name: string;
		} | null;
	}[] = [];

	let element: HTMLDivElement;
	let intervalId: NodeJS.Timeout | undefined;
	let interval = 3000;

	function scrollElementEveryMillisecond() {
		const maxScroll = element.scrollHeight - element.clientHeight;
		let scrollDistance = 1;
		const scrollFunction = () => {
			interval = 20;
			const currentScroll = element.scrollTop;

			// Calculate the new scroll position
			const newScroll = currentScroll + scrollDistance;

			// Scroll the element to the new position
			element.scrollTop = newScroll;

			if (currentScroll >= maxScroll && scrollDistance > 0) {
				scrollDistance = -1;
				interval = 3000;
			}

			if (currentScroll <= 1 && scrollDistance < 0) {
				scrollDistance = 1;

				interval = 3000;
			}

			clearInterval(intervalId);
			intervalId = setInterval(scrollFunction, interval);
		};

		intervalId = setInterval(scrollFunction, interval);
	}

	export const toggleScrolling = () => {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
			return;
		}

		scrollElementEveryMillisecond();
	};

	onMount(() => scrollElementEveryMillisecond());
</script>

<img
	src="/santas-list.png"
	alt="santa-list"
	transition:fade={{ duration: 1500 }}
	class="absolute h-[100%] w-[90%]"
/>
<div class="z-10 font-flower w-[47%] mt-6 font-bold">
	<div class="w-full grid grid-cols-2 text-4xl">
		<div>Name</div>
		<div>Department</div>
	</div>
</div>
<div
	bind:this={element}
	transition:fade={{ duration: 1500 }}
	class="z-10 font-flower w-[47%] no-scrollbar h-[72%] space-y-2 bg-auto overflow-y-auto"
>
	{#each winners as winner}
		<div class="w-full grid grid-cols-2 text-4xl">
			<div>
				{winner.employees?.name}
				{winner.employees?.onDuty ? " (DUTY)" : ""}
			</div>
			<div>
				{winner.departments?.name}
			</div>
		</div>
	{/each}
</div>
