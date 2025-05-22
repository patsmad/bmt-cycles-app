<script>
import { writable, derived } from "svelte/store";
import { wikiData } from './wiki.js';
import WikiTable from './WikiTable.svelte';

let display_table = false;
let urlParams = new URLSearchParams(window.location.search);
let selected = urlParams.get('link');
if (selected) {
    handleSelected();
}

function handleSelected()  {
    fetch('http://localhost:5000/wiki/?link=' + selected + '&api_key=' + import.meta.env.VITE_API_KEY)
        .then(response => response.json())
        .then(data => wikiData.set(data))
    display_table = true;
}
</script>

<main>
	<h2>Search by Wikipedia link:</h2>
    <input id="wiki-input" class='wiki-select' bind:value={selected} />
    {#if selected}
    <a href="/wiki?link={selected}"><button>Submit</button></a>
    {:else}
    <button disabled={!selected}>Submit</button>
    {/if}
    {#if display_table}
    <div class="card">
        <WikiTable selected={selected}/>
    </div>
    {/if}
</main>

<style>
    .wiki-select {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: border-color 0.25s;
    }
</style>