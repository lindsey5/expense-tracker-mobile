import { View } from 'react-native';
import InputField from '@/components/ui/InputField';

type SecurityStepProps = {
    password: string;
    confirmPassword: string;
    errors: any;
    setValue: (field: any, value: string) => void;
};

export default function SecurityStep({
    password,
    confirmPassword,
    errors,
    setValue,
}: SecurityStepProps) {
    return (
        <View>
            <InputField
                label="Password"
                type="password"
                value={password}
                onChangeText={(text) => setValue('password', text)}
                placeholder="Enter your password"
                error={errors.password?.message}
            />

            <View className="mt-4">
                <InputField
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChangeText={(text) =>
                        setValue('confirmPassword', text)
                    }
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                />
            </View>
        </View>
    );
}