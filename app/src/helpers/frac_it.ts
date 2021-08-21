// import { Wallet } from "@taquito/taquito";
import type { ContractAbstraction, Wallet } from "@taquito/taquito";
import WalletHelper from "./wallet_helper";

/**
 * Module for interacting with the main FracIt smart contract.
 */
module FracIt {
    const ADDRESS = "KT1VcCELgmViyegFHiUYu3H1GZjw2FeW1tmL"

    // tmp
    const NFT_ADDRESS = "KT1DyVArgtUm6S4eYbyYLNFc7TYq9BYBtBCt"

    let contract: ContractAbstraction<Wallet>

    const initContract = async () => {
        if (contract != null) return

        if (!(await WalletHelper.isConnected())) await WalletHelper.connect()
        const wallet = await WalletHelper.getActiveWallet()
        contract = await wallet.at(ADDRESS)
    }

    /** Prompt user to allow our contract to move the NFT on their behalf. */
    export const updateOperators = async(nftAddress: string) => {
        const wallet = await WalletHelper.getActiveWallet()
        const contract = await wallet.at(NFT_ADDRESS)
        contract.methods.updateOperators([])
    }

    export const fractionalize = async (nftAddress: string, nftTokenId: string, symbol: string, supply: string) => {
        // TODO: update operators

        await initContract()

        console.log(contract)
        const op = await contract.methods.frac([nftAddress, nftTokenId, symbol, supply]).send()
        console.log(op)

        const confirmation = await op.confirmation()
        console.log(confirmation)
    }

    export const redeem = async () => {
        console.log("START REDEEM")
        if (contract == null) await initContract()

        console.log("REDEEM")
        console.log(contract)
        console.log(contract.methods)


        // contract.methods.
    }
}

export default FracIt;