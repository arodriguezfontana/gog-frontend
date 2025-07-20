// styles
import "./navBar.css";
// components
import { NavLink, Link } from "react-router-dom";
import HoverModalLayout from "../../layouts/hoverModal/hoverModalLayout.jsx";
import AuthModal from "../authModal/authModal.jsx";
import Search from "../search/search.jsx";
// hooks
import { useNavigate } from "react-router-dom";

const NavBar = ({ authState }) => {
  const { user } = authState;

  const navigate = useNavigate();
  return (
    <nav className="nav-bar">
      <section>
        <ul className="navbar-ul">
          <li className="navbar-li">
            <Link to="/">
              <img
                id="logo-navbar"
                className="logo"
                src="/src/assets/images/gog-icon.png"
                alt="Gog.com Icon"
              />
            </Link>
          </li>
          <li className="navbar-li" onClick={window.scrollTo(0, 0)}>
            <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
              STORE
            </NavLink>
          </li>
          <li className="navbar-li" onClick={window.scrollTo(0, 0)}>
            <NavLink to="/library" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
              LIBRARY
            </NavLink>
          </li>
        </ul>
      </section>

      <section>
        <Search>
        </Search>
      </section>

      <section>
        <ul className="navbar-ul">
          <li className="navbar-li" id="navbar-li-sign-in">
            {user ? (
              <img src="/src/assets/icons/carrito.svg" alt="Cart" id="cart" onClick={() => navigate("/cart")} />
            ) : (
              <HoverModalLayout title="SIGN IN" authState={authState} colorText={"violet"}>
                <AuthModal authState={authState} />
              </HoverModalLayout>
            )}
          </li>
        </ul>
      </section>
      <img
        className="violet-line"
        src="src/assets/images/bg.webp"
        alt="Violet Line"
      />
    </nav >
  );
};

export default NavBar;
