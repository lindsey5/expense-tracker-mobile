import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MailCheck } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import Button from '@/components/ui/Button';
import VerificationCodeInput from '../VerificationCodeInput';

type Props = {
  email: string;
  colors: (typeof Colors)['light'];
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
  loading?: boolean;
  resendLoading?: boolean;
};

export default function VerificationStep({
  email,
  colors,
  onVerify,
  onResend,
  onBack,
  loading,
  resendLoading,
}: Props) {
    const [code, setCode] = useState('');

    return (
        <View>
            <View className="mb-8">
                <MailCheck
                size={28}
                color={colors.text}
                strokeWidth={1.5}
                />

                <Text
                className="mt-6 text-[26px] font-semibold"
                style={{ color: colors.text }}
                >
                Verify your email
                </Text>

                <Text
                className="mt-2 text-[15px]"
                style={{ color: colors.icon }}
                >
                We sent a 6-digit verification code to
                </Text>

                <Text
                className="mt-1 text-[15px] font-semibold"
                style={{ color: colors.text }}
                >
                {email}
                </Text>
            </View>

            <Text
                className="mb-2 text-[13px] font-medium"
                style={{ color: colors.text }}
            >
                Verification code
            </Text>

            <VerificationCodeInput
                length={6}
                value={code}
                onChange={setCode}
            />
            <TouchableOpacity
                activeOpacity={0.6}
                disabled={resendLoading}
                onPress={onResend}
                className="my-5"
            >
                <Text
                className="text-center text-sm font-semibold"
                style={{ color: colors.text }}
                >
                {resendLoading ? 'Sending...' : 'Resend code'}
                </Text>
            </TouchableOpacity>
            <View className='flex flex-row gap-5'>
                 <Button
                    title="Back"
                    variant="secondary"
                    onPress={onBack}
                    className="flex-1"
                />
                <Button
                    title={loading ? 'Verifying...' : 'Verify email'}
                    disabled={code.length !== 6 || loading}
                    onPress={() => onVerify(code)}
                    className="flex-1"
                />
            </View>
        </View>
    );
}
