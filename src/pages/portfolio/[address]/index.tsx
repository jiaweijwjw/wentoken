import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApiContract } from "react-moralis";
import Layout from "../../../components/Layout/Layout";
import PortfolioCollection from "../../../components/Portfolio/PortfolioCollection";
import PortfolioCollectionChart from "../../../components/Portfolio/PortfolioCollectionChart";
import PortfolioStats from "../../../components/Portfolio/PortfolioStats";
import { TOKEN_IDS, TOKEN_LENGTH } from "../../../constants/constants";
import { wenTokenAbi, wenTokenAddress } from "../../../util/createTokenOptions";

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data, isLoading, runContractFunction } = useApiContract({
    abi: wenTokenAbi,
    functionName: "balanceOfBatch",
    address: wenTokenAddress,
    chain: "ropsten",
    params: {
      // [address, address, address, address]
      accounts: Array(TOKEN_LENGTH).fill(address),
      // [0, 1, 2, 3]
      ids: TOKEN_IDS,
    },
  });

  const [tokens, setTokens] = useState<number[]>([]);
  const [sum, setSum] = useState(0);

  // fetch data
  useEffect(() => {
    runContractFunction();
  }, [runContractFunction]);

  // once data is retrieved, update localstate for tokens and sum of tokens
  useEffect(() => {
    if (data) {
      setTokens((data as unknown as string[]).map(Number));
      setSum((data as unknown as string[]).reduce((a, b) => +a + +b, 0));
    }
  }, [data]);

  return (
    <Layout>
      <Box maxW={"6xl"} mx={"auto"} mt={4}>
        <Box boxShadow={"xl"} rounded={"xl"} px={10} pt={8} pb={6}>
          <PortfolioStats sum={sum} tokens={tokens} isLoading={isLoading} />
        </Box>
        {tokens.map(
          (token, index) =>
            token > 0 && (
              <Box>
              <PortfolioCollectionChart/>
              <PortfolioCollection
                tokenAmount={token}
                tokenId={index}
                key={index}
              />
              </Box>
            ),
        )}
      </Box>
    </Layout>
  );
};

export default PortfolioPage;
