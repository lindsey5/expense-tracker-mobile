import { GetWalletsResponse } from "@/hooks/wallet/use-get-wallets.hook";

export type WalletType = GetWalletsResponse['wallets'][number]['type'];

export type Wallet = GetWalletsResponse['wallets'][number];