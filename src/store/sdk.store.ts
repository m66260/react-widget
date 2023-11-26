import { ExchangeInfo, TraderInterface } from "@d8x/perpetuals-sdk";
import { atom } from "jotai";

export const traderAPIAtom = atom<TraderInterface | undefined>(undefined);
export const exchangeInfo = atom<ExchangeInfo | undefined>(undefined);
