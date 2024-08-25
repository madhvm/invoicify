import React, { useRef } from "react";
import html2pdf from 'html2pdf.js';

const InvoicePreview = ({
  items,
  selectedCurrency,
  subtotal,
  tax,
  discount,
  shippingFee,
  total,
  logo,
  invoiceNumber,
  dateIssued,
  dueDate,
  companyDetails,
  billTo,
  notes,
  onClose
}) => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `invoice_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 shadow-lg w-full max-w-3xl rounded-lg z-10">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div id="invoice-preview" ref={invoiceRef}>
          {/* Header */}
          <div className="grid grid-cols-2 mb-4">
            <div>
              {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="mb-4 w-32 h-auto" />}
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">Invoice</h2>
              <p>Invoice #: {invoiceNumber}</p>
              <p>Date Issued: {dateIssued}</p>
              <p>Due Date: {dueDate}</p>
            </div>
          </div>

          {/* Company & Bill To Details */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="font-bold">From:</h3>
              <p>{companyDetails}</p>
            </div>
            <div>
              <h3 className="font-bold">Bill To:</h3>
              <p>{billTo}</p>
            </div>
          </div>

        {/* Itemized List */}
        <div className="mb-4 bg-gray-100 p-4 rounded">
            <div className="grid grid-cols-12 font-bold text-gray-700 mb-2">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 items-center mb-2">
                <div className="col-span-6">{item.description}</div>
                <div className="col-span-2 text-right">{selectedCurrency.symbol}{item.rate}</div>
                <div className="col-span-2 text-right">{item.quantity}</div>
                <div className="col-span-2 text-right">{selectedCurrency.symbol}{item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="text-right mb-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-left">
                <h3 className="font-bold">Notes / Payment Terms:</h3>
                <p>{notes}</p>
              </div>
              <div>
                <p>Subtotal: {selectedCurrency.symbol}{subtotal.toFixed(2)}</p>
                <p>Tax: {selectedCurrency.symbol}{tax.toFixed(2)}</p>
                <p>Discount: -{selectedCurrency.symbol}{discount.toFixed(2)}</p>
                <p>Shipping Fee: {selectedCurrency.symbol}{shippingFee.toFixed(2)}</p>
                <p className="font-bold text-xl mt-2">Total: {selectedCurrency.symbol}{total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 pb-4">
            <p className="text-center mt-4">Thank you for your business with us!</p>
          </div>
        </div>
        <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;