import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
     <style>{`
  /* General Layout */
  .login-wrapper {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #0d0d0d, #1a1a2e, #0d0d0d);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
    position: relative;
  }

  /* Midnight logo in top-left corner */
  .midnight-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    font-family: 'Great Vibes', cursive;
    font-size: 2rem;
    color: #ff4c8b;
    animation: fadeIn 1s ease-out;
  }

  /* Form Styles */
  .login-form {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    padding: 2.5rem;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 0 25px rgba(255, 76, 139, 0.1);
  }

  .login-title {
    font-size: 2rem;
    font-weight: bold;
    color: #ff4c8b;
    margin-bottom: 2rem;
    text-align: center;
  }

  /* Input Fields */
  .login-input {
    width: 100%;
    padding: 0.9rem 1.2rem; /* Reduce padding to make it match the button */
    margin-bottom: 1.2rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.07);
    border: none;
    color: white;
    font-size: 1rem;
    transition: 0.3s ease;
    box-sizing: border-box; /* Ensure padding doesn't affect width */
  }

  .login-input::placeholder {
    color: #aaa;
  }

  .login-input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }

  /* Login Button */
  .login-btn {
    width: 100%;
    padding: 0.9rem 1.5rem;
    background: #ff4c8b;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s ease;
    box-sizing: border-box; /* Ensures button size is consistent */
  }

  .login-btn:hover {
    background: #e2437d;
  }

  /* Animation for logo */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 480px) {
    .login-form {
      padding: 2rem;
    }
  }
`}</style>


      <div className="login-wrapper">
        <div className="midnight-logo">Midnight</div> {/* Midnight Logo */}

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="login-form"
          onSubmit={handleLogin}
        >
          <h2 className="login-title">Login</h2>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">Login</button>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
