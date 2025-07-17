import React from "react";

const Earnings = () => {
  const earnings = [
    { date: "2025-07-15", amount: 120 },
    { date: "2025-07-12", amount: 80 },
    { date: "2025-07-10", amount: 200 },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Earnings</h1>
      <ul>
        {earnings.map((e, i) => (
          <li key={i} className="mb-2">
            <span>{e.date} — ₹{e.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Earnings;
