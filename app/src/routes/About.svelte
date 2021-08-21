<script lang="ts">
    import TextPair from "../components/about/TextPair.svelte"
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<div class="content">
    <TextPair
        title={"What is this?"}
        body={'Frac It takes a single NFT and "fractionalizes" it into multiple fungible tokens.'}
    />

    <TextPair
        title={"Why fractionalize?"}
        body={`NFTs are increasingly being used for art, gaming, ownership, and more. As the prices of NFTs rise, however, many netizens are finding themselves priced out of the most exciting experiences that NFTs have to offer. Fractionalizing NFTs reopens the gates to NFTs for more people to build communities around art, ownership, and game assets, making Web3 accessible once again.`}
    />

    <TextPair
        title={"How does it work?"}
        body={`When an NFT is fractionalized through Frac It, it's put into a vault securely stored on chain. Then, a fixed number of fractions, in the form of fungible tokens, are minted and given to the original owner. The owner can then distribute or sell these tokens as they see fit to share the joy of NFT ownership.`}
    />

    <TextPair
        title={"How do I get the NFT back?"}
        body={"The only way to get the original NFT out of the vault is to exchange it for all of the fungible tokens."}
    />
</div>

<style>
    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        max-width: var(--column-width);
        margin: var(--column-margin-top) auto 0 auto;
    }
</style>
