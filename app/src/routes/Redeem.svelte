<script>
    import LabelledInput from "../components/shared/LabelledInput.svelte"
    import Button from "../components/shared/Button.svelte"
</script>

<div class="container">
    <div>
        <LabelledInput
            label={"New token supply"}
            placeholder={"asd"}
            hint={"The number of fungible tokens to create from the NFT."}
        />
    </div>

    <Button text={"FRAC IT UP"} />
</div>

<style lang="scss">
    .container {
        // min-height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
</style>
