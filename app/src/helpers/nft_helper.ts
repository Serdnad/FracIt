// @ts-nocheck
import { TezosToolkit, compose } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import FracIt from './frac_it';

module NftHelper {
    const FLORENCE_RPC_URL = "https://florencenet.api.tez.ie"

    let Tezos: TezosToolkit

    const initialize = async () => {
        if (Tezos != null) return

        Tezos = new TezosToolkit(FLORENCE_RPC_URL);
        Tezos.addExtension(new Tzip12Module());
    }

    export const getFromFungibleAddress = async (address: string): Promise<any> => {
        await initialize()

        const contract = await Tezos.contract.at(FracIt.CONTRACT_ADDRESS)
        const storage = await contract.storage()
        console.log(storage)

        const s = await storage["issues"].get(address)
        console.log(s)

        return s
    }

    export const fetchMetadata = async (address: string, tokenId: string) => {
        await initialize()
        
        const contract = await Tezos.contract.at(address, compose(tzip12, tzip16))
        const metadata = await contract.tzip12().getTokenMetadata(parseInt(tokenId));
        return metadata
    }

    export const fetchImageUrl = async (address: string, tokenId: string): Promise<string> => {
        const metadata = await fetchMetadata(address, tokenId)
        let url: string = metadata.displayUri ?? metadata.thumbnailUri ?? "images/question-mark.svg"
        url = url.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
        console.log(url)
        return url
    }
}

export default NftHelper