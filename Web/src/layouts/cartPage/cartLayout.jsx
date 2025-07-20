import "./cartLayout.css";
const CartLayout = ({mainSection, asideSection}) => {

  return (
    <div className="cartPageMain">

      <section className="mainSection">
        {mainSection}
      </section>

      <section className="asideSection">
        {asideSection}
      </section>

    </div>
  );
};
export default CartLayout;