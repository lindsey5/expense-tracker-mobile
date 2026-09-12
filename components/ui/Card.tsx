import { Colors } from "@/constants/theme";
import { cn } from "@/utils/utils";
import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";

type CardProps = {
    children: ReactNode;
    className?: string;
    variant?: "default" | "surfaceTint";
};

export default function Card({
    className,
    children,
    variant = "default",
}: CardProps) {
    const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
    const colors = Colors[colorScheme];

    return (
        <View
            className={cn(
                "flex-1 rounded-2xl p-4",
                className
            )}
            style={{
                backgroundColor:
                    variant === "surfaceTint"
                        ? colors.surfaceTint
                        : colors.card,
                borderWidth: 1,
                borderColor: colors.border,
            }}
        >
            {children}
        </View>
    );
}