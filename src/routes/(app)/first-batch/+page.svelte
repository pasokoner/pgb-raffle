<script lang="ts">
	import { enhance } from "$app/forms";

	import type { SubmitFunction } from "@sveltejs/kit";

	import BigRedButton from "$lib/components/big-red-button.svelte";
	import { cn } from "$lib/utils.js";
	import slotSound from "./slot.mp3";
	import Settings from "./settings.svelte";
	import { fade } from "svelte/transition";

	import { purgeCount } from "./settings";

	export let data;

	$: ({ departments } = data);

	let toPurge: string[] = [];

	async function shuffle(purge = 1) {
		if (departments.length - purge < 3) {
			purge = departments.length - 3;
		}

		if (departments.length <= 3) {
			purge = 1;
		}

		if (purge < 1) {
			return;
		}

		const audio = new Audio();
		audio.src = slotSound;

		for (let i = 0; i < 20; i++) {
			const willPurge: string[] = [];

			for (let j = 0; j < purge; j++) {
				const randInt = Math.floor(Math.random() * departments.length);
				const department = departments[randInt].id;

				if (willPurge.includes(department)) {
					j--;
					continue;
				}

				willPurge.push(department);
			}

			toPurge = [...willPurge];

			console.log(toPurge);

			audio.play();

			await new Promise((resolve) => {
				setTimeout(resolve, 50 + i * 3);
			});
		}

		departments = departments.filter((d) => !toPurge.includes(d.id));

		return toPurge;
	}

	const handleSubmit: SubmitFunction = async ({ formElement, formData, action, cancel }) => {
		const toPurge = await shuffle($purgeCount);

		if (toPurge === undefined || toPurge?.length === 0) {
			cancel();
		} else {
			toPurge!.forEach((v) => {
				formData.append("toPurge[]", v);
			});
		}

		return async ({ update }) => {
			await update();
		};
	};
</script>

<div class="relative mt-12 max-w-[80%] max-h-[80%] w-full h-full bg-[#F7EFE5]">
	<div
		class="relative h-full flex flex-wrap gap-4 items-center justify-center border-red-500 border-4 rounded-xl"
	>
		{#each departments as department (department.id)}
			<div
				transition:fade={{ delay: 250, duration: 2000 }}
				class={cn("text-2xl font-medium", toPurge.includes(department.id) ? "text-red-500" : "")}
			>
				{department.name}
			</div>
		{/each}

		<form
			method="POST"
			class="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
			use:enhance={handleSubmit}
			action="?/purge"
		>
			<input type="hidden" />
			<BigRedButton />
		</form>
	</div>
</div>

<Settings />
