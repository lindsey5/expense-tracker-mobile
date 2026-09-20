import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/auth/use-login.hook';
import { Link } from 'expo-router';
import Error from '@/components/custom/Error';
import { Colors } from '@/constants/theme';
import Separator from '@/components/ui/Separator';

export default function Login() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const { handleSubmit, formState: { errors }, watch, setValue } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLogin();
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          className="flex-1"
          style={{
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          }}
        >
          <View className="pt-10 text-center">
            <Image
              source={require('@/assets/logo.png')}
              resizeMode="contain"
              style={{ width: '100%', maxWidth: 300, height: 200 }}
            />

            <Text
              className="mt-6 text-[32px] font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Sign In
            </Text>
            <Text
              className="mt-2 text-[15px]"
              style={{ color: colors.icon }}
            >
              Take control of your spending, one peso at a time.
            </Text>
          </View>

          <Separator className='my-6' />

          <Error />

          <View className='gap-3'>
            <InputField
              label="Email"
              type="email"
              value={watch('email')}
              onChangeText={(text: string) => setValue('email', text)}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
              autoCorrect={false}
            />

            <InputField
              label="Password"
              type="password"
              value={watch('password')}
              onChangeText={(text: string) => setValue('password', text)}
              error={errors.password?.message}
              placeholder="Enter your password"
            />
          </View>

          <TouchableOpacity className="mt-3 self-end" activeOpacity={0.6}>
            <Text className="text-[13px] font-medium" style={{ color: colors.icon }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Button
            className="mt-5"
            title={loginMutation.isPending ? 'Logging in...' : 'Log in'}
            onPress={handleSubmit(onSubmit)}
            disabled={loginMutation.isPending}
          />

          <View className="mt-8 flex-row justify-center">
            <Text className="text-[13px]" style={{ color: colors.icon }}>
              Don&apos;t have an account?{' '}
            </Text>
            <Link href="/signup" asChild disabled={loginMutation.isPending}>
              <TouchableOpacity activeOpacity={0.6}>
                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
