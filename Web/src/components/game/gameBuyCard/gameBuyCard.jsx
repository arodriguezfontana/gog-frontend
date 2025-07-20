import "./gameBuyCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../../button/button.jsx";
import { putAddGameToCart } from "../../../services/gamesService";

const GameBuyCard = ({ name, amount, currency, user, game }) => {

  let roundedAmount = parseFloat(amount).toFixed(2);

  const navigate = useNavigate();

  const clickLoginHandler = () => {
    navigate("/login");
  };

  const clickAddToCartHandler = async () => {
    try {
      await putAddGameToCart(game.id);
      toast.success(`${game.name} has been added to the cart successfully!`, {
        position: "top-center"
      });
    } catch (_) {
      toast.error(`An error occurred while adding ${game.name} to the cart!`, {
        position: "top-center"
      });
    }
  };

  return (
    <div className="buy-card">
      <p><strong>Buy {name}</strong></p>
      <div className="izq-content">
        <p><strong>{currency}</strong></p>
        <p><strong>{roundedAmount}</strong></p>
        <div className="button-add-to-cart-container">
          <Button handleClick={user ? clickAddToCartHandler : clickLoginHandler} buttonColor={"green"}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameBuyCard;