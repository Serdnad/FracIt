<script>
    import LabelledInput from "../components/shared/LabelledInput.svelte"
    import Button from "../components/shared/Button.svelte"
</script>

<div class="container">
    <div class="row">
        <div class="nft">

            NFT GOES HERE
        </div>

        <div class="form">
            <LabelledInput
                label={"Select NFT"}
                placeholder={"SYM"}
                hint={"The NFT to fractionalize."}
            />

            <LabelledInput
                label={"New token symbol"}
                placeholder={"SYM"}
                hint={"A 2-5 letter symbol for your new tokens."}
            />

            <LabelledInput
                label={"New token supply"}
                placeholder={"1000"}
                hint={"The number of fungible tokens to create."}
            />
        </div>
    </div>

    <Button text={"DEFRAC IT DOWN"} />
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
            flex-basis: auto;
            margin-bottom: 32px;
        }

        .nft {
            flex: 1;
            
            background: #dddddd;
            border-radius: 4px;
            box-shadow: 0 2px 5px 3px #22222244;

            margin-right: 32px;
        }

        .form {
            flex: 1;
        }
    }
</style>
