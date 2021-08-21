import type { ContractAbstraction, Wallet } from "@taquito/taquito";
import WalletHelper from "./wallet_helper";

/**
 * Module for interacting with the main FracIt smart contract.
 */
module FracIt {
    export const CONTRACT_ADDRESS = "KT1HvKKzay8Ba8JsG1YRDx1hBX11gU6CicKd"

    let contract: ContractAbstraction<Wallet>

    /** Load the FracIt contract */
    const initContract = async () => {
        if (contract != null) return

        if (!(await WalletHelper.isConnected())) await WalletHelper.connect()
        const wallet = await WalletHelper.getActiveWallet()
        contract = await wallet.at(CONTRACT_ADDRESS)
    }

    /** Prompt user to allow our contract to move the NFT on their behalf. */
    const updateOperators = async(nftAddress: string) => {
        const wallet = await WalletHelper.getActiveWallet()
        alert(nftAddress)
        const contract = await wallet.at(nftAddress)
        await contract.methods.update_operators([]).send()
    }

    /** Fractionalize the NFT */
    export const fractionalize = async (nftAddress: string, nftTokenId: string, supply: string): Promise<string> => {
        await WalletHelper.connect()
        await initContract()

        const wallet = await WalletHelper.getActiveWallet()
        const walletPkh = await wallet.pkh()
        const nftContract = await wallet.at(nftAddress)

        const batch = WalletHelper.Tezos.wallet.batch()
        batch.withContractCall(nftContract.methods.update_operators([{
            "add_operator": {
                "owner": walletPkh,
                "operator": CONTRACT_ADDRESS,
                "token_id": nftTokenId
            }
        }]))
        batch.withContractCall(contract.methods.frac(nftAddress, nftTokenId, supply))
        
        alert("Please wait for confirmation from blockchain...")

        const op = await batch.send()
        await op.confirmation()

        const storage = await (await WalletHelper.Tezos.contract.at(CONTRACT_ADDRESS)).storage()

        const r = await storage["rev_issues"].get({
            0: nftAddress,
            1: nftTokenId
        })
        console.log(r)

        return r
    }

    /** Redeem the NFT */
    export const redeem = async (address: string) => {
        await WalletHelper.connect()
        await initContract()

        const op = await contract.methods.defrac(address).send()
        await op.confirmation()
    }
}

export default FracIt;