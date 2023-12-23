<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	import { inview } from "svelte-inview";

	import * as XLSX from "xlsx";
	import Button from "$lib/components/ui/button/button.svelte";

	import { format } from "date-fns";

	let isInViewTop: boolean;
	let isInViewBottom: boolean;
	const options = {};

	export let winners: {
		employees: {
			name: string;
			office: string;
			onDuty: boolean;
		} | null;
		departments: {
			name: string;
		} | null;
	}[] = [];

	export let prize: {
		id: string;
		name: string;
		createdAt: Date | null;
	};

	let element: HTMLDivElement;
	let intervalId: NodeJS.Timeout | undefined;
	let interval = 3000;
	let scrollDistance = 1;

	function scrollElementEveryMillisecond() {
		const scrollFunction = () => {
			const currentScroll = element.scrollTop;

			// Calculate the new scroll position
			const newScroll = currentScroll + scrollDistance;

			// Scroll the element to the new position
			element.scrollTop = newScroll;

			clearInterval(intervalId);
			intervalId = setInterval(scrollFunction, interval);
			interval = 20;
		};

		intervalId = setInterval(scrollFunction, interval);
	}

	export function exportToExcelAndPrint() {
		const data = winners.map(({ employees, departments }, i) => ({
			Name: `${i + 1}. ${employees?.name}`,
			Department: departments?.name,
			Office: employees?.office,
			onDuty: employees?.onDuty ? "YES" : "---",
			Signature: "___________________"
		}));
		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
		XLSX.writeFile(wb, `${prize.name} - ${format(prize.createdAt as Date, "MM-dd-yy HH:mm")}.xlsx`);

		const htmlData = XLSX.utils.sheet_to_html(XLSX.utils.json_to_sheet(data));

		const printWindow = window.open("", "_blank");
		if (printWindow) {
			printWindow.document.write(
				`<html>
				 	<head>
					<style>
					body {
						font-size: 10px;
					}
					table {
						width: 100%;
					}
					tbody {
						width: 100%;
					}
					tr {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 60px 120px;
					}
					td {
						padding: 15px 20px 15px 0px;
						border-bottom: .2px solid black;
					}
					</style>
					<title>${prize.name} - ${format(prize.createdAt as Date, "MM-dd-yy HH:mm")}
					</title>
					</head>
					<body>`
			);
			printWindow.document.write(htmlData);
			printWindow.document.write("</body></html>");
			printWindow.print();
			printWindow.onafterprint = function () {
				printWindow.close();
			};
		} else {
			console.error("Unable to open print window.");
		}
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

	onDestroy(() => clearInterval(intervalId));
</script>

<div
	class="absolute bottom-6 right-6 z-50 min-h-[150px] min-w-[300px] rounded-md border-2 bg-white p-8 shadow-md"
>
	<div class="relative h-full w-full space-y-2 text-2xl">
		<!-- <img src="/ribbon.png" alt="ribbon" class="absolute -right-32 -top-24 rotate-45" /> -->
		<div>
			<div>Raffle Prize:</div>
			<div class="font-semibold">{prize.name}</div>
		</div>
		<div>
			<div>Total No. of Winners:</div>
			<div class="font-semibold">{winners.length}</div>
		</div>
		<div class="flex w-full">
			<Button on:click={exportToExcelAndPrint} class="ml-auto">EXPORT</Button>
		</div>
	</div>
</div>

<img
	src="/santas-list.png"
	alt="santa-list"
	transition:fade={{ duration: 1500 }}
	class="absolute right-0 h-full w-full"
/>
<div class="z-10 mt-6 w-[65%] font-flower font-bold">
	<div class="grid w-full grid-cols-2 text-5xl">
		<div>Name</div>
		<div>Department</div>
	</div>
</div>
<div
	bind:this={element}
	transition:fade={{ duration: 1500 }}
	class="no-scrollbar z-10 h-[60%] w-[65%] space-y-8 overflow-y-auto bg-auto font-flower"
>
	{#if intervalId}
		<div
			use:inview={options}
			on:inview_enter={(event) => {
				const { inView, entry, scrollDirection, observer, node } = event.detail;
				isInViewTop = inView;
				interval = 3000;
				scrollDistance = 1;
			}}
			on:inview_leave={(event) => {
				const { inView, entry, scrollDirection, observer, node } = event.detail;
				isInViewTop = inView;
			}}
		>
			{isInViewTop ? "" : "Bye, Bye"}
		</div>
	{/if}

	{#each winners as winner, i}
		<div class="grid w-full grid-cols-2 gap-x-4 text-5xl font-medium">
			<div>
				{`${i + 1}. `}{winner.employees?.name}
				{#if winner.employees?.onDuty}
					<span class="rounded-md bg-white px-4 font-semibold text-red-500"> DUTY</span>
				{/if}
			</div>
			<div>
				{winner.departments?.name}
				{winner.departments?.name !== winner.employees?.office
					? ` (${winner.employees?.office})`
					: ""}
			</div>
		</div>
	{/each}
	{#if intervalId}
		<div
			use:inview={options}
			on:inview_enter={(event) => {
				const { inView, entry, scrollDirection, observer, node } = event.detail;
				isInViewBottom = inView;
				interval = 3000;
				scrollDistance = -1;
			}}
			on:inview_leave={(event) => {
				const { inView, entry, scrollDirection, observer, node } = event.detail;
				isInViewBottom = inView;
			}}
		>
			{isInViewBottom ? "" : "Bye, Bye"}
		</div>
	{/if}
</div>
