// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// syles
import "./authCard.css";
// services
import { registerUser } from "../../services/userService";
// exceptions
import { BadRequestException, APIException } from "../../services/exceptions";

const RegisterCard = ({ authState }) => {
  const navigate = useNavigate();
  const { setUser } = authState;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    backgroundImage: ""
  });

  function changeForm(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function validateForm() {
    const { username, email, password, image, backgroundImage } = formData;

    if (username === "") {
      toast.error("Please put a email");
      return false;
    }

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

    const urlRegex = /^(ftp|http|https):\/\/[^\s"]+$/;
    if (!urlRegex.test(image)) {
      toast.error("Please enter a valid image url");
      return false;
    }
    if (!urlRegex.test(backgroundImage)) {
      toast.error("Please enter a valid background image url");
      return false;
    }

    return true;
  }

  async function sendForm(e) {
    try {
      e.preventDefault();
      if (!validateForm()) return;

      const { username, email, password, image, backgroundImage } = formData;
      const user = await registerUser(username, email, password, image, backgroundImage);
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
    <div className='auth-card' id='register-card'>
      <div className='auth-card-container'>
        <div className='logo-title-container'>
          <img className="logo-in-auth" src="/src/assets/gog-icon.svg" alt="Gog.com Icon" />
          <h2>SIGN-UP</h2>
        </div>
        <form action="" className='auth-form'>
          <input className="auth-inputs" placeholder="Username" type="text" name='username' onChange={e => changeForm(e)} />
          <input className="auth-inputs" placeholder="Email" type="email" name='email' onChange={e => changeForm(e)} />
          <input className="auth-inputs" placeholder="Password" type="password" name='password' onChange={e => changeForm(e)} />
          <input className="auth-inputs" placeholder="Image" type="url" name='image' onChange={e => changeForm(e)} />
          <input className="auth-inputs" placeholder="Background image" type="url" name='backgroundImage' onChange={e => changeForm(e)} />
          <section className='auth-requirements-container'>
            <p className='auth-requirements'> <span> ? </span> Password validation requirements</p>
            <div className='modal-requirements'>
              <ul>
                <li>Must have min. 1 characters</li>
                <li>Must contain at least 1 letter</li>
                <li>Cannot match the list of 500 most insecure password</li>
              </ul>
            </div>
          </section>
          <p className='auth-terms'>
            By signing up you acknowledge you are 16 or older and accept <strong>
              <a href="https://support.gog.com/hc/en-us/sections/115000136785-GOG-com-Policies?product=gog">
                GOG User Agreement & Privacy Policy
              </a>
            </strong>.
          </p>
          <button className='auth-button' onClick={e => sendForm(e)}>
            SIGN UP NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
