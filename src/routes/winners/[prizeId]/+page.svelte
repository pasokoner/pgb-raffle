<script lang="ts">
	import { fly } from "svelte/transition";
	import Scroll from "./scroll.svelte";
	import AltShortcut from "$lib/components/alt-shortcut.svelte";
	import JSConfetti from "js-confetti";
	import { onDestroy, onMount } from "svelte";

	export let data;

	export let open = false;

	let confetti: JSConfetti | undefined;

	let toggleScrollingChild: () => void;
	let exportToExcelAndPrintChild: () => void;
	let topBoxVisible = !true;
	let bottomVisible = !true;

	function toggleBox() {
		if (!open) {
			topBoxVisible = !topBoxVisible;
			bottomVisible = !bottomVisible;

			if (confetti) {
				confetti.addConfetti({ confettiNumber: 1000 });
			}

			setTimeout(() => {
				open = !open;
			}, 1000);
		}
	}

	onMount(() => {
		confetti = new JSConfetti();
	});

	onDestroy(() => {
		confetti?.clearCanvas();
		confetti?.destroyCanvas();
	});
</script>

<AltShortcut
	on:onPress={() => {
		toggleScrollingChild();
	}}
	key="t"
/>

<AltShortcut
	on:onPress={() => {
		exportToExcelAndPrintChild();
	}}
	key="p"
/>

<div
	role="button"
	tabindex="0"
	on:click={toggleBox}
	on:keydown={toggleBox}
	aria-label="PANIC!"
	class="relative z-50 flex h-full w-full flex-col items-center justify-center"
>
	{#if !topBoxVisible}
		<div
			class="relative flex h-[55px] w-[300px] animate-wiggle flex-col items-center bg-[#34495E]"
			transition:fly={{ y: -500, duration: 1000 }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				fill="#FDC56D"
				version="1.1"
				id="Capa_1"
				width="100px"
				height="100px"
				viewBox="0 0 424.578 424.579"
				xml:space="preserve"
				class="absolute -top-8 h-16 w-16"
			>
				<g>
					<g id="Layer_2_3_">
						<path
							d="M399.433,61.198c-9.269-5.271-20.137-7.943-32.303-7.943c-26.983,0-61.349,13.25-102.137,39.385    c-29.229,18.727-51.025,37.236-51.938,38.016l-0.764,0.652l-0.765-0.652c-0.913-0.779-22.71-19.289-51.938-38.016    C118.799,66.504,84.436,53.254,57.45,53.254c-12.166,0-23.034,2.672-32.302,7.943c-12.91,7.34-27.688,22.576-24.777,53.467    c1.682,17.846,8.785,37.66,15.655,56.822c4.538,12.656,9.161,25.559,11.975,37.203c28.813-79.172,150.645-52.514,150.645-52.514    c-79.55,84.564-121.941,47.836-124.598,39.486c-5.889,6.693-12.45,17.063-15.939,23.762    c25.705,40.271,79.985,24.765,108.912,5.845c13.607-8.9,25.951-18.95,36.69-29.715c0.2,0.49,0.409,0.977,0.638,1.453    c-1.468,1.76-2.913,3.508-4.306,5.205c-7.949,9.691-15.691,20.045-23.011,30.771c-6.044,8.857-11.366,17.08-16.271,25.134    c-6.029,9.899-12.224,20.905-18.939,33.646c-4.283,8.127-8.482,16.654-12.837,26.07c-3.165,6.842-5.987,13.918-8.717,20.762    c-0.668,1.674-1.336,3.35-2.009,5.021l-4.834,12.01l48.126-32.133l32.801,47.834l0.072-12.777    c0.022-3.99,0.056-7.981,0.089-11.973l0.054-6.662c0.048-6.431,0.614-13.047,1.161-19.447l0.244-2.885l0.154-2.019    c1.187-10.994,2.527-22.68,4.24-34.244c1.435-9.692,3.3-19.672,5.543-29.661c2.641-11.759,5.538-24.234,9.35-36.117    c0.503-1.569,0.998-3.146,1.493-4.721c0.133-0.424,0.269-0.852,0.402-1.277c3.292,1.494,6.945,2.332,10.796,2.332h8.676    c3.851,0,7.504-0.838,10.796-2.332c0.136,0.434,0.273,0.869,0.409,1.299c0.492,1.568,0.983,3.136,1.485,4.699    c3.81,11.873,6.707,24.354,9.351,36.117c2.244,10.002,4.108,19.979,5.543,29.661c1.713,11.564,3.057,23.279,4.246,34.308    l0.146,1.949l0.246,2.905c0.547,6.396,1.113,13.009,1.16,19.433l0.055,6.783c0.033,3.948,0.066,7.899,0.09,11.852l0.072,12.777    l32.802-47.834l48.127,32.133l-4.834-12.01c-0.675-1.671-1.341-3.343-2.009-5.017c-2.729-6.844-5.553-13.922-8.719-20.766    c-4.346-9.396-8.545-17.924-12.838-26.07c-6.711-12.731-12.906-23.738-18.938-33.646c-4.896-8.041-10.218-16.263-16.271-25.134    c-7.316-10.723-15.06-21.075-23.01-30.77c-1.393-1.697-2.838-3.445-4.306-5.207c0.229-0.475,0.438-0.961,0.639-1.453    c10.737,10.766,23.081,20.814,36.688,29.714c28.929,18.92,83.207,34.429,108.912-5.844c-3.489-6.699-10.05-17.068-15.938-23.762    c-2.657,8.35-45.049,45.078-124.6-39.486c0,0,121.832-26.658,150.646,52.514c2.812-11.645,7.436-24.547,11.974-37.203    c6.871-19.162,13.976-38.977,15.656-56.822C427.12,83.773,412.342,68.538,399.433,61.198z M242.244,180.372    c-2.467-11.889-12.996-20.822-25.615-20.822h-8.676c-12.619,0-23.149,8.934-25.615,20.822c-0.346-1.697-0.547-3.445-0.547-5.242    c0-14.449,11.713-26.162,26.162-26.162h8.676c14.449,0,26.162,11.713,26.162,26.162    C242.791,176.926,242.59,178.674,242.244,180.372z"
						/>
					</g>
				</g>
			</svg>

			<div class="h-full w-[50px] bg-[#FDC56D]">&nbsp;</div>
		</div>
	{/if}

	{#if !bottomVisible}
		<div
			class="relative flex h-[176px] w-[270px] animate-wiggle flex-col items-center bg-[#34495E]"
			transition:fly={{ y: 500, duration: 1000 }}
		>
			<div class="absolute top-0 h-[30px] w-full bg-black/20">&nbsp</div>
			<div class="h-full w-[50px] bg-[#FDC56D]">&nbsp;</div>
		</div>
	{/if}
	{#if open}
		<Scroll
			prize={data.prize}
			winners={data.winners}
			bind:exportToExcelAndPrint={exportToExcelAndPrintChild}
			bind:toggleScrolling={toggleScrollingChild}
		/>
	{/if}
</div>
