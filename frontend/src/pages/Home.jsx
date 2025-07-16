import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ShieldCheck, Moon } from "lucide-react";
import "./Home.css"; // 👈 Include the styles

export default function Home() {
  return (
    <div className="home-container">
      {/* Glow Blobs */}
      <div className="glow pink"></div>
      <div className="glow purple"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="content-wrapper"
      >
        <h1 className="main-heading">MidnightTalk 🌙</h1>
        <p className="subheading">
          Swipe into deep emotional connections. Talk, vent, feel — no judgment, no names.
        </p>

        <div className="buttons">
          <Link to="/login"><button className="btn primary">Log In</button></Link>
          <Link to="/register"><button className="btn secondary">Sign Up</button></Link>
        </div>

        <div className="features">
          <Feature icon={<Flame size={36} />} title="Real Conversations" desc="No small talk. Dive deep with strangers who understand." />
          <Feature icon={<ShieldCheck size={36} />} title="Anonymous & Safe" desc="No identity. No judgment. Just support and empathy." />
          <Feature icon={<Moon size={36} />} title="Night-Mode First" desc="Built for quiet nights, late thoughts, and deep feelings." />
        </div>

        <footer className="footer">© 2025 MidnightTalk. All rights reserved.</footer>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
