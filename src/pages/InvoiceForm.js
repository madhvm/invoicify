import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
import currencySymbols from '../components/currencySymbols';
import InvoicePreview from './InvoicePreview';


const currencyOptions = Object.keys(currencySymbols).map((code) => ({
  value: code,
  label: `${code} (${currencySymbols[code]})`,
  symbol: currencySymbols[code],
}));

const InvoiceForm = () => {
  const [items, setItems] = useState([{ description: '', rate: '', quantity: 1, amount: 0 }]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState('0');
  const [discount, setDiscount] = useState('0');
  const [shippingFee, setShippingFee] = useState('0');
  const [total, setTotal] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  // Additional state for form details
  const [logo, setLogo] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dateIssued, setDateIssued] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [companyDetails, setCompanyDetails] = useState('');
  const [billTo, setBillTo] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const newSubtotal = items.reduce((acc, item) => acc + item.amount, 0);
    const parsedTax = parseFloat(tax) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedShippingFee = parseFloat(shippingFee) || 0;

    setSubtotal(newSubtotal);
    setTotal(newSubtotal + parsedTax - parsedDiscount + parsedShippingFee);
  }, [items, tax, discount, shippingFee]);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', rate: '', quantity: 1, amount: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = items.map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item, [field]: value };

        if (field === 'rate' || field === 'quantity') {
          updatedItem.amount = updatedItem.rate * updatedItem.quantity;
        }

        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    const allFieldsFilled = items.every(item => item.description && item.rate && item.quantity);
    if (!allFieldsFilled) {
      alert('Please fill all item fields.');
      return;
    }
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg">
      {previewVisible ? (
        <InvoicePreview
          items={items}
          selectedCurrency={selectedCurrency}
          subtotal={subtotal}
          tax={parseFloat(tax)}
          discount={parseFloat(discount)}
          shippingFee={parseFloat(shippingFee)}
          total={total}
          logo={logo}
          invoiceNumber={invoiceNumber}
          dateIssued={dateIssued}
          dueDate={dueDate}
          companyDetails={companyDetails}
          billTo={billTo}
          notes={notes}
          onClose={handleClosePreview}  // Pass the close handler to the modal
        />
      ) : (
        <form onSubmit={handleGenerateInvoice}>
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700">Logo</label>
              <input
                type="file"
                className="border-dashed border-2 border-gray-300 p-2 rounded"
                onChange={(e) => setLogo(e.target.files[0])}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Invoice Number</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded"
                placeholder="#001212"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* More Form Fields */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="text-gray-700">Your Company Details</label>
              <textarea
                className="border border-gray-300 p-2 rounded"
                placeholder="Your company details"
                rows="3"
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Bill To</label>
              <textarea
                className="border border-gray-300 p-2 rounded"
                placeholder="Customer details"
                rows="3"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="text-gray-700">Date Issued</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Due Date</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Currency</label>
              <Select
                options={currencyOptions}
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Item List Section */}
          <div className="mt-6 bg-zinc-200 rounded p-4 overflow-y-auto">
            <div className="flex mb-2 font-bold text-gray-700 text-center ">
              <div className="w-[45%]">Item</div>
              <div className="w-[18%]">Rate</div>
              <div className="w-[17%]">Qty</div>
              <div className="w-[21%]">Amount</div>
            </div>
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4 items-center">
                <input
                  type="text"
                  placeholder="Item Description"
                  className="w-1/2 border border-gray-300 p-2 rounded"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange(index, 'description', e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Rate"
                  className="w-1/5 border border-gray-300 p-2 rounded"
                  value={item.rate}
                  onChange={(e) =>
                    handleInputChange(index, 'rate', e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-1/10 border border-gray-300 p-2 rounded"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(index, 'quantity', e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-1/5 border border-gray-300 p-2 rounded"
                  value={item.amount}
                  readOnly
                />
                <IoMdClose
                  className="text-red-500 cursor-pointer items-center"
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            ))}
            <div className='flex justify-center items-center'>
              <button
                type="button"
                className="mt-4 text-blue-500"
                onClick={handleAddItem}
              >
                <h1 className='bg-blue-600 rounded-xl w-10 px-2 py-1 text-white items-center'>+</h1>
              </button>
            </div>
          </div>

          {/* Additional Charges and Total Section */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-gray-700">Notes / Payment Terms</label>
              <textarea
                className="border border-gray-300 p-2 rounded w-full"
                rows="4"
                placeholder="Payment is due within 15 days"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{selectedCurrency.symbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Tax</span>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-24 text-right"
                  placeholder="0.00"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between mt-2">
                <span>Discount</span>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-24 text-right"
                  placeholder="0.00"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping Fee</span>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-24 text-right"
                  placeholder="0.00"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>{selectedCurrency.symbol}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InvoiceForm;