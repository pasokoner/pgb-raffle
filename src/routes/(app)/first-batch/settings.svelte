<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { purgeCount } from "./settings";
	import { applyAction, enhance } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import AltShortcut from "$lib/components/alt-shortcut.svelte";

	let open = false;
</script>

<AltShortcut bind:open key="1" />

<Sheet.Root bind:open>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Group Raffle Settings</Sheet.Title>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="space-y-2">
				<Label for="purgeCount">Purge Count</Label>
				<Input
					id="purgeCount"
					value={$purgeCount}
					type="number"
					class="col-span-3"
					on:change={(e) => {
						$purgeCount = +e.currentTarget.value;
					}}
				/>
			</div>
			<form
				class="space-y-2"
				action="/first-batch?/reset"
				method="POST"
				use:enhance={({}) => {
					return async ({ result }) => {
						invalidate("/first-batch");
						await applyAction(result);
					};
				}}
			>
				<Button type="submit" class="w-full" variant="outline">RESET</Button>
			</form>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit">Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
