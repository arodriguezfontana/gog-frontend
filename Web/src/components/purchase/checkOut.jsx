import { useEffect, useState } from "react";
import "./checkout.css";
import ButtonCartLayout from "../../layouts/buttonCartLayout/buttonCartLayout";
import { getGameFromCart, getfee } from "../../services/gamesService";

const Checkout = ({ show, showBuyButton, fnButton }) => {

  const [pricing, setPricing] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [fee, setFee] = useState(0);
  const [listGames, setListGames] = useState([]);

  const getGamesAndCalculate = async () => {
    const allGames = await getGameFromCart();
    const fee = getfee();
    setFee(fee);
    setListGames(allGames);
    sumGames(allGames);
    calculateFee(fee);
  };

  const sumGames = (games) => {

    let totalSum = 0;
    games.forEach((game) => {
      totalSum += game.price.amount;
    });
    setPricing(totalSum);
  };

  const calculateFee = (fee) => {
    let partialFee = pricing * (fee / 100);
    setTotalFee(partialFee);
  };

  useEffect(() => {
    getGamesAndCalculate();
  }, [pricing, fee]);

  if (!show) return <></>;

  return (
    <div className="checkout">

      <div className="detailsCart">
        <h3>Checkout</h3>
        <table className="table">
          <tbody>
            <tr className="row">
              <th>products({listGames.length})</th>
              <th>${pricing.toFixed(2)}</th>
            </tr>
            <tr className="row">
              <th>fee {fee}%</th>
              <th>${totalFee.toFixed(2)}</th>
            </tr>
            <tr className="total">
              <th>Total</th>
              <th>${(pricing + totalFee).toFixed(2)}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buyButton">
        <ButtonCartLayout
          text="Buy"
          func={fnButton}
          show={showBuyButton} />
      </div>
    </div>

  );
};

export default Checkout;