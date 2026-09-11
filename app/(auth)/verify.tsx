import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useLocalSearchParams, router, Redirect } from "expo-router";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import VerificationCodeInput from "@/components/custom/VerificationCodeInput";

export default function Verify() {
    const { email } = useLocalSearchParams<{ email?: string }>();

    const [code, setCode] = useState("");

    const handleVerify = () => {
        if (code.length !== 6) {
            return;
        }

        router.replace("/");
    };

    if(!email) return <Redirect href="/" />

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
        >
        <View className="flex-1 justify-center px-6">
            <View className="mb-8">
                <Text className="text-3xl font-bold">
                    Verify your email
                </Text>

                <Text className="mt-2 text-sm text-gray-500">
                    We sent a verification code to
                </Text>

                <Text className="mt-1 font-semibold">
                    {email || "your email"}
                </Text>
            </View>

            <Text className="mb-2 text-sm font-semibold">
            Verification code
            </Text>


            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleVerify}
                disabled={code.length !== 6}
                className={`mt-6 rounded-xl py-4 ${
                    code.length === 6 ? "bg-black" : "bg-gray-300"
                }`}
            >
            <Text className="text-center font-semibold text-white">
                Verify
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.6}
                className="mt-5"
            >
            <Text className="text-center text-sm font-semibold">
                Resend code
            </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
}
