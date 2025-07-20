import "./AuthCardLayout.css";
const AuthCardLayout = ({ children }) => {
  return (
    <div className='auth-card-layout'>
      <div className='auth-card-wrapper'>
        {children}
      </div>
    </div>
  );
};

export default AuthCardLayout;
