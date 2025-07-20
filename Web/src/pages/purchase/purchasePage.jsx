import "./purchasePage.css";
import { useEffect, useState } from "react";
import CreditData from "../../components/purchase/creditData";
import Checkout from "../../components/purchase/checkOut";
import { useNavigate } from "react-router-dom";
import CartLayout from "../../layouts/cartPage/cartLayout";
import { getGameFromCart, getfee } from "../../services/gamesService";
import { APIException } from "../../services/exceptions";
import Spinner from "../../components/spinner/spinner";

const PurchasePage = ({ authState }) => {

  const { user } = authState;
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [fee, setFee] = useState(0);

  const getCartGames = async () => {
    try {
      const allGames = await getGameFromCart();
      setGames(allGames);
    } catch (err) {
      if (err instanceof APIException) {
        navigate(err.path);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    getCartGames();
    setFee(getfee());
  }, [fee]);

  if (!user) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <CartLayout
        mainSection={
          <CreditData games={games} />
        }
        asideSection={
          <Checkout showBuyButton={false} show={true} />
        }
      />

    </>
  );
};

export default PurchasePage;
