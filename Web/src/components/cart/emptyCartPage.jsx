import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartLayout from "../../layouts/cartPage/cartLayout";
import "./emptyCartPage.css";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

const EmptyCartPage = ({ authState }) => {
  const { user } = authState;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  const clickHandler = () => {
    if (user) {
      navigate("/");
      return;
    }
    navigate("/login");
  };

  if (loading) {
    return (<Spinner />);
  }

  return (<>
    {loading ?
      (<Spinner />)
      :
      (
        <CartLayout
          mainSection={
            <div className="emptyCartPage">
              <div className="iconEmptyCart"></div>
              <h1> Start by adding a game! </h1>

              <div className="add-games-button-container">
                <Button handleClick={clickHandler} buttonColor={"green"}>
                  Add games
                </Button>
              </div>
            </div>

          }
          asideSection={
            <div className="asideEmptyCart">
              <h1>Here you will see your cart total amount</h1>
            </div>

          }

        />
      )}
  </>);

};

export default EmptyCartPage;
