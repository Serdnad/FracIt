<script lang="ts">
    import { onMount } from "svelte";
    import NftHelper from "../../helpers/nft_helper";

    export let address: string
    export let tokenId: string

    let imageUrl = "images/question-mark.svg"

    $: {
        if ((address ?? "") != "" && (tokenId ?? "") != "") {
            console.log(address, tokenId)
            NftHelper.fetchImageUrl(address, tokenId).then((url) => {
                console.log(url)
                imageUrl = url
            })
        }
    }

    onMount(() => {
        // address = "KT1DyVArgtUm6S4eYbyYLNFc7TYq9BYBtBCt"
        // id = "0"
    })

</script>

<div class="card">
    <img src={imageUrl} alt="nft">
</div>

<style lang="scss">
    .card {
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        
        background: #dddddd;
        border-radius: 4px;
        box-shadow: 0 2px 5px 3px #22222244;

        padding: 24px;
        margin-right: 24px;

        max-width: calc(520px / 2);

        img {
            margin: auto;
            object-fit: contain;
            object-position: center;

            max-width: 100%;
            max-height: 100%;
        }
    }
</style>