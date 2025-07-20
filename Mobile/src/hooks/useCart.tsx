import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useContexCart } from "../context/cartContext";
import { getGameFromCart } from "../services/gamesService";
import { Game } from "../types/game";

const useCart = () => {
    const { token } = useAuth()
    const { setAllGamesInCart, getCartGames } = useContexCart()
        ;
    const getGames = async (token: string | null) => {
        const allGames = await getGameFromCart(token);
        const juegosSinTags = allGames.map(({ tags, ...rest }: Game) => rest);
        setAllGamesInCart(juegosSinTags)
    };

    useEffect(() => {
        getGames(token);
    }, []);

    return { getCartGames, token }
}
export default useCart;