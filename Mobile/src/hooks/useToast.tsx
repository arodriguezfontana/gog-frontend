import Toast from "react-native-toast-message";
import { UnauthorizedException, BadRequestException, NotFound, InternalServerErrorException } from "../services/exceptions";

class ToastReact {
    success(message: string) {
        Toast.show({
            type: "success",
            text1: message,
        })
    }
    error(message: string) {
        Toast.show({
            type: "error",
            text1: message,
        })
    }
    info(message: string) {
        Toast.show({
            type: "info",
            text1: message,
        })
    }
}

export function useToast() {
    function success(message: string) {
        Toast.show({
            type: "success",
            text1: message,
        })
    }
    function error(message: string) {
        Toast.show({
            type: "error",
            text1: message,
        })
    }
    function info(message: string) {
        Toast.show({
            type: "info",
            text1: message,
        })
    }
    function handleApiError(error: any) {
        if (error instanceof UnauthorizedException) {
            toast.error("Your session has expired. Please log in again.");
        } else if (error instanceof BadRequestException) {
            toast.error(error.message || "Please check the entered data.");
        } else if (error instanceof NotFound) {
            toast.error("No results found.");
        } else if (error instanceof InternalServerErrorException) {
            toast.error("An error occurred. Please try again later.");
        } else {
            toast.error("An error occurred. Please try again later.");
        }
    }

    const toast = new ToastReact()
    return { success, error, info, toast, handleApiError }
}