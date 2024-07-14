import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getInvoices } from "../services/api";
import { auth } from "../firebaseConfig";
import InvoiceList from "../components/InvoiceList";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const [user] = useAuthState(auth);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (user) {
        const token = await user.getIdToken();
        const invoices = await getInvoices(token);
        setInvoices(invoices);
      }
    };

    fetchInvoices();
  }, [user]);

  const gradientTextStyle = {
    marginLeft: "20px",
    marginTop: "20px",
    fontWeight: 'bold',
    background: 'linear-gradient(270deg, #ff7e5f, #feb47b)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    animation: 'gradient 3s ease infinite',
    backgroundSize: '400% 400%',
  };

  return (
    <div>
      <Navbar />
      <h2 style={gradientTextStyle}>Dashboard</h2>
      <InvoiceList userId={user?.uid ?? ''} />
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
