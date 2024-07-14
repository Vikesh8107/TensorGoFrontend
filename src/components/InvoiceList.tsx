import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
        const response = await fetch(
          `http://localhost:5000/api/invoices?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const convertFirestoreTimestamp = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }) => {
    const seconds = timestamp._seconds;
    const nanoseconds = timestamp._nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds).toLocaleDateString(); // or use toLocaleString() for more detail
  };

  const downloadPDF = (invoice: Invoice) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 105, 20, { align: "center" });

    // Add subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice ID: ${invoice.id}`, 105, 30, { align: "center" });

    // Add a line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Define the data to be displayed in the table
    const data = [
      ["Amount", `₹ ${invoice.amount}`],
      ["Due Date", convertFirestoreTimestamp(invoice.dueDate)],
      ["Email", invoice.email],
      ["Recipient", invoice.recipient],
      ["Recipient Account No", invoice.recipientAccNo],
      ["Recipient Bank Name", invoice.recipientBankName],
    ];

    // Add table
    autoTable(doc, {
      startY: 40,
      head: [["Field", "Details"]],
      body: data,
      headStyles: { fillColor: [71, 65, 165], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
      styles: { cellPadding: 3 },
    });

    // Add footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Thank you for your business!",
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Invoices</h1>
      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <ul className="inv-ul">
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              style={{
                marginBottom: "20px",
                position: "relative",
                paddingRight: "950px",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginLeft: "100px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                    marginRight: "200px",
                    paddingRight: "50px",
                  }}
                >
                  <span style={{marginRight: "30px"}}>Amount: </span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    ₹ {invoice.amount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                  }}
                >
                  <span style={{marginRight: "23px"}}>Due Date:</span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {convertFirestoreTimestamp(invoice.dueDate)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                  }}
                >
                  <span style={{marginRight: "52px"}}>Email:</span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {invoice.email}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                  }}
                >
                  <span style={{marginRight: "20px"}}>Recipient:</span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {invoice.recipient}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                  }}
                >
                  <span style={{marginRight: "20px"}}>Recipient Account No:</span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {invoice.recipientAccNo}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    
                    fontWeight: "bold",
                    color: "darkpurple",
                    fontSize: "16px",
                  }}
                >
                  <span style={{marginRight: "20px"}}>Recipient Bank Name:</span>
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {invoice.recipientBankName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => downloadPDF(invoice)}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "8px 16px",
                  background: "linear-gradient(to right, #ff0000, #800000)",
                  color: "#fff",
                  borderRadius: "8px",
                  transition: "background 0.3s ease-in-out",
                  marginRight: "200px", // Adjustable margin on the right
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#800000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(to right, #ff0000, #800000)")
                }
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
