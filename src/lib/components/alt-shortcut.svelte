<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let open = false;
	export let key: string;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.altKey && event.key === key) {
			// Handle Ctrl+S (save) shortcut
			event.preventDefault(); // Prevent the default browser behavior
			open = !open;
			// Add your save logic here
			dispatch("onPress");
		}
	}

	// Attach the event listener when the component is mounted
	onMount(() => {
		window.addEventListener("keydown", handleKeyDown);

		// Clean up the event listener when the component is destroyed
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});
</script>
