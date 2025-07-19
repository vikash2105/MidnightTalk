import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "speaker" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/register', form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <>
      <style>{`
        /* General Page Style */
.register-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0d0d0d, #1a1a2e, #0d0d0d);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  color: white;
}

/* "Midnight" Logo */
.midnight-logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-family: 'Great Vibes', cursive;
  font-size: 2.5rem;
  color: #ff4c8b;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}

/* Form Style */
.register-form {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 0 25px rgba(255, 76, 139, 0.1);
}

/* Register Title */
.register-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ff4c8b;
  margin-bottom: 2rem;
  text-align: center;
}

/* Input Fields */
.register-input, .register-select {
  width: 100%;
  padding: 0.9rem 1.2rem; /* Adjusted padding to match the button height */
  margin-bottom: 1.2rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid #ff4c8b;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box; /* Ensures the padding does not affect the width */
}

.register-input::placeholder {
  color: #aaa;
}

.register-input:focus {
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  border-color: #ff4c8b;
}

/* Select Dropdown */
.register-select {
  background: rgba(255, 255, 255, 0.07);
  color: #ccc;
  border: 1px solid #ff4c8b;
}

/* Register Button Style */
.register-btn {
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
  box-sizing: border-box; /* Ensures the button width remains the same */
}

.register-btn:hover {
  background: #e2437d;
}

@media (max-width: 480px) {
  .register-form {
    padding: 2rem;
  }
}

      `}</style>

      <div className="register-wrapper">
        {/* Midnight Logo */}
        <div className="midnight-logo">Midnight</div>

        {/* Register Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="register-form"
        >
          <h2 className="register-title">Create Account ✨</h2>

          <input
            type="text"
            className="register-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="register-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="speaker">Speaker</option>
            <option value="listener">Listener</option>
          </select>

          <button type="submit" className="register-btn">Register</button>
        </motion.form>
      </div>
    </>
  );
};

export default Register;
