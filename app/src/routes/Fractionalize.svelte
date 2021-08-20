<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
    import { onMount } from "svelte"
    // import { TezosToolkit } from '@taquito/taquito';

    // import Test from '$lib/tezos/test'
    // import { TezosToolkit } from '@taquito/taquito';
    // import { BeaconWallet } from '@taquito/beacon-wallet';
    onMount(async () => {
        // Test.connectWallet()
        // global = this;
        // let TezosToolkit = (await import('@taquito/taquito')).default;
        // console.log(TezosToolkit);
        // const T = (await import('$lib/tezos/test')).default;
        // global = this;
        // await Test.qaz();
        // (window as any).global = window;
        // await Test.asd();
        // Test.qaz();
        // Test.connectWallet();
        // const options = {
        // 	name: 'MyAwesomeDapp',
        // 	iconUrl: 'https://tezostaquito.io/img/favicon.png',
        // 	preferredNetwork: 'florencenet',
        // 	eventHandlers: {
        // 		PERMISSION_REQUEST_SUCCESS: {
        // 			handler: async (data) => {
        // 				console.log('permission data:', data)
        // 			},
        // 		},
        // 	},
        // }
        // const wallet = new BeaconWallet(options)
        // // The Beacon wallet requires an extra step to set up the network to connect to and the permissions:
        // await wallet.requestPermissions({
        // 	network: {
        // 		type: 'florencenet',
        // 	},
        // })
    })
</script>

<svelte:head>
    <title>Home</title>

    <script src="https://www.tezbridge.com/plugin.js"></script>
</svelte:head>

<section>
    <nav>
        <h1>Hasd</h1>
    </nav>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
