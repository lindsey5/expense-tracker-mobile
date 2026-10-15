import TransactionForm from "../TransactionForm";
import { Transaction } from "@/types/transaction.type";

type UpdateTransactionProps = { 
    refetch: () => void; 
    transaction?: Transaction | null;
    handleClose: () => void;
    visible: boolean;
}

export default function UpdateTransaction({
    refetch,
    transaction,
    handleClose,
    visible,
} : UpdateTransactionProps) {

    return (
       <TransactionForm 
            handleClose={handleClose}
            visible={visible}
            transaction={transaction}
            onSuccess={() => refetch()}
        />
    )
}