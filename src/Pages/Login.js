const Login = ({ setUser }) => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-logo">NETFLIX</h1>
        <p className="login-subtitle">Welcome to your movie world</p>
        <button className="login-button" onClick={() => setUser("guest")}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;