import { useEffect, useRef } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '@/hooks/auth/use-login.hook';
import { Link } from 'expo-router';
import Error from '@/components/custom/Error';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Animated.View
        className="flex-1 px-8"
        style={{
          opacity: contentOpacity,
          transform: [{ translateY: contentTranslate }],
        }}
      >
        <View className="mt-20 mb-14">
          <Wallet size={26} color={colors.text} strokeWidth={1.5} />
          <Text className="mt-8 text-[28px] font-semibold tracking-tight" style={{ color: colors.text }}>
            Welcome back
          </Text>
          <Text className="mt-1.5 text-[15px]" style={{ color: colors.icon }}>
            Sign in to continue to Gastador
          </Text>
        </View>

        <View>
          <Error />
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

          <View className="mt-4">
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
            className='mt-5'
            title={loginMutation.isPending ? 'Logging in...' : 'Log in'}
            onPress={handleSubmit(onSubmit)} 
            disabled={loginMutation.isPending}
          />
          <View className="mt-10 flex-row justify-center">
            <Text className="text-[13px]" style={{ color: colors.icon }}>
              Don't have an account?{' '}
            </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity activeOpacity={0.6}>
                <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}