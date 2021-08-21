<script lang="ts">
    import LabelledInput from "../components/shared/LabelledInput.svelte"
    import Button from "../components/shared/Button.svelte"
    import NftCard from "../components/shared/NftCard.svelte"
    import FracIt from "../helpers/frac_it";
    import InputGroup from "../components/shared/InputGroup.svelte";
    import Popup from "../components/shared/Popup.svelte";

    let nftAddress: string
    let nftTokenId: string
    let tokenSupply: string

    let showPopup = false
    let newContract: string

    async function fractionalize() {
        newContract = await FracIt.fractionalize(nftAddress, nftTokenId, tokenSupply)

        showPopup = true
    }
</script>

<Popup
    visible={showPopup}
    title={"Tokens Deployed"}
    body={`Tokens deployed at: ${newContract}`}
/>

<div class="container">
    <div class="row">
        <NftCard address={nftAddress} tokenId={nftTokenId} />

        <div class="form">
            <InputGroup label={"NFT"}>
                <LabelledInput
                    label={""}
                    placeholder={"KT1DyVArg..."}
                    hint={"The NFT's contract address."}
                    bind:value={nftAddress}
                />

                <LabelledInput
                    label={""}
                    placeholder={"0"}
                    hint={"The NFT's token ID."}
                    bind:value={nftTokenId}
                />
            </InputGroup>

            <InputGroup label={"New Tokens"}>
                <LabelledInput
                    label={""}
                    placeholder={"1000"}
                    hint={"The number of tokens to create."}
                    bind:value={tokenSupply}
                />
            </InputGroup>
        </div>
    </div>

    <Button text={"FRAC IT"} on:click={fractionalize} />
</div>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        margin: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -ms-transform: translateY(-50%);

        .row {
            display: flex;
            align-items: stretch;
            flex-basis: auto;
            margin-bottom: 32px;
            min-width: 520px;
            min-height: min(60vh, 360px);
        }

        .form {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
</style>