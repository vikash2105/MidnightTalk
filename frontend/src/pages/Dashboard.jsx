import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const baseActions = [];

    if (role === "speaker") {
      baseActions.push({
        label: "Start a Session",
        path: "/session",
      });
    } else if (role === "listener") {
      baseActions.push({
        label: "Join a Session",
        path: "/session",
      });
    } else if (role === "admin") {
      baseActions.push(
        { label: "Approve KYC", path: "/admin/kyc" },
        { label: "Reports & Sessions", path: "/admin/reports" },
        { label: "Manage Listeners", path: "/admin/listeners" }
      );
    }

    baseActions.push({ label: "Logout", path: "/logout" });
    setActions(baseActions);
  }, [role]);

  const handleClick = (path) => {
    if (path === "/logout") {
      localStorage.clear();
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #0d0d0d, #1a1a2e, #0d0d0d);
          color: white;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 3rem 1rem;
        }

        .dashboard-heading {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .dashboard-sub {
          color: #aaa;
          max-width: 600px;
          margin-bottom: 3rem;
          text-align: center;
        }

        .card-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 1.5rem 2rem;
          min-width: 220px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s ease;
          box-shadow: 0 0 15px rgba(255, 76, 139, 0.07);
        }

        .card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-3px);
          box-shadow: 0 0 25px rgba(255, 76, 139, 0.15);
        }

        .card-label {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .dashboard-role {
          color: #ff4c8b;
        }
      `}</style>

      <div className="dashboard-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="dashboard-heading">
            Welcome, <span className="dashboard-role">{role}</span>!
          </h1>
          <p className="dashboard-sub">
            Hello {user.name || role}, manage your MidnightTalk journey from here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-grid"
        >
          {actions.map((item, idx) => (
            <div key={idx} className="card" onClick={() => handleClick(item.path)}>
              <div className="card-label">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
