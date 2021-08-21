import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { NetworkType } from "@airgap/beacon-sdk"

module WalletHelper {

    const FLORENCE_RPC_URL = "https://rpc.florence.tzstats.com"
    const FRAC_IT_ADDRESS = "..."

    let Tezos: TezosToolkit
    let wallet: BeaconWallet
    let userAddress = ""

    export const initialize = async () => {
        Tezos = new TezosToolkit(FLORENCE_RPC_URL)
        wallet = new BeaconWallet({
            name: "FracIt",
            preferredNetwork: NetworkType.FLORENCENET,
        })
    }

    export const isConnected = async () => {
        const activeAccount = await wallet.client.getActiveAccount()
        return activeAccount != null
    }

    export const connect = async () => {
        try {
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.FLORENCENET,
                    rpcUrl: FLORENCE_RPC_URL,
                },
            })
            Tezos.setWalletProvider(wallet)
            userAddress = await wallet.getPKH()
        } catch (err) {
            console.error(err)
        }
    }

    export const disconnect = () => {
        wallet.client.destroy()
        wallet = undefined
        userAddress = ""
    }

    export const getTokens = () => {
        
    }
}

export default WalletHelper

