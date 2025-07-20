import "./price.css";

function roundTo(num, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(num * factor) / factor;
}

const Price = ({ card }) => {
  if (!card.price) return <></>;

  const { price } = card;
  if (!price || !price.amount || !price.currency) {
    return <p>{price}</p>;
  }

  const { amount, currency } = price;
  return (
    <div className='price-container'>
      <p>{currency}</p>
      <p>{roundTo(amount, 2)}</p>
    </div>
  );
};

export default Price;
