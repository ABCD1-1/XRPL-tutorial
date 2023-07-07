import { Button, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateNFTOfferRequest, createNFTOffer } from "@gemwallet/api"

export const CreateNftOffer = () => {
  const { register, handleSubmit } = useForm<CreateNFTOfferRequest>()

  const submitHandler: SubmitHandler<CreateNFTOfferRequest> = async (values) => {

    const payload = {
      NFTokenID: values.NFTokenID,
      amount: values.amount,
      flags: {
        tfSellNFToken: true // If enabled, indicates that the offer is a sell offer. Otherwise, it is a buy offer.
      },
    };
    createNFTOffer(payload).then((response) => {
      console.log("Transaction Hash: ", response.result?.hash);
    });
  };

  return (
    <Stack spacing="6">
      <Text fontWeight="bold" fontSize="2xl">
      Create NFT Offer
      </Text>

      <form onSubmit={handleSubmit(submitHandler)}>


        <Stack direction="column" spacing={8}>

          <FormControl id="NFTokenID" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>NFT ID</FormLabel>
              <Input {...register("NFTokenID")} />
            </Stack>
          </FormControl>
        </Stack>

        <Stack direction="column" spacing={8}>

          <FormControl id="amount" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Price (in drops)</FormLabel>
              <Input {...register("amount")} />
            </Stack>
          </FormControl>
        </Stack>

        <Flex direction="row-reverse">
          <Button backgroundColor="cyan.100" mt="8" type="submit">
            Create NFT Sell Offer!
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}

