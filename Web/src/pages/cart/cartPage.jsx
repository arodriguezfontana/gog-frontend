import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cartPage.css";
import CartPageWithGames from "../../components/cart/cartPageWithGames";
import EmptyCartPage from "../../components/cart/emptyCartPage.jsx";
import { getGameFromCart } from "../../services/gamesService.js";
import { APIException } from "../../services/exceptions.js";

const CartPage = ({ authState }) => {
  const navigate = useNavigate();
  const [listGames, setListGames] = useState([]);

  const getCartGames = async () => {
    try {
      const allGames = await getGameFromCart();
      setListGames(allGames);
    } catch (err) {
      if (err instanceof APIException) {
        navigate(err.path);
      }
    }
  };

  useEffect(() => {
    if (!authState) {
      return navigate("/");
    }
    getCartGames(listGames);
  }, []);

  return (
    <>
      {listGames.length ?
        <CartPageWithGames ></CartPageWithGames>
        :
        <EmptyCartPage authState={authState}></EmptyCartPage>

      }
    </>

  );

};

export default CartPage;