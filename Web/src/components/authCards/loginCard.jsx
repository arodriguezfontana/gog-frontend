// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// syles
import "./authCard.css";
import { loginUser } from "../../services/userService.js";
// exceptions
import { APIException, BadRequestException } from "../../services/exceptions";

const LoginCard = ({ authState }) => {
  const navigate = useNavigate();
  const { setUser } = authState;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function changeForm(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function validateForm() {
    const { email, password } = formData;
    if (email === "") {
      toast.error("Please put a email");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (password === "") {
      toast.error("Please put a password");
      return false;
    }

    return true;
  }

  async function sendForm(e) {
    try {
      e.preventDefault();
      if (!validateForm()) return;

      const { email, password } = formData;
      const user = await loginUser(email, password);
      setUser(user);
      navigate("/");
    } catch (err) {
      if (err instanceof BadRequestException) {
        toast.error(err.message);
        return;
      }
      if (err instanceof APIException) {
        toast.error("Something went wrong, please try again later");
        navigate(err.path);
      }
    }
  }

  return (
    <div className='auth-card' id='login-card'>
      <div className='auth-card-container'>
        <div className='logo-title-container'>
          <img className="logo-in-auth" src="/src/assets/gog-icon.svg" alt="Gog.com Icon" />
          <h2>LOG IN</h2>
        </div>
        <form action="" className='auth-form' id='login-form'>
          <input className="auth-inputs" placeholder="Email" type="email" name='email' onChange={e => changeForm(e)} />
          <input className="auth-inputs" placeholder="Password" type="password" name='password' onChange={e => changeForm(e)} />
          <button className='auth-button' onClick={e => sendForm(e)}>
            LOG IN NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
