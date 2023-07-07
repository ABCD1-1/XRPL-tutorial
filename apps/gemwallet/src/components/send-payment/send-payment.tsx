import { Button, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { SendPaymentRequest, sendPayment } from "@gemwallet/api"


export const SendPayment = () => {
  const { register, handleSubmit } = useForm<SendPaymentRequest>()

 
  const submitHandler: SubmitHandler<SendPaymentRequest> = async (values) => {
    const payment: SendPaymentRequest = {
      amount: values.amount, // In drops
      destination: values.destination,
    };
    sendPayment(payment).then((response) => {
      console.log("Transaction Hash: ", response.result?.hash);
    });
  };

  return (
    <Stack spacing="6">
      <Text fontWeight="bold" fontSize="2xl">
        Send Payment
      </Text>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="column" spacing={8}>
          <FormControl id="destination" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Destination</FormLabel>
              <Input {...register("destination")} />
            </Stack>
          </FormControl>

          <FormControl id="amount" isRequired>
            <Stack direction={{ base: "column" }}>
              <FormLabel>Amount</FormLabel>
              <Input {...register("amount")} />
            </Stack>
          </FormControl>
        </Stack>

        <Flex direction="row-reverse">
          <Button backgroundColor="cyan.100" mt="8" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Stack>
  )
}
