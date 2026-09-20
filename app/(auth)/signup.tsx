import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PiggyBank } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';

import PersonalStep from '@/components/custom/Signup/PersonalStep';
import SecurityStep from '@/components/custom/Signup/SecurityStep';
import VerificationStep from '@/components/custom/Signup/VerificationStep';

import {
  SignupFormData,
  signupSchema,
} from '@/schemas/auth.schema';

import useSignup from '@/hooks/auth/use-signup.hook';
import useVerify from '@/hooks/auth/use-verify.hook';
import useResendVerification from '@/hooks/auth/use-resend-verification-code.hook';
import Error from '@/components/custom/Error';
import useIsEmailExist from '@/hooks/user/use-user-lookup.hook';
import Separator from '@/components/ui/Separator';

const steps = ['Personal', 'Security', 'Verification'];

export default function Signup() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const [step, setStep] = useState(1);

  const isEmailExistMutation = useIsEmailExist();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    setError
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signupMutation = useSignup();
  const verifyMutation = useVerify();
  const resendMutation = useResendVerification();

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

  const handleNext = async () => {
    const valid = await trigger(['firstname', 'lastname', 'email']);

    if(!valid) return;

    const result = await isEmailExistMutation.mutateAsync(watch('email'));

    if(result.message !== "User not found.") {
        setError('email', { message: result.message });
        return;
   }    

    if (valid) setStep(2);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(
      {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        password: data.password,
      },
      {
        onSuccess: () => {
          setStep(3);
        },
      },
    );
  };

  const handleVerify = (code: string) => {
    verifyMutation.mutate({ email: watch('email'), verificationCode: code });
  };

  const handleResend = () => {
    resendMutation.mutate({ email: watch('email') });
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
          <View className="pt-16 pb-8">
            <Text className="text-[32px] font-bold tracking-tight" style={{ color: colors.text }}>
              Create account
            </Text>

            <Text className="mt-2 text-[15px]" style={{ color: colors.icon }}>
              Sign up to get started with Gastador.
            </Text>

            <Separator className='my-4'/>

            <View className="mt-6">
              <Stepper steps={steps} currentStep={step} colors={colors} />
            </View>

            <Error />

            {step === 1 && (
              <>
                <PersonalStep
                  firstname={watch('firstname')}
                  lastname={watch('lastname')}
                  email={watch('email')}
                  errors={errors}
                  setValue={setValue}
                />

                <View className="mt-8">
                  <Button title="Continue" onPress={handleNext} />
                </View>
              </>
            )}

            {step === 2 && (
              <>
                <SecurityStep
                  password={watch('password')}
                  confirmPassword={watch('confirmPassword')}
                  errors={errors}
                  setValue={setValue}
                />

                <View className="mt-8 flex-row gap-3">
                  <View className="flex-1">
                    <Button title="Back" variant="secondary" onPress={handleBack} />
                  </View>

                  <View className="flex-1">
                    <Button
                      title="Create account"
                      disabled={signupMutation.isPending}
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </>
            )}

            {step === 3 && (
              <VerificationStep
                email={watch('email')}
                colors={colors}
                onVerify={handleVerify}
                onResend={handleResend}
                loading={verifyMutation.isPending}
                resendLoading={resendMutation.isPending}
                onBack={handleBack}
              />
            )}
          </View>

          {step !== 3 && (
            <View className="mb-10 mt-8 flex-row justify-center">
              <Text className="text-[13px]" style={{ color: colors.icon }}>
                Already have an account?{' '}
              </Text>

              <Link href="/" asChild>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text className="text-[13px] font-semibold" style={{ color: colors.text }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
