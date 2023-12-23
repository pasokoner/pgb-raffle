<script lang="ts">
	import { enhance } from "$app/forms";

	let open = false;
</script>

<div class="flex h-full w-[70%] flex-col items-center pt-12">
	<!-- <img src="christmas.svg" alt="christmas header" class="h-[360px] w-[640px]" /> -->
	<div class="flex items-center gap-4">
		<img src="/bataan-seal.png" alt="bataan seal" class="h-[120px]" />
		<img src="/1bataan.png" alt="1bataan logo" class="h-[120px]" />
	</div>
	<img src="/year-end.png" alt="christmas header" class="h-[580px]" />

	<form method="POST" use:enhance action="?/majorDraw" class="w-[900px] space-y-2">
		<div class="relative">
			<input
				type="text"
				id="floating_filled_prize"
				name="prize"
				class="peer block w-full appearance-none rounded-md border-gray-300 bg-[#ef424c] px-2.5 pb-4 pt-5 text-7xl text-white focus:outline-none focus:ring-0 dark:bg-gray-700"
				placeholder=" "
			/>
			<label
				for="floating_filled_prize"
				class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-50 transform text-5xl font-semibold text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-50 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
				>Set Prize:</label
			>
		</div>
		<div class="relative">
			<input
				type="number"
				id="floating_filled_winner_count"
				name="winnerCount"
				class="peer block w-full appearance-none rounded-md border-gray-300 bg-[#ef424c] px-2.5 pb-4 pt-5 text-7xl text-white focus:outline-none focus:ring-0 dark:bg-gray-700"
				placeholder=" "
			/>
			<label
				for="floating_filled_winner_count"
				class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-50 transform text-5xl font-semibold text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-50 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
				>Winner Count:</label
			>
		</div>
		<button type="submit" class="hidden">Draw</button>
	</form>
</div>
