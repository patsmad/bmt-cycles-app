import { writable, derived } from 'svelte/store';

export const wikiData = writable([]);
export const wikiItemsData = derived(wikiData, ($wikiData) => {
    return new WikiData(
        $wikiData.items?.map(wikiItem => {
            return new WikiItem(
                wikiItem.link,
                wikiItem.name,
                wikiItem.title,
                wikiItem.year,
                wikiItem.rating,
                wikiItem.votes
            )
        })
    )
});

class WikiData{
  constructor(wikiItems) {
    this.wikiItems = wikiItems;
  }
}

export class WikiItem {
    constructor(link, name, title, year, rating, votes) {
        this.link = link;
        this.name = name;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.votes = votes;
    }
}
