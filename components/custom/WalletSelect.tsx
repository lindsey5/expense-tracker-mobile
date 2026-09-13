import useGetWallets from "@/hooks/wallet/use-get-wallets.hook";
import Select from "../ui/Select";

type WalletSelectProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function WalletSelect({
    onChange,
    value,
    error
} : WalletSelectProps) {
    const { data } = useGetWallets();

    return (
        <Select 
            label="Select Wallet"
            onChange={onChange}
            value={value}
            options={data?.wallets.map(wallet => ({ label: wallet.name, value: wallet.id })) || []}
            error={error}
        />
    )
}