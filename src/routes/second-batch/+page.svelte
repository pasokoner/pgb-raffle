<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { enhance } from "$app/forms";

	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import { Input } from "$lib/components/ui/input";
	import Label from "$lib/components/ui/label/label.svelte";
	import { cn } from "$lib/utils.js";

	export let data;

	let forms: HTMLFormElement[] = new Array(data.departments.length).fill(undefined);

	let open = false;
</script>

<AltShortcut bind:open key="s" />

<div class="flex h-full w-[70%] flex-col items-center pt-12">
	<!-- <img src="christmas.svg" alt="christmas header" class="h-[360px] w-[640px]" /> -->
	<div class="flex items-center gap-4">
		<img src="/bataan-seal.png" alt="bataan seal" class="h-[120px]" />
		<img src="/1bataan.png" alt="1bataan logo" class="h-[120px]" />
	</div>
	<img src="/year-end.png" alt="christmas header" class="h-[580px]" />

	<form method="POST" use:enhance action="?/draw" class="relative w-[900px]">
		<input
			type="text"
			id="floating_filled"
			name="prize"
			class="peer block w-full appearance-none rounded-md border-gray-300 bg-[#ef424c] px-2.5 pb-4 pt-5 text-7xl text-white focus:outline-none focus:ring-0 dark:bg-gray-700"
			placeholder=" "
		/>
		<label
			for="floating_filled"
			class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-50 transform text-5xl font-semibold text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-50 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
			>Set Prize:</label
		>
	</form>
</div>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex h-full max-h-[90%] max-w-5xl flex-col overflow-hidden overflow-y-auto"
	>
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
					<Label for="threshold" class="col-span-10 flex flex-col text-3xl"
						>{d.name}
						<div class="text-xl text-gray-500">
							Employee: {d.employees.length}
						</div>
					</Label>
					<Input
						type="number"
						name="threshold"
						value={d.threshold}
						class={cn(
							"col-span-2 text-3xl",
							d.threshold > d.employees.length
								? "border-2 border-red-500 text-3xl text-red-500"
								: ""
						)}
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
