import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user?.email;
      const userName = userEmail?.split("@")[0];

      // Redirect to Welcome page after successful login
      navigate("/welcome", { state: { userName } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input type="email" placeholder="Email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button">Sign In</button>

                <button type="button" onClick={handleLogin} style={{ color: 'black' }}>
                  <img src={GoogleSvg} alt="" />
                  Sign In with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
