import Skeleton from "@/components/ui/Skeleton";
import { Colors } from "@/constants/theme";
import { Budget } from "@/types/budget.type";
import { formatCurrency } from "@/utils/utils";
import { BarChart3, ChevronRight } from "lucide-react-native";
import { useColorScheme, View, Text, TouchableOpacity } from "react-native";

type SpendingDetailsProps = {
  budgets: Budget[];
  isLoading: boolean;
};

function SpendingDetailsSkeleton() {
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
  const colors = Colors[colorScheme];

  return (
    <View className="mt-7">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <BarChart3 size={18} color={colors.tint} />
          <Text
            className="ml-2 text-lg font-bold"
            style={{ color: colors.text }}
          >
            Spending
          </Text>
        </View>

        <View className="flex-row items-center">
          <Skeleton width={48} height={14} className="rounded-md" />
          <ChevronRight size={16} color={colors.border} />
        </View>
      </View>

      {/* Card */}
      <View
        className="rounded-[24px] border p-5"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        {[1, 2, 3, 4].map((item, index) => (
          <View key={item} className={index === 0 ? "" : "mt-5"}>
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Skeleton
                  width={10}
                  height={10}
                  className="mr-2 rounded-full"
                />
                <Skeleton width={90} height={14} className="rounded-md" />
              </View>

              <View className="flex-row items-center">
                <Skeleton width={32} height={12} className="mr-2 rounded-md" />
                <Skeleton width={70} height={14} className="rounded-md" />
              </View>
            </View>

            <View
              className="h-1.5 overflow-hidden rounded-full"
              style={{ backgroundColor: colors.soft }}
            >
              <Skeleton width="100%" height={6} className="rounded-full" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function SpendingDetails({
  budgets,
  isLoading,
}: SpendingDetailsProps) {
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
  const colors = Colors[colorScheme];

  if (isLoading) {
    return <SpendingDetailsSkeleton />;
  }

  return (
    <View className="mt-7">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <BarChart3 size={18} color={colors.tint} />

          <Text
            className="ml-2 text-lg font-bold"
            style={{ color: colors.text }}
          >
            Spending
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center">
          <Text
            className="mr-1 text-sm font-semibold"
            style={{ color: colors.tint }}
          >
            Details
          </Text>

          <ChevronRight size={16} color={colors.tint} />
        </TouchableOpacity>
      </View>

      <View
        className="rounded-[24px] border p-5"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        {budgets.map((budget, index) => (
          <View
            key={budget.category}
            className={index === 0 ? "" : "mt-5"}
          >
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className="mr-2 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors.tint }}
                />

                <Text
                  className="text-sm font-medium"
                  style={{ color: colors.text }}
                >
                  {budget.category}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Text
                  className="mr-2 text-xs"
                  style={{ color: colors.icon }}
                >
                  {budget.percentage}%
                </Text>

                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.text }}
                >
                  {formatCurrency(budget.amount)}
                </Text>
              </View>
            </View>

            <View
              className="h-1.5 overflow-hidden rounded-full"
              style={{ backgroundColor: colors.soft }}
            >
              <View
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(budget.percentage, 100)}%`,
                  backgroundColor: colors.tint,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}