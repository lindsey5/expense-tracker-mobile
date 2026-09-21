import GradientCard from '@/components/ui/GradientCard';
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
        <GradientCard
          key={item}
          width={288}
          height={176}
        >
          <View className="flex-1 justify-between">
            {/* Top */}
            <View className="flex-row items-start justify-between">
              <View>
                <View
                  className="h-3 w-14 rounded-full"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }}
                />

                <View
                  className="mt-2 h-5 w-28 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                  }}
                />
              </View>

              <View
                className="h-10 w-10 rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.18)',
                }}
              />
            </View>

            {/* Balance */}
            <View>
              <View
                className="h-3 w-28 rounded-full"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                }}
              />

              <View
                className="mt-2 h-7 w-32 rounded-lg"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                }}
              />
            </View>
          </View>
        </GradientCard>
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
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text
          className="text-lg font-bold"
          style={{ color: colors.text }}
        >
          Wallets
        </Text>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.push('/wallets')}
        >
          <Text
            className="mr-1 text-sm font-semibold"
            style={{ color: colors.tint }}
          >
            Manage
          </Text>

          <ChevronRight
            size={16}
            color={colors.tint}
          />
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
            <GradientCard
              key={wallet.id}
              width={288}
              height={176}
            >
              <View className="flex-1 justify-between">
                {/* Top */}
                <View className="flex-row items-start justify-between">
                  <View>
                    <Text
                      className="text-[11px] font-medium uppercase"
                      style={{
                        color: '#ffffffbf',
                      }}
                    >
                      {wallet.type}
                    </Text>

                    <Text
                      className="mt-1 text-lg font-bold"
                      style={{
                        color: '#FFFFFF',
                      }}
                    >
                      {wallet.name}
                    </Text>
                  </View>

                  <View
                    className="rounded-xl p-2.5"
                    style={{
                      backgroundColor: '#ffffff2e',
                    }}
                  >
                    <Wallet
                      size={20}
                      color="#FFFFFF"
                    />
                  </View>
                </View>

                {/* Balance */}
                <View>
                  <Text
                    className="text-[11px] font-medium"
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                    }}
                  >
                    Available Balance
                  </Text>

                  <Text
                    className="mt-1 text-2xl font-bold"
                    style={{
                      color: '#FFFFFF',
                    }}
                  >
                    {formatCurrency(wallet.balance)}
                  </Text>
                </View>
              </View>
            </GradientCard>
          ))}
        </ScrollView>
      )}
    </View>
  );
}