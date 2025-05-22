<script>
import { derived } from 'svelte/store'
import { wikiItemsData } from './wiki.js';
import imdbLogo from '../../assets/IMDb_Logo_Square_Gold.png'
import wikiLogo from '../../assets/Wikipedia_W.png'

let wikiItems = derived(wikiItemsData, wikiItemsData => wikiItemsData.wikiItems??[]);
console.log($wikiItems);

let asc = false;
let active = 'time';
let sortFnc = item => item.votes;
let sortWikiItems = () => derived(
    wikiItems,
    wikiItems => wikiItems?.filter(item => sortFnc(item) !== null).sort((itemA, itemB) => {
            if (sortFnc(itemA) > sortFnc(itemB)) { return -1 + 2 * asc; }
            if (sortFnc(itemA) < sortFnc(itemB)) { return 1 - 2 * asc; }
        return 0;
    }).concat(wikiItems?.filter(item => sortFnc(item) === null))
);
let sortedWikiItems = sortWikiItems();

function sortColumnFunction(fnc, activeTH) {
    return () => {
        asc = !asc || active !== activeTH;
        sortFnc = fnc;
        active = activeTH;
        sortedWikiItems = sortWikiItems();
    }
}

</script>

<div>Count: {$sortedWikiItems?.length}</div>
<table class="file-item-table">
    <thead>
        <tr>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.link, 'link')}>Link</th>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.name, 'name')}>Wiki</th>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.title, 'title')}>Title</th>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.year, 'year')}>Year</th>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.rating, 'rating')}>Rating</th>
            <th class="isSortable {active === 'id' ? 'isActive' : ''} {asc ? 'asc' : 'desc'}" on:click={sortColumnFunction(item => item.votes, 'votes')}>Votes</th>
        </tr>
    </thead>
    <tbody>
    {#if $sortedWikiItems}
        {#each $sortedWikiItems as wikiItem, index}
        <tr>
            <td><a href={wikiItem.link} target="_blank"><img src={imdbLogo} class="imdb-logo" alt="IMDb Logo" /></a></td>
            <td><a href={wikiItem.name} target="_blank"><img src={wikiLogo} class="wiki-logo" alt="Wiki Logo" /></a></td>
            <td>{wikiItem.title}</td>
            <td>{wikiItem.year}</td>
            <td>{wikiItem.rating}</td>
            <td>{wikiItem.votes}</td>
        </tr>
        {/each}
    {/if}
    </tbody>
</table>

<style>

table {
    width: 100%;
}

.isSortable {
    cursor: pointer;
}

.isActive.asc:after {
    content: "▼";
    padding-left: 5px;
}

.isActive.desc:after {
    content: "▲";
    padding-left: 5px;
}

</style>
