import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Card from "../components/Explore/Card";
import Layout from "../components/Layout/Layout";
import PlayIcon from "./PlayIcon";

// fetch({
//   params: createTokenOptions(
//     "payToMint",
//     {
//       to: user?.get("ethAddress"),
//       id: 2,
//       amount: 1,
//       data: "0x00",
//     },
//     ethers.utils.parseEther("0.01").toString(),
//   ),
// });
const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 20 }}
        direction={{ base: "column", md: "row" }}
        maxW={"6xl"}
        mx={"auto"}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Trade NFTs,
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              for NFTs!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            wenNFT aims to be the final puzzle in the NFT gaming space. We have
            101 card games in the ecosystem, yet trading cards for cards remain
            difficult and requiring trust.
            <br />
            <br />
            Why should that be the case?
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              onClick={onOpen}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
            >
              Join Beta
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
            >
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"fit-content"}
            overflow={"hidden"}
          >
            <Card />
          </Box>
        </Flex>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit your email to stay updated!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="your-email@web3.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green">Submit Email</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Home;
