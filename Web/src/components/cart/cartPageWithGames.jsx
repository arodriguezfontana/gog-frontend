import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cartPageWithGames.css";
import CartLayout from "../../layouts/cartPage/cartLayout.jsx";
import GameCardListLayout from "../../layouts/gameCardListLayout/gameCardListLayout.jsx";
import { getGameFromCart } from "../../services/gamesService";
import Checkout from "../purchase/checkOut.jsx";
import toast from "react-hot-toast";
// exceptions
import { UnauthorizedException, BadRequestException } from "../../services/exceptions.js";

const CartPageWithGames = ({ authState }) => {

  const navigate = useNavigate();
  const [listGames, setListGames] = useState([]);

  const getCartGames = async () => {
    try {
      const allGames = await getGameFromCart();
      setListGames(allGames);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        toast.error("You need to log in first");
        navigate("/login");
      }
      if (err instanceof BadRequestException) {
        toast.error("We couldn’t load the games in your cart. Please try again shortly.");
      }
    }
  };

  const fnBuyButton = (e) => {
    e.preventDefault();
    navigate("/purchase");
  };

  useEffect(() => {
    if (authState) {
      return navigate("/");
    }
    getCartGames();
  }
    , []);

  return (<>

    <CartLayout
      mainSection={
        <div className="cartPageWithGames">
          {listGames.map(game => {
            return (
              <GameCardListLayout key={game.id} card={game} showTitle={false}>
                <h3>{game.name}</h3>
              </GameCardListLayout>

            );

          })}

        </div>
      }
      asideSection={
        <Checkout showBuyButton={true} show={true} fnButton={fnBuyButton} />
      }

    />

  </>);

};

export default CartPageWithGames;
