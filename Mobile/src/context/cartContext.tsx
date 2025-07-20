import React, { createContext, useState, useContext, ReactNode } from "react";
import { Game } from "../types/game";

type CartContextType = {
    clearCart: () => void;
    getCartGames: () => Game[];
    setAllGamesInCart: (game: Game[]) => void;
    addOneGameToCart: (game: Game) => void;
    cartGames: Game[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartGames, setCartGames] = useState<Game[]>([])
    const clearCart = () => { setCartGames([]); }
    const getCartGames = () => { return cartGames; }
    const addOneGameToCart = (game: Game) => {
        setCartGames([...cartGames, game]);
    }
    const setAllGamesInCart = (game: Game[]) => {
        setCartGames(game);
    }

    return (
        <CartContext.Provider value={{ clearCart, cartGames, getCartGames, setAllGamesInCart, addOneGameToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useContexCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useContextCart must be within a CartProvider");
    }
    return context;
};