import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { APIException } from '../services/exceptions';
import { useAuth } from '../context/authContext';
import { getGameById } from '../services/gamesService';
import { getCurrentUser } from '../services/userService';
import { User } from '../types/user';
import { Game } from '../types/game';
import { SimpleGame } from '../types/simpleGame';
import { useContexCart } from '../context/cartContext';

export function useGames() {
    const { gameId } = useLocalSearchParams<{ gameId: string }>();
    const router = useRouter();
    const { cartGames } = useContexCart();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState<Game | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)


    const { token } = useAuth();

    const reloadGame = async () => {
        try {
            const data = await getGameById(gameId)
            setGame(data)
        } catch (err) {
            if (err instanceof APIException) {
                router.replace(err.path)
            }
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        const fetchUserAndGame = async () => {
            try {
                setLoading(true);
                if (token) {
                    const response = await getCurrentUser(token);
                    setCurrentUser(response?.data ?? null);
                } else {
                    setCurrentUser(null);
                }
            } catch (err) {
                if (err instanceof APIException) {
                    router.replace(err.path);
                }
            } finally {
                await reloadGame();
                setLoading(false);
            }
        };
        fetchUserAndGame();
    }, [gameId, cartGames, token]);


    const currentUserReview = currentUser
        ? game?.reviews.find(r => r.user?.id === currentUser.id)
        : undefined;

    const currentUserOwnsGame = currentUser?.games?.some(g => g.id === game?.id) ?? false;

    const handleGamePress = (game: SimpleGame) => {
        router.push(`/game/${game.id}`)
    };

    return { loading, gameId, reloadGame, game, currentUser, currentUserReview, currentUserOwnsGame, handleGamePress };
}