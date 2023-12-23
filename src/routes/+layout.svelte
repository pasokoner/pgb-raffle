<script lang="ts">
	import { goto } from "$app/navigation";
	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import "../app.pcss";
	import DataTable from "./data-table.svelte";

	export let data;

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
		openEmployeeTable = !openEmployeeTable;
	}}
	key="e"
/>

<AltShortcut
	on:onPress={() => {
		goto("/history");
	}}
	key="h"
/>

<AltShortcut
	on:onPress={() => {
		goto("/rules");
	}}
	key="r"
/>

<Dialog.Root bind:open={openEmployeeTable}>
	<Dialog.Content
		class="flex h-full max-h-[90%] max-w-5xl flex-col overflow-hidden overflow-y-auto"
	>
		<Dialog.Header>
			<Dialog.Title>Employees</Dialog.Title>
		</Dialog.Header>

		<DataTable data={data.employees} />
	</Dialog.Content>
</Dialog.Root>

<div class="w-fulloverflow-hidden relative h-full bg-[url('/jingle-bells.jpg')] bg-cover">
	<!-- CHRISTMAS LIGHTS -->
	<!-- <img
		src="/christmas-lights.webp"
		alt="christmas-lights"
		class="absolute -top-4 left-0 -rotate-2"
	/>

	<img
		src="/christmas-lights.webp"
		alt="christmas-lights"
		class="absolute -top-4 right-0 rotate-2 -scale-x-100"
	/> -->
	<!-- CHRISTMAS LIGHTS -->

	<!-- CRISTMAS STARS -->
	<!-- <img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute left-[480px] top-32 h-16"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute left-[250px] top-[180px] h-16"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute left-[400px] top-[250px] h-16"
	/>

	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute right-[480px] top-32 h-16"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute right-[250px] top-[180px] h-16"
	/>
	<img
		src="/christmas-star.webp"
		alt="christmas star"
		class="animate-wiggle absolute right-[400px] top-[250px] h-16"
	/> -->
	<!-- CRISTMAS STARS -->
	<!-- 
	<img
		src="/christmas-leaf.svg"
		alt="christmas header"
		class="absolute -bottom-5 right-0 h-[500px] -scale-y-100"
	/>
	<img
		src="/christmas-leaf.svg"
		alt="christmas header"
		class="absolute -bottom-5 left-0 h-[500px] -scale-x-100 -scale-y-100"
	/> -->

	<slot />
</div>
