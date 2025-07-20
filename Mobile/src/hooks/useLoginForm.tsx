import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useToast } from '../hooks/useToast';
import { useRouter } from "expo-router";
// services
import { loginUser } from '../services/userService';
// exceptions
import { BadRequestException } from '../services/exceptions';
import { GestureResponderEvent } from 'react-native';

export function useLoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { toast } = useToast()

    function changeForm(field: "email" | "password", value: string) {
        setFormData({
            ...formData,
            [field]: value,
        });
    }

    function validateForm() {
        const { email, password } = formData;
        if (email === "") {
            toast.error("Please put a email")
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address")
            return false;
        }

        if (password === "") {
            toast.error("Please put a password")
            return false;
        }

        return true;
    }

    async function sendForm(e: GestureResponderEvent) {
        try {
            e.preventDefault();
            if (!validateForm()) return;
            const { email, password } = formData;
            const { token, user } = await loginUser(email, password);
            login(user, token);
            router.replace("/")
        } catch (err) {
            if (err instanceof BadRequestException) {
                toast.error(err.message)
            }
        }
    }
    return { changeForm, sendForm }
}