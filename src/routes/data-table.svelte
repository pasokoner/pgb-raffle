<script lang="ts">
    import { createRender, createTable, Render, Subscribe } from "svelte-headless-table";
    import {
      addTableFilter,
      addPagination
    } from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
	import ToggleDutyForm from "./toggle-duty-form.svelte";

    type Employee = {
      id: string;
      name: string;
      department: {
        name: string
      } | null;
      onDuty: boolean;
    };

    export let data: Employee[] = [];

    let forms: HTMLFormElement[] = new Array(data.length).fill(undefined);

    const table = createTable(readable(data), {
      page: addPagination(),
      filter: addTableFilter({
        fn: ({ filterValue, value }) =>
          value.toLowerCase().includes(filterValue.toLowerCase())
      })
    });

    const columns = table.createColumns([
      table.column({
        accessor: "name",
        header: "Name"
      }),
      table.column({
        accessor: "department",
        header: "Department",
        cell: ({ value }) => {
          return value?.name ?? "";
        }
      }),
      table.column({
        accessor: ({ onDuty, id }) => `${onDuty}/${id}`,
        header: "ON DUTY",
        cell: ({ value }) => {
          return createRender((ToggleDutyForm), { value });
        }
      })
    ]);

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
    const { filterValue } = pluginStates.filter;
    const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div>
  <div class="flex items-center">
    <Input
      class="max-w-sm"
      placeholder="Search..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="rounded-md border">
      <Table.Root {...$tableAttrs}>
        <Table.Header>
          {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
              <Table.Row>
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                    <Table.Head {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Head>
                  </Subscribe>
                {/each}
              </Table.Row>
            </Subscribe>
          {/each}
        </Table.Header>
        <Table.Body {...$tableBodyAttrs}>
          {#each $pageRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
              <Table.Row {...rowAttrs}>
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <Table.Cell {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Cell>
                  </Subscribe>
                {/each}
              </Table.Row>
            </Subscribe>
          {/each}
        </Table.Body>
      </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-2 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
