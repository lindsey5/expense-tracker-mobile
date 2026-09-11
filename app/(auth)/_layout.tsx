import { Redirect, Slot } from "expo-router";
import { useAuthStore } from "@/lib/store/authStore";

export default function UnprotectedLayout() {
    const accessToken = useAuthStore((state) => state.accessToken);

    if (accessToken) {
        return <Redirect href="/dashboard" />;
    }

    return <Slot />;
}