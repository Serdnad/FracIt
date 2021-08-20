// import type { TezosToolkit } from "@taquito/taquito"
// import type { ContractAbstraction, Wallet } from "@taquito/taquito"
// import { BeaconWallet } from "@taquito/beacon-wallet"
// import { NetworkType } from "@airgap/beacon-sdk"

// module WalletHelper {
//     let Tezos: TezosToolkit
//     let wallet: BeaconWallet
//     let userAddress = ""

//     const rpcUrl = "https://rpc.florence.tzstats.com"
//     const ticketerAddress = "KT1Vv3kTDW4rz5JhgM8XZgxcrRwFhHXXQQt6"

//     const FRAC_IT_ADDRESS = "asd"

//     export const connect = async () => {
//         try {
//             wallet = new BeaconWallet({
//                 name: "Ligo Tickets Tutorial",
//                 preferredNetwork: NetworkType.FLORENCENET,
//             })
//             await wallet.requestPermissions({
//                 network: {
//                     type: NetworkType.FLORENCENET,
//                     rpcUrl,
//                 },
//             })
//             Tezos.setWalletProvider(wallet)
//             userAddress = await wallet.getPKH()
//             alert(userAddress)
//         } catch (err) {
//             console.error(err)
//         } finally {
//             console.log("FINA")
//         }
//     }

//     export const disconnect = () => {
//         wallet.client.destroy()
//         wallet = undefined
//         userAddress = ""
//     }
// }

// export default WalletHelper

export { }