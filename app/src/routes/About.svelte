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
        body={`NFTs are increasingly being used for art, gaming, ownership, and more. With the value of NFTs skyrocketing, many netizens are finding themselves priced out of new experiences.
			
			Fractionalizing NFTs opens the gates to more people, making Web3 accessible once more.`}
    />

    <TextPair
        title={"How does it work?"}
        body={`When an NFT is fractionalized through Frac, it's put into a vault securely stored on chain. Then, a fixed number of fractions, in the form of fungible tokens, are minted and given to the original owner.`}
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
