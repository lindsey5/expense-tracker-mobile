import { Colors } from "@/constants/theme";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, useColorScheme, Text } from "react-native";
import TransactionForm from "../TransactionForm";

export default function CreateTransaction({
    refetch
} : { refetch: () => void; }) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setVisible(false);
    }

    return (
        <>
            <TouchableOpacity
                className="absolute bottom-6 right-5 flex-row items-center rounded-full px-5 py-4"
                style={{ backgroundColor: colors.tint }}
                onPress={() => setVisible(true)}
            >
                <Plus size={20} color="#FFFFFF" />

                <Text className="ml-2 font-bold text-white">Add Transaction</Text>
            </TouchableOpacity>
            <TransactionForm 
                handleClose={handleClose}
                visible={visible}
                onSuccess={() => refetch()}
            />
        </>
    )
}