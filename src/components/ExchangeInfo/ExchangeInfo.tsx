import { PoolState } from "@d8x/perpetuals-sdk";
import useExchangeInfo from "../../hooks/useExchangeInfo";

import "./ExchangeInfo.css";

const Pool = (pool: PoolState) => {
  const perps = `${pool.perpetuals.length} perpetuals`;
  const running = pool.isRunning ? "Running" : "Not Running";
  return (
    <div className="item">
      <div className="display-container">
        <div className="name">{pool.poolSymbol}</div>
        <div className="fullname">{pool.marginTokenAddr}</div>
      </div>
      <div className="price-container">
        <div className="price">{perps}</div>
        <div className={`price-change success`}>{running}</div>
      </div>
    </div>
  );
};

interface ExchangeInfoProps {
  chainId: number;
}

const ExchangeInfo = ({ chainId }: ExchangeInfoProps) => {
  const { exchangeInfo, isLoading } = useExchangeInfo(chainId);
  const proxy = `Proxy: ${exchangeInfo?.proxyAddr}`;
  return (
    <div>
      <div className="title"> {"Exchange Info"} </div>
      <div className="container">
        {!isLoading ? (
          exchangeInfo?.pools.map((poolState) => (
            <Pool key={poolState.poolSymbol} {...poolState} />
          ))
        ) : (
          <p className="loading-text">Loading Data...</p>
        )}
      </div>
    </div>
  );
};

export default ExchangeInfo;
