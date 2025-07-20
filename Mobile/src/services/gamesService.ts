import axios, { AxiosError, AxiosResponse } from "axios";
import { throwCorrectException } from "./helper";
import { Game } from "../types/game";
import { CreditData } from "../types/utils";
axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL

export interface GamesResponse {
  list: Game[];
  amountOfPages: number;
}

export const getRecommendedGames = async (): Promise<AxiosResponse<Game> | undefined> => {
  try {
    return await axios.get("/games/recommended");
  } catch (error) {
    if (error instanceof AxiosError) {
      throwCorrectException(error)
    }
    return undefined;
  }
};

export const getGames = async (pageNumber = 1): Promise<AxiosResponse<GamesResponse> | undefined> => {
  try {
    return await axios.get(`/games?page=${pageNumber}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throwCorrectException(error)
    }
    return undefined;
  }
};

export const getGameById = async (gameId: string): Promise<Game> => {
  return axios.get(`/games/${gameId}`)
    .then((res) => res.data)
    .catch((err) => {
      if (err instanceof AxiosError) {
        throwCorrectException(err)
      }
      return undefined;
    })
}

export const putAddGameToCart = async (gameId: string | undefined, token: string | null) => {
  try {
    const res = await axios.put(`/games/${gameId}`, {}, {
      headers: {
        authorization: token
      }
    });
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
};

export const putAddReviewToGame = async (gameId: string, reviewData: { isRecommended: boolean, text: string }, token: string | null) => {
  try {
    const res = await axios.put(`/games/${gameId}/reviews`, reviewData, {
      headers: {
        authorization: token
      }
    });
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throwCorrectException(err)
    }
    return undefined;
  }
};

export const getTotalFee = async (token: string | null) => {
  const totalFee = await getTotalPriceOnCart(token) * (1 / 100);
  return totalFee.toFixed(2);
}

export const getTotalPriceOnCart = async (token: string | null): Promise<number> => {
  const listOfGames: Game[] = await getGameFromCart(token);
  const total = listOfGames.reduce((sum, game) => sum + game.price.amount, 0);
  return Math.round(total * 100) / 100;
}

export const buyGamesOnCart = async (creditData: CreditData, token: string | null) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/purchase`,
      headers: {
        Authorization:
          token
      },
      data: {
        cardName: creditData.cardName,
        cardNumber: creditData.cardNumber.replace(/\s+/g, ""),
        cardExpiration: creditData.cardExpiration,
        cardCvv: creditData.cardCvv,
      },
    })
      .then((res) => {
        res.data
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          throwCorrectException(err)
        }
        return undefined;
      });

    return response;
  } catch (err) {
    throw err
  }
};

export const getGameFromCart = async (token: string | null) => {
  const response = await axios({
    method: "GET",
    url: `/users/current/cart`,
    headers: {
      Authorization:
        token
    },
  })
    .then((res) => {
      return res.data.games;
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        throwCorrectException(err)
      }
      return undefined;
    });
  return response;
}

export const getfee = () => {
  return 1;
};
