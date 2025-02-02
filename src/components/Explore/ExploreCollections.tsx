import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import { TOKEN_IDS, TOKEN_LENGTH } from "../../constants/constants";
import { wenTokenAbi, wenTokenAddress } from "../../util/createTokenOptions";
import ExploreCollection from "./ExploreCollection";

const purchaseAddress = "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC";

const ExploreCollections = () => {
  const { isWeb3EnableLoading, isAuthenticated } = useMoralis();
  const { data, isLoading, runContractFunction } = useApiContract({
    abi: wenTokenAbi,
    functionName: "balanceOfBatch",
    address: wenTokenAddress,
    chain: "ropsten",
    params: {
      // [address, address, address, address]
      accounts: Array(TOKEN_LENGTH).fill(purchaseAddress),
      // [0, 1, 2, 3]
      ids: TOKEN_IDS,
    },
  });
  const [checkedItems, setCheckedItems] = useState(false);
  const [tokens, setTokens] = useState<number[]>([]);

  useEffect(() => {
    runContractFunction();
  }, [isWeb3EnableLoading, isAuthenticated]);

  useEffect(() => {
    if (data) {
      setTokens((data as unknown as string[]).map(Number));
    }
  }, [data]);

  return (
    <Box px={3}>
      {isLoading ? (
        <Flex justifyContent={"center"} mt={10}>
          <Spinner />
        </Flex>
      ) : (
        tokens.map(
          (token, index) =>
            token > 0 && (
              <ExploreCollection
                tokenAmount={token}
                tokenId={index}
                key={index}
              />
            ),
        )
      )}
    </Box>
  );
};

export default ExploreCollections;
