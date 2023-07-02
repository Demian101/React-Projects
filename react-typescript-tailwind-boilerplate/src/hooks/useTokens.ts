import { AccountKeys } from "@manahippo/aptos-wallet-adapter";    // type
import { useEffect, useState } from "react";
import { Token } from "../types";               // type
import { walletClient } from "../utils/aptos";

function useTokens(account: AccountKeys | null): {
  tokens: Token[];
  loading: boolean;
} {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokens = async () => {
      const data = await walletClient.getTokenIds(
        account!.address!.toString(),
        100,
        0,
        0
      );
      const tokens1 = await Promise.all(
        data.tokenIds
          .filter((i) => i.difference !== 0)
          .map(async (i) => {
            const token = await walletClient.getToken(i.data);
            // console.log("i.data ", i.data);
            // console.log("token ", token);
            return {
              propertyVersion: i.data.property_version,
              creator: i.data.token_data_id.creator,
              collection: token.collection,
              name: token.name,
              description: token.description,
              uri: token.uri,
              maximum: token.maximum,
              supply: token.supply,
            };
          })
      );
      setLoading(false);
      setTokens(tokens1);
    };
    if (account?.address) {
      getTokens();
    }
  }, [account]);

  return { tokens, loading };
}
export default useTokens;