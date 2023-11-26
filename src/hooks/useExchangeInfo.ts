import { useEffect, useState } from "react";
import useTraderAPI from "./useTraderAPI";
import { ExchangeInfo } from "@d8x/perpetuals-sdk";

const useExchangeInfo = (chainId: number) => {
  const { traderAPI, isLoading: isAPILoading } = useTraderAPI(chainId);
  const [isLoading, setLoading] = useState(false);
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo>();
  useEffect(() => {
    if (!traderAPI || isAPILoading) {
      return;
    }
    setLoading(true);
    traderAPI
      ?.exchangeInfo()
      .then(setExchangeInfo)
      .finally(() => setLoading(false));
  }, [traderAPI, isAPILoading, setExchangeInfo, setLoading]);
  return { exchangeInfo, isLoading };
};

export default useExchangeInfo;
