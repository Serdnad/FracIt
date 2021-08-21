import { TezosToolkit, Wallet } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { NetworkType } from "@airgap/beacon-sdk"

/**
 * Module for interfacing with Tezos wallet.
 */
module WalletHelper {
    const FLORENCE_RPC_URL = "https://rpc.florence.tzstats.com"

    export let Tezos: TezosToolkit
    let wallet: BeaconWallet

    export const initialize = async () => {
        Tezos = new TezosToolkit(FLORENCE_RPC_URL)
        wallet = new BeaconWallet({
            name: "FracIt",
            preferredNetwork: NetworkType.FLORENCENET,
        })
    }

    export const isConnected = async (): Promise<boolean> => {
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
        } catch (err) {
            console.error(err)
        }
    }

    export const disconnect = () => {
        wallet.client.destroy()
        wallet = undefined
    }

    export const getActiveWallet = async (): Promise<Wallet> => {
        if (!(await isConnected())) await connect()
        return Tezos.wallet
    }
}

export default WalletHelper

