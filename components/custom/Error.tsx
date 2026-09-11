import { useErrorStore } from "@/lib/store/errorStore";
import { View, Text } from "react-native"


export default function Error() {
    const error = useErrorStore((state) => state.error);
    
    if(!error) return null;

    return (
        <View className="mb-4 rounded-lg bg-red-50 px-4 py-3">
            <Text className="text-sm text-red-600">
            {error}
            </Text>
        </View>
    )
}