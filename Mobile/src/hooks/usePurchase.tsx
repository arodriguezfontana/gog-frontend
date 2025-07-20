import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useContexCart } from "../context/cartContext";
import { buyGamesOnCart } from "../services/gamesService";
import { throwCorrectException } from "../services/helper";

const usePurchase = () => {

    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { token } = useAuth()

    const { clearCart } = useContexCart();

    const onSubmit = (data: any) => {
        buyGamesOnCart(data, token).then(() => {
            clearCart();
            router.replace('/library');
        }
        ).catch((e) =>
            throwCorrectException(e)
        )
    };

    return { control, errors, handleSubmit, onSubmit };
}

export default usePurchase;