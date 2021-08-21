// @ts-nocheck
import { TezosToolkit, compose } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from "@taquito/tzip12";
// import { tzip16 } from "@taquito/tzip16";

module NftHelper {
    const FLORENCE_RPC_URL = "https://florencenet.api.tez.ie"

    let Tezos: TezosToolkit

    const initialize = async () => {
        if (Tezos != null) return

        Tezos = new TezosToolkit(FLORENCE_RPC_URL);
        Tezos.addExtension(new Tzip12Module());
    }


    export const fetchMetadata = async (address: string, tokenId: string) => {
        await initialize()
        
        // const contract = await Tezos.contract.at(address, compose(tzip12, tzip16))
        
        // const metadata = await contract.tzip12().getTokenMetadata(parseInt(tokenId))
        // console.log(metadata)

        // return metadata

        const a = await Tezos.contract.at(address, compose(tzip12, tzip16)).then(contract => {
            console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
            return contract.tzip12().getTokenMetadata(parseInt(tokenId));
        }).then (tokenMetadata => {
            console.log(JSON.stringify(tokenMetadata, null, 2));
            return tokenMetadata
        }).catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
        
        return a
        // .then (tokenMetadata => {
        //   println(JSON.stringify(tokenMetadata, null, 2));
        // })
        // .catch(error => println(`Error: ${JSON.stringify(error, null, 2)}`));
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