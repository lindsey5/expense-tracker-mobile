import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WalletCards } from 'lucide-react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import GoogleButton from '@/components/custom/GoogleButton';

export default function Login() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Animation values
    const logoScale = useRef(new Animated.Value(0.6)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;

    const brandOpacity = useRef(new Animated.Value(0)).current;
    const brandTranslate = useRef(new Animated.Value(20)).current;

    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslate = useRef(new Animated.Value(30)).current;

    const footerOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
        // Logo
        Animated.parallel([
            Animated.spring(logoScale, {
            toValue: 1,
            friction: 6,
            tension: 50,
            useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
            }),
        ]),

        // Brand
        Animated.parallel([
            Animated.timing(brandOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            }),
            Animated.timing(brandTranslate, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            }),
        ]),

        // Form
        Animated.parallel([
            Animated.timing(formOpacity, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
            }),
            Animated.timing(formTranslate, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
            }),
        ]),

        // Footer
        Animated.timing(footerOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }),
        ]).start();
    }, []);

    const handleLogin = () => {
        console.log({
        email,
        password,
        });
    };

    const handleGoogleLogin = () => {
        console.log('Google login');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            <View className="flex-1 px-6">

                {/* Header */}
                <View className="mt-16">

                {/* Logo */}
                <Animated.View
                    style={{
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    }}
                    className="mb-5"
                >
                    <View
                        className="h-16 w-16 items-center justify-center rounded-2xl"
                        style={{
                            backgroundColor: colors.tint,
                        }}
                    >
                    <WalletCards
                        size={30}
                        color="#FFFFFF"
                        strokeWidth={2}
                    />
                    </View>
                </Animated.View>

                {/* Brand */}
                <Animated.View
                    style={{
                        opacity: brandOpacity,
                        transform: [{ translateY: brandTranslate }],
                    }}
                >
                    <Text
                        className="text-4xl font-extrabold"
                        style={{ color: colors.text }}
                    >
                    Gastador
                    </Text>

                    <Text
                        className="mt-2 text-base leading-6"
                        style={{ color: colors.icon }}
                    >
                        Take control of your money.
                        {'\n'}
                        Track every gasto, effortlessly.
                    </Text>
                </Animated.View>
                </View>

                {/* Login Form */}
                <Animated.View
                    className="mt-10"
                    style={{
                        opacity: formOpacity,
                        transform: [{ translateY: formTranslate }],
                    }}
                >
                {/* Section Header */}
                <View className="mb-6">
                    <Text
                        className="text-2xl font-bold"
                        style={{ color: colors.text }}
                    >
                    Welcome back
                    </Text>

                    <Text
                        className="mt-1 text-sm"
                        style={{ color: colors.icon }}
                    >
                    Sign in to continue managing your finances.
                    </Text>
                </View>

                {/* Email */}
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* Password */}
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                />

                {/* Forgot Password */}
                <TouchableOpacity
                    className="mb-6 mt-1 self-end"
                    activeOpacity={0.7}
                >
                    <Text
                        className="text-sm font-semibold"
                        style={{ color: colors.tint }}
                    >
                    Forgot password?
                    </Text>
                </TouchableOpacity>

                {/* Login */}
                <Button
                    title="Login"
                    onPress={handleLogin}
                />

                {/* Divider */}
                <View className="my-6 flex-row items-center">
                    <View
                        className="h-px flex-1"
                        style={{ backgroundColor: colors.border }}
                    />

                    <Text
                        className="mx-4 text-xs font-medium"
                        style={{ color: colors.icon }}
                    >
                    OR
                    </Text>

                    <View
                        className="h-px flex-1"
                        style={{ backgroundColor: colors.border }}
                    />
                </View>

                {/* Google */}
                <GoogleButton onPress={handleGoogleLogin}>
                    Continue with Google
                </GoogleButton>

                {/* Register */}
                <View className="mt-6 flex-row justify-center">
                    <Text
                        className="text-sm"
                        style={{ color: colors.icon }}
                    >
                    Don't have an account?{' '}
                    </Text>

                    <TouchableOpacity activeOpacity={0.7}>
                    <Text
                        className="text-sm font-bold"
                        style={{ color: colors.tint }}
                    >
                        Sign up
                    </Text>
                    </TouchableOpacity>
                </View>
                </Animated.View>

                {/* Footer */}
                <Animated.View
                    className="mb-8 mt-auto items-center"
                    style={{ opacity: footerOpacity }}
                >
                <Text
                    className="text-xs"
                    style={{ color: colors.icon }}
                >
                    © 2026 Gastador
                </Text>
                </Animated.View>

            </View>
        </KeyboardAvoidingView>
    );
}