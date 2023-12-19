<script lang="ts">
	import { goto } from "$app/navigation";
	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import * as Dialog from "$lib/components/ui/dialog"
	import "../app.pcss";
	import DataTable from "./data-table.svelte";

	export let data

	let openEmployeeTable = false;

</script>

<svelte:head>
	<script
		type="text/javascript"
		async
		src="https://cdn.jsdelivr.net/npm/christmas-snow-3d@latest/build/snow3d.js"
	></script>
	<style>
		@font-face {
			font-family: "Flake";
			font-style: normal;
			font-weight: 500;
			src: url("/fonts/MerryChristmasFlake.ttf"); /* IE9 Compat Modes */
		}

		@font-face {
			font-family: "Star";
			font-style: normal;
			font-weight: 500;
			src: url("/fonts/MerryChristmasStar.ttf"); /* IE9 Compat Modes */
		}

		@font-face {
			font-family: "Indie Flower";
			font-style: cursive;
			font-weight: 400;
			src: url("/fonts/IndieFlower-Regular.ttf"); /* IE9 Compat Modes */
		}
	</style>

	<title>PGB Raffle</title>
</svelte:head>

<AltShortcut
	on:onPress={() => {
		goto("/first-batch");
	}}
	key="1"
/>
<AltShortcut
	on:onPress={() => {
		goto("/second-batch");
	}}
	key="2"
/>
<AltShortcut
	on:onPress={() => {
		goto("/third-batch/major");
	}}
	key="3"
/>

<AltShortcut
	on:onPress={() => {
		goto("/third-batch/minor");
	}}
	key="4"
/>

<AltShortcut
	on:onPress={() => {
		openEmployeeTable = !openEmployeeTable
	}}
	key="e"
/>

<Dialog.Root bind:open={openEmployeeTable}>
	<Dialog.Content class="flex flex-col max-h-[90%] h-full max-w-5xl overflow-hidden overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Employees</Dialog.Title>
		</Dialog.Header>
		
		<DataTable data={data.employees}/>
	</Dialog.Content>
</Dialog.Root>


<div class="bg-[#fff5e7] h-full w-full relative overflow-hidden flex flex-col items-center">
	<!-- CHRISTMAS LIGHTS -->
	<img
		src="/christmas-lights.webp"
		alt="christmas-lights"
		class="absolute -top-4 -rotate-2 left-0"
	/>

	<img
		src="/christmas-lights.webp"
		alt="christmas-lights"
		class="absolute -top-4 -scale-x-100 rotate-2 right-0"
	/>
	<!-- CHRISTMAS LIGHTS -->

	<!-- CRISTMAS STARS -->
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 animate-wiggle absolute top-32 left-[480px]"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 absolute top-[180px] left-[250px] animate-wiggle"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 absolute top-[250px] left-[400px] animate-wiggle"
	/>

	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 absolute top-32 right-[480px] animate-wiggle"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 absolute top-[180px] right-[250px] animate-wiggle"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="h-16 absolute top-[250px] right-[400px] animate-wiggle"
	/>
	<!-- CRISTMAS STARS -->

	<img
		src="/christmas-leaf.svg"
		alt="christmas header"
		class="absolute -scale-y-100 h-[500px] -bottom-5 right-0"
	/>
	<img
		src="/christmas-leaf.svg"
		alt="christmas header"
		class="absolute h-[500px] -scale-x-100 -scale-y-100 -bottom-5 left-0"
	/>

	<slot />
</div>
