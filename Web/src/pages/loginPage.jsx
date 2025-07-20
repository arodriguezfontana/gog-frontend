import AuthCardLayout from "../layouts/authPage/AuthCardLayout.jsx";
import LoginCard from "../components/authCards/loginCard.jsx";

const LoginPage = ({ authState }) => {
  return (
    <AuthCardLayout>
      <LoginCard authState={authState}></LoginCard>
    </AuthCardLayout>
  );
};

export default LoginPage;
