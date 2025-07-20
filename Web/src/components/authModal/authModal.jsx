import "./authModal.css";
import Button from "../button/button.jsx";

const AuthModal = () => {
  return (
    <div className='auth-modal'>
      <section className='auth-modal-buttons-container'>
        <Button buttonColor={"green"} path={"/register"} >
          <p className='auth-modal-button-text'>CREATE ACCOUNT</p>
        </Button>

        <Button buttonColor={"violet"} path={"/login"}>
          <p className='auth-modal-button-text' id='sign-in-button'>SIGN IN</p>
        </Button>
      </section>
      <div className="auth-modal-img-container">
        <img src="src/assets/images/auth-modal-bg.png" alt="Some of our games" id='show-games' />
      </div>

      <section className='auth-modal-text-container'>
        <div className='auth-modal-text-content-wrapper'>
          <p className='auth-modal-text'>
            <strong>
              GOG.com is a digital distribution platform - an online store with a curated selection of games, an optional gaming client giving you freedom of choice, and a vivid community of gamers.
            </strong> All of this born from a deeply rooted love for games, utmost care about customers, and a belief that you should own the things you buy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AuthModal;