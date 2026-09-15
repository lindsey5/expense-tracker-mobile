import { View, TouchableOpacity, Text, useColorScheme } from "react-native"
import { Plus, ArrowDownLeft } from "lucide-react-native"
import { Colors } from "@/constants/theme";
import { useState } from "react";
import TransactionForm from "../TransactionForm";

export default function ActionButtons({
    refresh
} : { refresh: () => void; }) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<"EXPENSE" | "INCOME">();

    const handleClose = () => {
        setVisible(false);
        setType(undefined)
    }

    const handleVisible = (type: "EXPENSE" | "INCOME") => {
        setType(type);
        setVisible(true);
    }

    return (
        <>
        <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
                className="flex-1 flex-row items-center justify-center rounded-2xl border py-3.5"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }}
                onPress={() => handleVisible("EXPENSE")}
            >
                <Plus size={18} color={colors.tint} />
                <Text className="ml-2 text-sm font-semibold" style={{ color: colors.text }}>
                Add Expense
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 flex-row items-center justify-center rounded-2xl border py-3.5"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }}
                onPress={() => handleVisible("INCOME")}
            >
                <ArrowDownLeft size={18} color={colors.tint} />
                <Text className="ml-2 text-sm font-semibold" style={{ color: colors.text }}>
                Add Income
                </Text>
            </TouchableOpacity>
        </View>
        <TransactionForm 
            handleClose={handleClose}
            visible={visible}
            type={type}
            onSuccess={refresh}
        />
        </>
    )
}