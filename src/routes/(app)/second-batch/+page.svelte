<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { enhance } from "$app/forms";

	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import { Input } from "$lib/components/ui/input";
	import Label from "$lib/components/ui/label/label.svelte";

	export let data;

	let forms: HTMLFormElement[] = new Array(data.departments.length).fill(undefined);

	let open = false;
</script>

<img src="christmas.svg" alt="christmas header" class="h-[360px] w-[640px] mt-16 mb-4" />

<form method="POST" use:enhance action="?/draw" class="relative w-[720px]">
	<input
		type="text"
		id="floating_filled"
		name="prize"
		class="block rounded-md px-2.5 pb-4 pt-5 w-full text-3xl text-white bg-[#ef424c] dark:bg-gray-700 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
		placeholder=" "
	/>
	<label
		for="floating_filled"
		class="absolute text-2xl font-semibold text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
		>Set Prize:</label
	>
</form>

<AltShortcut bind:open key="1" />

<Dialog.Root bind:open>
	<Dialog.Content class="flex flex-col max-h-[90%] h-full max-w-xl overflow-hidden overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-2">
			{#each data.departments as d, i (d.id)}
				<form
					method="POST"
					bind:this={forms[i]}
					action="?/threshold"
					class="grid grid-cols-12 items-center"
					use:enhance={async ({ formData }) => {
						formData.append("id", d.id);

						return async ({ update }) => {
							await update();
						};
					}}
				>
					<Label for="threshold" class="col-span-10">{d.name}</Label>
					<Input
						type="number"
						name="threshold"
						value={d.threshold}
						class="col-span-2"
						on:change={() => {
							forms[i].requestSubmit();
						}}
					/>
					<button class="hidden">DRAW</button>
				</form>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
