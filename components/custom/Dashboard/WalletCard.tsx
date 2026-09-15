import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { Colors } from '@/constants/theme';
import { GetWalletsResponse } from '@/hooks/wallet/use-get-wallets.hook';
import { formatCurrency } from '@/utils/utils';
import { useRouter } from 'expo-router';
import { ChevronRight, Wallet } from 'lucide-react-native';
import {
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  ScrollView,
} from 'react-native';

type WalletCardProps = {
  wallets: GetWalletsResponse['wallets'];
  isLoading: boolean;
};

function WalletSkeleton() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={300}
      decelerationRate="fast"
      contentContainerStyle={{ gap: 12 }}
    >
      {[1, 2].map((item) => (
        <Card
          key={item}
          className="h-44 w-[288px] justify-between rounded-xl"
        >
          <View className="flex-row items-start justify-between">
            <View>
              <Skeleton width={55} height={12} />
              <Skeleton width={110} height={22} className="mt-2" />
            </View>

            <Skeleton width={42} height={42} className="rounded-xl" />
          </View>

          <Skeleton width={125} height={30} className="rounded-lg" />
        </Card>
      ))}
    </ScrollView>
  );
}

export default function WalletCard({
  wallets,
  isLoading,
}: WalletCardProps) {
    const router = useRouter();
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <View className="mt-7">
            <View className="mb-3 flex-row items-center justify-between">
                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                Wallets
                </Text>

                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/wallets')}>
                    <Text
                        className="mr-1 text-sm font-semibold"
                        style={{ color: colors.tint }}
                    >
                        Manage
                    </Text>
                    <ChevronRight size={16} color={colors.tint} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <WalletSkeleton />
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={300}
                    decelerationRate="fast"
                    contentContainerStyle={{ gap: 12 }}
                >
                {wallets.map((wallet) => (
                    <Card
                        key={wallet.id}
                        className="w-[288px] justify-center rounded-xl"
                    >
                    <View className="flex-row items-start justify-between">
                        <View>
                            <Text
                                className="text-[11px] font-medium"
                                style={{ color: colors.icon }}
                            >
                                {wallet.type}
                            </Text>

                            <Text
                                className="mt-1 text-lg font-bold"
                                style={{ color: colors.text }}
                            >
                                {wallet.name}
                            </Text>
                        </View>

                        <View
                            className="rounded-xl p-2.5"
                            style={{ backgroundColor: colors.softTint }}
                        >
                        <Wallet size={18} color={colors.tint} />
                        </View>
                    </View>

                    <Text
                        className="mt-1 text-2xl font-bold"
                        style={{ color: colors.text }}
                    >
                        {formatCurrency(wallet.balance)}
                    </Text>
                    </Card>
                ))}
                </ScrollView>
            )}
        </View>
    );
}