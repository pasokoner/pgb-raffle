<script lang="ts">
	import { format } from "date-fns";

	export let data;
</script>

<div class="grid h-full w-[60%] grid-cols-2 gap-x-4 overflow-y-auto">
	<div class="flex flex-col">
		<h2 class="text-2xl">Minor Prize</h2>
		{#each data.minorPrize as minor}
			<a href="/winners/{minor.id}" class="text-blue-400 hover:text-blue-300"
				>{minor.name} - {#if minor.createdAt}
					{format(minor.createdAt, "MM-dd-yy HH:mm")}
				{/if}</a
			>
		{/each}
	</div>

	<div class="flex flex-col">
		<h2 class="text-2xl">Major Prize</h2>
		{#each data.majorPrize as major}
			<a href="/winners/{major.id}" class="text-blue-400 hover:text-blue-300"
				>{major.name} - {#if major.createdAt}
					{format(major.createdAt, "MM-dd-yy HH:mm")}
				{/if}</a
			>
		{/each}
	</div>
</div>
