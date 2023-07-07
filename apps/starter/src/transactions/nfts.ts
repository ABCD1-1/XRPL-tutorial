import { TxnOptions } from "src/models"
import {
  NFTokenAcceptOffer,
  NFTokenCreateOffer,
  NFTokenCreateOfferFlags,
  NFTokenMint,
  NFTokenMintFlags,
  convertStringToHex,
} from "xrpl"
import { getClient } from "../xrpl-client"

const client = getClient()

type MintNftProps = Omit<NFTokenMint, "TransactionType" | "Account">

export const mintNft = async ({ URI, ...rest }: MintNftProps, { wallet }: TxnOptions) => {
  // Prepare the transaction
  const nftMintTxn: NFTokenMint = {
    ...rest,
    Flags: NFTokenMintFlags.tfTransferable,
    URI: convertStringToHex(URI ?? ""),
    Account: wallet.address,
    TransactionType: "NFTokenMint",
  }

  const prepared = await client.autofill(nftMintTxn);

  //Sign
  const signed = wallet.sign(prepared);

  //Submit and wait
  const response = await client.submitAndWait(signed.tx_blob);
  console.log(response);
  return response;
}

type CreateNftOfferProps = Omit<NFTokenCreateOffer, "TransactionType" | "Account"> &
  (
    | { Flags: NFTokenCreateOfferFlags.tfSellNFToken; Owner?: never }
    | { Flags?: undefined; Owner: string }
  )
export const createNftOffer = async (props: CreateNftOfferProps, { wallet }: TxnOptions) => {
  const offerTxn: NFTokenCreateOffer = {
    ...props,
    Account: wallet.address,
    TransactionType: "NFTokenCreateOffer",
  };

  const result = await client.submitAndWait(offerTxn, {
    autofill: true,
    wallet,
  });

  console.log(result);
  return result;
}

type AcceptNftOfferProps = Omit<NFTokenAcceptOffer, "TransactionType" | "Account">

export const acceptNftOffer = async (props: AcceptNftOfferProps, { wallet }: TxnOptions) => {
  // Prepare
  const acceptTxn: NFTokenAcceptOffer = {
    ...props,
    TransactionType: "NFTokenAcceptOffer",
    Account: wallet.address,
  }

  // Autofill, Sign and submit & wait
  const result = await client.submitAndWait(acceptTxn, { autofill: true, wallet })
  console.log(result);
  return result;
}
