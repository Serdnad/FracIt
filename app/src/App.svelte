<script lang="ts">
    import { onMount } from "svelte"
    import About from "./routes/About.svelte"
    import Index from "./routes/Fractionalize.svelte"
    import Redeem from "./routes/Redeem.svelte"
    import WalletHelper from "./helpers/wallet_helper";
    import Footer from "./components/layout/Footer.svelte";
    import Header from "./components/layout/Header.svelte";
    import { page, Page } from "./stores/navigation";

    onMount(async () => {
        await WalletHelper.initialize()
    })
</script>

<svelte:head>
    <title>FracIt</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,700;1,900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<Header />

<main>
    {#if $page === Page.fractionalize}
        <Index />
    {:else if $page === Page.redeem}
        <Redeem />
    {:else if $page === Page.about}
        <About />
    {/if}
</main>

<Footer />

<style lang="scss">
    :global(body) {
        background: linear-gradient(243.18deg, #700379 0%, #4f038a 100%);
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
