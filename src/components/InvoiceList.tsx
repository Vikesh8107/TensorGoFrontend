import React, { useEffect, useState } from 'react';

interface Invoice {
  id: string;
  amount: number;
  dueDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  recipient: string;
  email: string;
  userId: string;
  recipientAccNo: number; 
  recipientBankName: string; 
}

const InvoiceList: React.FC<{ userId: string }> = ({ userId }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/invoices?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userId]);

  const convertFirestoreTimestamp = (timestamp: { _seconds: number; _nanoseconds: number }) => {
    const seconds = timestamp._seconds;
    const nanoseconds = timestamp._nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds).toLocaleDateString(); // or use toLocaleString() for more detail
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Invoices</h1>
      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <ul>
          {invoices.map(invoice => (
            <li key={invoice.id}>
              <p>Amount: ₹ {invoice.amount}</p>
              <p>Due Date: {convertFirestoreTimestamp(invoice.dueDate)}</p>
              <p>Email: {invoice.email}</p>
              <p>Recipient: {invoice.recipient}</p>
              <p>Recipient Account No: {invoice.recipientAccNo}</p>
              <p>Recipient Bank Name: {invoice.recipientBankName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
