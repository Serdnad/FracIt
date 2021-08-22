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
        
        const op = await batch.send()
        await op.confirmation()

        const storage = await (await WalletHelper.Tezos.contract.at(CONTRACT_ADDRESS)).storage()

        return await storage["rev_issues"].get({
            address: nftAddress,
            token_id: parseInt(nftTokenId)
        })
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