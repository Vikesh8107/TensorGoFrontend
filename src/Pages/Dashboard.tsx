import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getInvoices } from '../services/api';
import { auth } from '../firebaseConfig';
import InvoiceList from '../components/InvoiceList';

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

  return (
    <div>
      <h1>Dashboard</h1>
      <InvoiceList userId={user?.uid ?? ''} />
    </div>
  );
};

export default Dashboard;
