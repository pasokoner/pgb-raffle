<script lang="ts">
    import { enhance } from "$app/forms";
	import { Switch } from "$lib/components/ui/switch";
    export let value: string

    let onDuty = value.split("/")[0] === "true" ? true : false;
    let id = value.split("/")[1]

    console.log(id, onDuty);
</script>

<form action="/?/toggleDuty" method="POST" 
    use:enhance={async ({ formData }) => {
        formData.append("id", id);
        return async ({ update }) => {
            await update();
        };
    }}
>
    <Switch id="airplane-mode" type="submit" checked={onDuty} />
</form>