<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";

	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import { Input } from "$lib/components/ui/input";

	export let departments: {
		id: string;
		name: string;
		purgeDate: Date | null;
		threshold: number;
	}[];

	let open = false;
</script>

<AltShortcut bind:open key="1" />

<Dialog.Root bind:open>
	<Dialog.Content class="flex flex-col max-h-[90%] h-full max-w-xl overflow-hidden overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-2">
			{#each departments as d (d.id)}
				<form method="POST" class="grid grid-cols-12 items-center">
					<div class="col-span-10">{d.name}</div>
					<Input type="number" value={d.threshold} class="col-span-2" />
				</form>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
