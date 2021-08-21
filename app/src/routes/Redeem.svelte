<script lang="ts">
    import LabelledInput from "../components/shared/LabelledInput.svelte"
    import Button from "../components/shared/Button.svelte"
    import FracIt from "../helpers/frac_it";
    import NftCard from "../components/shared/NftCard.svelte"

    let address: string

    async function redeem() {
        FracIt.redeem(address)
    }
</script>

<div class="container">
    <div class="row">
        <!-- TODO -->
        <NftCard />

        <div class="form">
            <LabelledInput
                label={"Tokens Address"}
                placeholder={"KT1DyVArg..."}
                hint={"The fungible tokens' contract address."}
                bind:value={address}
            />
        </div>
    </div>

    <Button text={"DEFRAC IT"} on:click={redeem} />
</div>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);

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
        }
    }
</style>
