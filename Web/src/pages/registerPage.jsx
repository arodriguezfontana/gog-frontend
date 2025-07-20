import RegisterCard from "../components/authCards/registerCard.jsx";
import AuthCardLayout from "../layouts/authPage/AuthCardLayout.jsx";

const RegisterPage = ({ authState }) => {
  return (
    <AuthCardLayout>
      <RegisterCard authState={authState}></RegisterCard>
    </AuthCardLayout>
  );
};

export default RegisterPage;
