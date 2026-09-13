import { GetWalletsResponse } from "@/hooks/wallet/use-get-wallets.hook";

export type WalletType = GetWalletsResponse['wallets'][number]['type'];
