import axios from "axios";
import { getUser } from "./token";
import { throwCorrectException } from "./helper";

export const getRecommendedGames = async () => {
  try {
    return await axios.get("api/games/recommended");
  } catch (error) {
    throwCorrectException(error);
  }
};

export const getGames = async (pageNumber = 1) => {
  try {
    return await axios.get(`api/games?page=${pageNumber}`);
  } catch (error) {
    throwCorrectException(error);
  }
};

export const getGameById = async (gameId) => {
  return axios.get(`/api/games/${gameId}`)
    .then((res) => res.data)
    .catch((err) => {
      throwCorrectException(err);
    });
};

export const putAddGameToCart = async (gameId) => {
  try {
    const currentUser = getUser();
    const res = await axios.put(`/api/games/${gameId}`, {}, {
      headers: {
        authorization: currentUser.token
      }
    });
    return res;
  } catch (err) {
    throwCorrectException(err);
  }
};

export const putAddReviewToGame = async (gameId, reviewData) => {
  try {
    const currentUser = getUser();
    const res = await axios.put(`/api/games/${gameId}/reviews`, reviewData, {
      headers: {
        authorization: currentUser.token
      }
    });
    return res;
  } catch (err) {
    throwCorrectException(err);
  }
};

export const buyGamesOnCart = async (creditData) => {
  try {
    const currentUser = getUser();

    const response = await axios({
      method: "POST",
      url: "api/purchase",
      headers: {
        Authorization:
          currentUser.token
      },
      data: {
        cardName: creditData.get("cardName"),
        cardNumber: creditData.get("cardNumber").replace(/\s+/g, ""),
        cardExpiration: creditData.get("cardExpiration"),
        cardCvv: creditData.get("cardCvv"),
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throwCorrectException(err);
      });

    return response;
  } catch (err) {
    throwCorrectException(err);
  }
};

export const getGameFromCart = async () => {
  const currentUser = getUser();
  const response = await axios({
    method: "GET",
    url: "api/users/current/cart",
    headers: {
      Authorization:
        currentUser.token
    },
  })
    .then((res) => {
      return res.data.games;
    })
    .catch((err) => {
      throwCorrectException(err);
    });
  return response;
};

export const getfee = () => {
  return 1;
};
