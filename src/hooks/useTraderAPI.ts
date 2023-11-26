import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { traderAPIAtom } from "../store/sdk.store";
import { PerpetualDataHandler, TraderInterface } from "@d8x/perpetuals-sdk";

const useTraderAPI = (chainId: number) => {
  const [traderAPI, setTraderAPI] = useAtom(traderAPIAtom);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!!traderAPI && traderAPI.chainId === chainId) {
      return;
    }
    setLoading(true);
    const api = new TraderInterface(
      PerpetualDataHandler.readSDKConfig(chainId)
    );
    api
      .createProxyInstance()
      .then(() => setTraderAPI(api))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return { traderAPI: traderAPI, isLoading: isLoading };
};

export default useTraderAPI;
