import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import router from "next/router";
import { TOKENS } from "../../constants/constants";
import { v4 as uuidv4 } from "uuid";

interface TradeConfirmationMenuProps {
  isFetching: boolean;
  isEmpty: boolean;
  from: string;
  to: string;
  fromTokenAmounts: number[];
  toTokenAmounts: number[];
  submit: boolean;
  onClick: () => void;
}

const TradeConfirmationMenu = ({
  isFetching,
  from,
  to,
  fromTokenAmounts,
  toTokenAmounts,
  submit,
  isEmpty,
  onClick,
}: TradeConfirmationMenuProps) => {
  return (
    <Stack ml={8} my={4} boxShadow={"xl"} p={6} gap={4} rounded={"xl"}>
      <Text as="h1" fontSize={"3xl"} fontWeight={800}>
        Trade Information
      </Text>
      <Flex justifyContent="space-between">
        {isFetching ? (
          <Spinner />
        ) : (
          !isEmpty && (
            <>
              <Stack>
                <FormLabel
                  htmlFor="from"
                  fontWeight={600}
                  fontSize={"lg"}
                  mb={0}
                >
                  From
                </FormLabel>
                <Input
                  variant={"filled"}
                  bg={"gray.300"}
                  id="from"
                  disabled
                  value={from}
                />
              </Stack>
              <Stack>
                <FormLabel htmlFor="to" fontWeight={600} fontSize={"lg"} mb={0}>
                  To
                </FormLabel>
                <Input
                  variant={"filled"}
                  bg={"gray.300"}
                  id="to"
                  disabled
                  value={to}
                />
              </Stack>
            </>
          )
        )}
      </Flex>
      <Flex justifyContent="space-between">
        {isFetching ? (
          <Spinner />
        ) : (
          !isEmpty && (
            <Stack flex={1}>
              <FormLabel fontWeight={600} fontSize={"lg"} mb={0}>
                Your NFTs
              </FormLabel>
              {fromTokenAmounts.map((tokenAmount, tokenId) =>
                new Array(tokenAmount)
                  .fill(0)
                  .map(() => (
                    <Input
                      key={uuidv4()}
                      variant={"filled"}
                      bg={"gray.300"}
                      value={TOKENS[tokenId]}
                      disabled
                    />
                  )),
              )}
            </Stack>
          )
        )}
      </Flex>
      <Flex justifyContent="space-between">
        {isFetching ? (
          <Spinner />
        ) : (
          !isEmpty && (
            <Stack flex={1}>
              <FormLabel fontWeight={600} fontSize={"lg"} mb={0}>
                Their NFTs
              </FormLabel>
              {toTokenAmounts.map((tokenAmount, tokenId) =>
                new Array(tokenAmount)
                  .fill(0)
                  .map(() => (
                    <Input
                      key={uuidv4()}
                      variant={"filled"}
                      bg={"gray.300"}
                      value={TOKENS[tokenId]}
                      disabled
                    />
                  )),
              )}
            </Stack>
          )
        )}
      </Flex>
      <Stack>
        <Text fontWeight={600} fontSize={"lg"}>
          Transaction Fees:
        </Text>
        <Text>Gas Fees: 0.001 ETH</Text>
      </Stack>
      <HStack justifyContent={"space-around"}>
        <Button variant="shadow" onClickCapture={() => router.back()}>
          Edit Trade
        </Button>
        <Button
          variant={"dark-shadow"}
          isDisabled={isFetching || submit}
          onClickCapture={onClick}
        >
          Confirm Offer
        </Button>
      </HStack>
    </Stack>
  );
};

export default TradeConfirmationMenu;
