import { BadRequestException } from "../../services/exceptions";
import { useState } from "react";
import "./creditData.css";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ButtonCartLayout from "../../layouts/buttonCartLayout/buttonCartLayout";

import { buyGamesOnCart } from "../../services/gamesService";

const CreditData = () => {

  const navigate = useNavigate();

  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({
    "cardName": "",
    "cardNumber": "",
    "cardCvv": "",
    "cardExpiration": ""
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const submitHandle = async (form) => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await buyGamesOnCart(form);
      toast.success("Purchase completed successfully");
      navigate("/library");
    } catch (error) {
      const newErrors = {};
      if (error instanceof BadRequestException) {
        newErrors["errorGeneral"] = error.message;
        setError(newErrors);
      } else {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setError(newErrors);
      }
    }
  };

  const validationSchema = Yup.object({
    cardName: Yup.string()
      .required("Required field")
      .min(8, "Must be at least 8 characters"),

    cardNumber: Yup.string()
      .required("Required field")
      .min(16, "Length must be 16 characters")
      .max(19),

    cardCvv: Yup.string()
      .required("Required field")
      .min(3, "Must be exactly 3 digits")
      .max(3, "Must be exactly 3 digits"),

    cardExpiration: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format")
  });

  return (

    <div className="containerCreditData">
      <form className="formCreditData" action={submitHandle}>
        <div className="cardData">
          <label htmlFor="cardName">CARD HOLDER NAME</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            id="cardName"
            placeholder="Nombre"
            onChange={handlerChange}
          />
          {errors.cardName && <div className="errors">{errors.cardName}</div>}
        </div>
        <div className="cardData">
          <label htmlFor="cardNumber">NUMBER</label>
          <input
            type="text"
            id="cardNumber"
            value={formData.cardNumber}
            name="cardNumber"
            placeholder="9999 9999 9999 9999"
            onChange={handlerChange}
          />
          {errors.cardNumber && <div className="errors"> {errors.cardNumber}</div>}
        </div>
        <div className="cardData">
          <label htmlFor="cardCvv">CVV</label>
          <input
            id="cardCvv"
            type="text"
            value={formData.cardCvv}
            name="cardCvv"
            placeholder="999"
            onChange={handlerChange}
          />
          {errors.cardCvv && <div className="errors"> {errors.cardCvv}</div>}
        </div>
        <div className="cardData">
          <label htmlFor="cardExpiration">EXPIRATION DATE</label>
          <input
            type="text"
            value={formData.cardExpiration}
            id="cardExpiration"
            name="cardExpiration"
            placeholder="MM/YY"
            onChange={handlerChange}
          />
          {errors.cardExpiration && <div className="errors"> {errors.cardExpiration}</div>}
        </div>
        <div className="cardData">
          <ButtonCartLayout
            text="Buy"
            type="submit"
            show={true} />
        </div>
        <div>
          {errors.errorGeneral && <div className="errors"> {errors.errorGeneral}</div>}
        </div>
      </form>
    </div>);
};
export default CreditData;
