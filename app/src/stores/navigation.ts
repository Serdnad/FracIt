import { writable } from "svelte/store"

export enum Page {
    fractionalize = "/",
    redeem = "/redeem",
    about = "/about",
}

export let page = writable(Page.fractionalize)
