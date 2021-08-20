<script lang="ts">
    import { onMount } from "svelte"
    import { TezosToolkit } from "@taquito/taquito"
    import type { ContractAbstraction, Wallet } from "@taquito/taquito"
    import { BeaconWallet } from "@taquito/beacon-wallet"
    import { NetworkType } from "@airgap/beacon-sdk"
    import About from "./routes/About.svelte"
    import Index from "./routes/Fractionalize.svelte"
    import Redeem from "./routes/Redeem.svelte"

    enum Page {
        fractionalize = "/",
        redeem = "/redeem",
        about = "/about",
    }

    let page = Page.fractionalize

    let Tezos: TezosToolkit
    let wallet: BeaconWallet
    let userAddress = ""
    let loadingProfile = true

    const rpcUrl = "https://rpc.florence.tzstats.com"

    const connect = async () => {
        try {
            wallet = new BeaconWallet({
                name: "Ligo Tickets Tutorial",
                preferredNetwork: NetworkType.FLORENCENET,
            })
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.FLORENCENET,
                    rpcUrl,
                },
            })
            Tezos.setWalletProvider(wallet)
            userAddress = await wallet.getPKH()
            console.log(userAddress)
        } catch (err) {
            console.error(err)
        } finally {
            loadingProfile = false
        }
    }

    const disconnect = () => {
        wallet.client.destroy()
        wallet = undefined
        userAddress = ""
    }

    onMount(async () => {
        Tezos = new TezosToolkit(rpcUrl)
        wallet = new BeaconWallet({
            name: "Ligo Tickets Tutorial",
            preferredNetwork: NetworkType.FLORENCENET,
        })
        const activeAccount = await wallet.client.getActiveAccount()
        // if (activeAccount) {
        //     await Tezos.setWalletProvider(wallet)
        //     userAddress = activeAccount.address

        //     // alert(userAddress)

        //     const contract = await Tezos.wallet.at("KT18tK4uAWNm4eTwCdpC6KnswYuyicV3BFUa")
        //     console.log(contract)

        //     let op = await contract.methods.deployCoin("tz1WGvQt84b8bDbw5cMXS3MpQLBe7z7Py1rc", 1234).send()
        //     console.log(op)
        // }
    })

    function navigate(to: Page) {
        page = to
        window.history.pushState("", to.valueOf(), to.valueOf())
    }
</script>

<svelte:head>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,700;1,900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<header>
    <div class="logo">
        <!-- <img src="logo.svg" alt="logo" /> -->
        <h1>Frac It</h1>
    </div>

    <nav>
        <a on:click={() => navigate(Page.fractionalize)}>Fractionalize</a>
        <a on:click={() => navigate(Page.redeem)}>Redeem</a>
        <a on:click={() => navigate(Page.about)}>About</a>
    </nav>
</header>

<main>
    {#if page === Page.fractionalize}
        <Index />
    {:else if page === Page.redeem}
        <Redeem />
    {:else if page === Page.about}
        <About />
    {/if}
</main>

<footer>
    <p>Powered by <b>Tezos</b></p>
</footer>

<style lang="scss">
    :global(body) {
        background: linear-gradient(243.18deg, #700379 0%, #4f038a 100%);
    }

    header {
        display: flex;
        justify-content: space-between;

        background: rgba(37, 4, 64, 0.37);

        .logo {
            display: flex;
            align-items: center;
            margin-left: 16px;

            h1 {
                margin: 0px;
                color: white;
                font-size: 1.75em;
                font-weight: 600;
                margin-left: 16px;
            }
        }

        nav {
            display: flex;

            h1 {
                font-size: medium;
            }

            a {
                color: white;
                font-size: 18px;
                font-weight: 600;
                text-decoration: none;
                padding: 0.5em 1em;
                margin: 0.5em 1em;
            }
        }
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

    footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        background: rgba(26, 26, 26, 0.6);

        p {
            color: white;
            margin: 8px 16px;
        }
    }
</style>
