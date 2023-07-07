import { Button, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { MintNFTRequest, mintNFT } from "@gemwallet/api"
import { stringToHex } from "../../shared/helpers/conversions.helpers"


export const MintNft = () => {
  const { register, handleSubmit } = useForm<MintNFTRequest>()

 
  const submitHandler: SubmitHandler<MintNFTRequest> = async (values) => {

        const payload = {
          URI: values.URI ? stringToHex(values.URI) : "",
          flags: {
            tfOnlyXRP: true,
            tfTransferable: true
          },
          NFTokenTaxon: values.NFTokenTaxon,
        };
        mintNFT(payload).then((response) => {
          console.log("NFT ID: ", response.result?.NFTokenID);
          console.log("Transaction Hash: ", response.result?.hash);
        });
  };

  return (
    <Stack spacing="6">
      <Text fontWeight="bold" fontSize="2xl">
        Mint NFT
      </Text>

      <form onSubmit={handleSubmit(submitHandler)}>
      <Stack direction="column" spacing={8}>

        <FormControl id="URI" isRequired>
          <Stack direction={{ base: "column" }}>
            <FormLabel>URI</FormLabel>
            <Input {...register("URI")} />
          </Stack>
        </FormControl>
        </Stack>


        <Stack direction="column" spacing={8}>

          <FormControl id="NFTokenTaxon" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>NFTokenTaxon</FormLabel>
              <Input {...register("NFTokenTaxon")} />
            </Stack>
          </FormControl>
        </Stack>

        <Flex direction="row-reverse">
          <Button backgroundColor="cyan.100" mt="8" type="submit">
            Mint NFT!
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}

