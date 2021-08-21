// import { Wallet } from "@taquito/taquito";
import type { ContractAbstraction, Wallet } from "@taquito/taquito";
import WalletHelper from "./wallet_helper";

/**
 * Module for interacting with the main FracIt smart contract.
 */
module FracIt {
    const ADDRESS = "KT1Qrk1Gqx3dAAbsue2BbtWYvhaX7KNBJwb7"

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

    export const fractionalize = async (nftAddress: string, nftTokenId: string, supply: string) => {
        // TODO: update operators

        await initContract()

        const op = await contract.methods.frac([nftAddress, nftTokenId, supply]).send()
        console.log(op)

        const confirmation = await op.confirmation()
        console.log(confirmation)
    }

    export const redeem = async (address: string) => {
        await WalletHelper.connect()
        await initContract()

        console.log("REDEEM")
        console.log(contract)
        const op = await contract.methods.defrac(address).send()
        console.log(op)

        await op.confirmation()
    }
}

export default FracIt;