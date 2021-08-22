import { writable } from "svelte/store"

export enum Page {
    fractionalize,
    redeem,
    about,
}

export let page = writable(Page.fractionalize)
