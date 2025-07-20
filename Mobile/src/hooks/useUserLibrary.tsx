import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "expo-router"
// types
import { User } from "../types/user"
// services
import { getCurrentUser } from "../services/userService"

export function useUserLibrary() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User>()
    const { token, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push("/login")
        }
    }, [])

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const response = await getCurrentUser(token);
            setUser(response?.data ?? undefined);
        } catch (_) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    const logoutHandleClick = () => {
        logout()
        router.push("/")
    }

    const callbackCurrentUser = async (page: number) => {
        const response = await getCurrentUser(token);
        return { components: response?.data?.games ?? [], amountOfPages: 1 };
    }

    return { token, logoutHandleClick, isLoading, user, callbackCurrentUser }
}