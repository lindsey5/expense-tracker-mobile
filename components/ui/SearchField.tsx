import { TextInput, useColorScheme, View, } from "react-native"
import { Search } from "lucide-react-native"
import { Colors } from "@/constants/theme";
import { cn } from "@/utils/utils";

type SearchFieldProps = {
    search: string;
    setSearch: (value: string) => void;
    className?: string;
}

export default function SearchField({
    search,
    setSearch,
    className
} : SearchFieldProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <View
          className={cn(
            "mt-6 flex-row items-center rounded-2xl px-4",
            className
          )}
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Search size={19} color={colors.icon} />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search transactions..."
            placeholderTextColor={colors.placeholder}
            className="h-12 flex-1 px-3 text-sm"
            style={{ color: colors.text }}
          />
        </View>
    )
}