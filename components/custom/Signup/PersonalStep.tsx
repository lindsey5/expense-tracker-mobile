import { View } from 'react-native';
import InputField from '@/components/ui/InputField';

type PersonalStepProps = {
    firstname: string;
    lastname: string;
    email: string;
    errors: any;
    setValue: (field: any, value: string) => void;
};

export default function PersonalStep({
    firstname,
    lastname,
    email,
    errors,
    setValue,
}: PersonalStepProps) {
    return (
        <View>
            <InputField
                label="First name"
                value={firstname}
                onChangeText={(text) => setValue('firstname', text)}
                placeholder="Enter your firstname"
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.firstname?.message}
            />

            <View className="mt-4">
                <InputField
                label="Last name"
                value={lastname}
                onChangeText={(text) => setValue('lastname', text)}
                placeholder="Enter your lastname"
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.lastname?.message}
                />
            </View>

            <View className="mt-4">
                <InputField
                label="Email"
                type="email"
                value={email}
                onChangeText={(text) => setValue('email', text)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email?.message}
                />
            </View>
        </View>
    );
}