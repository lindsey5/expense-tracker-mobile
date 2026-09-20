import { Colors } from "@/constants/theme";
import useGetMonths from "@/hooks/use-get-months.hook";
import { useQuery } from "@/hooks/useQuery";
import { CalendarDays, Check, ChevronDown } from "lucide-react-native";
import { useColorScheme, Pressable, View, Text } from "react-native";
import {
    CustomModal,
    CustomModalBody,
    CustomModalContent,
    CustomModalHeader,
    CustomModalTitle,
} from "../ui/Modal";
import { useState } from "react";

export default function DateFilter({
    url
} : {
    url?: "/transaction/months" | "/budget/months"
}) {
    const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
    const colors = Colors[colorScheme];

    const { query, setQuery } = useQuery<{
        month?: number;
        year?: number;
        page?: number;
    }>();

    const [visible, setVisible] = useState(false);
    const { data } = useGetMonths(url);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const selectedMonth = query.month
        ? Number(query.month)
        : currentMonth;

    const selectedYear = query.year
        ? Number(query.year)
        : currentYear;

    const selectedDate =
        data
        ?.find((item) => item.month === selectedMonth && item.year === selectedYear)?.monthName?.trim() 
        ?? new Date(selectedYear, selectedMonth - 1)
        .toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        }
        );

    const handleSelect = (month: number, year: number) => {
        setQuery({
            ...query,
            month,
            year,
            page: 1,
        });
        setVisible(false);
    };

    return (
        <>
        <Pressable
            onPress={() => setVisible(true)}
            className="mb-5 flex-row items-center justify-between rounded-[20px] border px-4 py-3.5"
            style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            }}
        >
            <View className="flex-row items-center">
            <CalendarDays size={19} color={colors.tint} />
            <Text
                className="ml-3 font-semibold"
                style={{ color: colors.text }}
            >
                {selectedDate}
            </Text>
            </View>
            <ChevronDown size={19} color={colors.icon} />
        </Pressable>

        <CustomModal
            visible={visible}
            handleClose={() => setVisible(false)}
        >
            <CustomModalContent>
            <CustomModalHeader>
                <CustomModalTitle>Select Month</CustomModalTitle>
            </CustomModalHeader>

            <CustomModalBody>
                {data?.map((item) => {
                const selected =
                    item.month === selectedMonth &&
                    item.year === selectedYear;

                return (
                    <Pressable
                        key={`${item.year}-${item.month}`}
                        onPress={() =>
                            handleSelect(item.month, item.year)
                        }
                        className="flex-row items-center justify-between rounded-2xl border px-4 py-4"
                        style={{
                            backgroundColor: selected
                            ? colors.tint
                            : colors.card,
                            borderColor: selected
                            ? colors.tint
                            : colors.border,
                        }}
                    >
                    <Text
                        className="font-semibold"
                        style={{
                        color: selected
                            ? "#FFFFFF"
                            : colors.text,
                        }}
                    >
                        {item.monthName.trim()}
                    </Text>

                    {selected && (
                        <Check size={20} color="#FFFFFF" />
                    )}
                    </Pressable>
                );
                })}
            </CustomModalBody>
            </CustomModalContent>
        </CustomModal>
        </>
    );
}