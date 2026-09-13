import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  Plus,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Header from '@/components/custom/Header';
import WalletList from '@/components/custom/Wallet/WalletList';
import { useState } from 'react';
import WalletModal from '@/components/custom/Wallet/WalletModal';

export default function Wallets() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [showModal, setShowModal] = useState(false);

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 58, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Header 
                title='Wallets'
                description='Manage your money accounts'
            />

            <View className="mb-7">
                <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-bold" style={{ color: colors.text }}>
                    My Wallets
                </Text>
                <TouchableOpacity
                    className='rounded-full p-1 text-white'
                    style={{ backgroundColor: colors.accent }}
                    onPress={() => setShowModal(true)}
                >
                    <Plus size={20}/>
                </TouchableOpacity>
                </View>
            </View>

            <WalletList />
            <WalletModal 
                visible={showModal}
                onClose={() => setShowModal(false)}
            />
        </ScrollView>
    );
}