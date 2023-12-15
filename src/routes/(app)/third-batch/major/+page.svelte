<script lang="ts">
	import { enhance } from "$app/forms";

	let open = false;
</script>

<img src="/christmas.svg" alt="christmas header" class="h-[360px] w-[640px] mt-16 mb-4" />

<form method="POST" use:enhance action="?/majorDraw" class="w-[720px] space-y-2">
	<div class="relative">
		<input
			type="text"
			id="floating_filled_prize"
			name="prize"
			class="block rounded-md px-2.5 pb-4 pt-5 w-full text-3xl text-white bg-[#ef424c] dark:bg-gray-700 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
			placeholder=" "
		/>
		<label
			for="floating_filled_prize"
			class="absolute text-2xl font-semibold text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:text-lg start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
			>Set Prize:</label
		>
	</div>
	<div class="relative">
		<input
			type="number"
			id="floating_filled_winner_count"
			name="winnerCount"
			class="block rounded-md px-2.5 pb-4 pt-5 w-full text-3xl text-white bg-[#ef424c] dark:bg-gray-700 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
			placeholder=" "
		/>
		<label
			for="floating_filled_winner_count"
			class="absolute text-2xl font-semibold peer-focus:text-lg text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
			>Winner Count:</label
		>
	</div>
	<button type="submit" class="hidden">Draw</button>
</form>
