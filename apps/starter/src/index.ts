import { XummJsonTransaction } from "xumm-sdk/dist/src/types"
import { sendPayment } from "./transactions"
import { acceptNftOffer } from "./transactions/nfts"
import { WALLET_1, WALLET_2 } from "./wallet"
import { getClient } from "./xrpl-client"
import { getXummClient } from "./xumm-client"

const client = getClient()

// const main = async () => {
//   // await client.connect()
//   // await sendPayment(
//   //   {
//   //     Destination: WALLET_1.address,
//   //     Amount: "1000000",
//   //   }
//   // , {wallet: WALLET_2}
//   // );

//   // await mintNft(
//   //   {
//   //     URI: "https://media0.giphy.com/media/fnlXXGImVWB0RYWWQj/giphy.gif",
//   //     NFTokenTaxon: 0,
//   //   },
//   //   {
//   //     wallet: WALLET_1
//   //   }
//   // );

//   // await createNftOffer(
//   //   {
//   //     Flags: NFTokenCreateOfferFlags.tfSellNFToken,
//   //     NFTokenID: "00080000B61C18D1F21056BE092220B028957CFFDF28C10516E5DA9C00000001",
//   //     Amount: "1000000",
//   //   },
//   //   { wallet: WALLET_1 }
//   // );

//   // await acceptNftOffer(
//   //   {
//   //     NFTokenSellOffer: "9D64C5242548CE8693C4542A37AB733DEE60E0767F31E713364323ACD1DF5AFC",
//   //   },
//   //   {
//   //     wallet: WALLET_2,
//   //   }
//   // )

//   await client.disconnect()
// }

// main()


const xummClient = getXummClient();
// const ping = xummClient.ping();

export const main2 = async () => {
  const payload:XummJsonTransaction = {
    TransactionType: "Payment",
    Destination: "rN31LiG3oE7wrfFhRwPAV29MCKF8qTzVTt"
  }
  const response = await xummClient.payload.create(payload);

  console.log(response);
  // in the response obtained in next.always property, 
  // open the link and scan the QR code with xumm app
  // in the app you can send XRP to the Destination written above
}

main2()