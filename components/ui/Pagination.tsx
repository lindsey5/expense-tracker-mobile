import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { useQuery } from '@/hooks/useQuery';

type PaginationProps = {
  page: number;
  totalPages: number;
};

export default function Pagination({
  page,
  totalPages,
}: PaginationProps) {
    const { pushQuery } = useQuery();
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    if (totalPages <= 1) {
        return null;
    }

    const goToPrevious = () => {
        if (page > 1) {
            pushQuery({ page: page - 1 })
        }
    };

    const goToNext = () => {
        if (page < totalPages) {
            pushQuery({ page: page + 1 })
        }
    };

    return (
        <View className="flex-row items-center justify-center gap-3 py-4">
            <TouchableOpacity
                onPress={goToPrevious}
                disabled={page === 1}
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: page === 1 ? 0.4 : 1,
                }}
            >
                <ChevronLeft size={20} color={colors.text} />
            </TouchableOpacity>

            <View className="min-w-20 items-center">
                <Text
                className="text-sm font-semibold"
                style={{ color: colors.text }}
                >
                {page} / {totalPages}
                </Text>
            </View>

            <TouchableOpacity
                onPress={goToNext}
                disabled={page === totalPages}
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: page === totalPages ? 0.4 : 1,
                }}
            >
                <ChevronRight size={20} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
}