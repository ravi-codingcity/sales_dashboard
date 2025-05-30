import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoCloseOutline,
  IoBusinessOutline,
  IoPersonOutline,
  IoCashOutline,
  IoTimeOutline,
  IoDocumentTextOutline,
  IoCheckmarkCircleOutline,
  IoSaveOutline
} from 'react-icons/io5';

function AddSaleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    customerName: '',
    sale: '',
    meetingTime: '',
    remark: '',
    meetingStatus: ''
  });

  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Hold', label: 'Hold' },
    { value: 'Successful', label: 'Success' },
    { value: 'Cancel', label: 'Cancel' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (!formData.sale.trim()) {
      newErrors.sale = 'Sale amount is required';
    } else if (isNaN(formData.sale.replace(/[$,]/g, ''))) {
      newErrors.sale = 'Please enter a valid amount';
    }
    
    if (!formData.meetingTime.trim()) {
      newErrors.meetingTime = 'Meeting time is required';
    }
    
    if (!formData.meetingStatus) {
      newErrors.meetingStatus = 'Meeting status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission here
      console.log('Sale form submitted:', formData);
      onClose();
      setFormData({
        companyName: '',
        customerName: '',
        sale: '',
        meetingTime: '',
        remark: '',
        meetingStatus: ''
      });
      setErrors({});
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatSaleAmount = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (numericValue) {
      const number = parseFloat(numericValue);
      if (!isNaN(number)) {
        return '$' + number.toLocaleString();
      }
    }
    return value;
  };

  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'sale' ? formatSaleAmount(value) : value;
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <IoCashOutline className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white">New Sale</h3>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoCloseOutline className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Compact Form */}
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Two Column Layout for Company and Customer */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    <IoBusinessOutline className="inline h-3 w-3 mr-1" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.companyName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    <IoPersonOutline className="inline h-3 w-3 mr-1" />
                    Customer
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.customerName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Customer name"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>
                  )}
                </div>
              </div>

              {/* Two Column Layout for Sale and Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    <IoCashOutline className="inline h-3 w-3 mr-1" />
                    Sale Amount
                  </label>
                  <input
                    type="text"
                    name="sale"
                    value={formData.sale}
                    onChange={handleSaleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.sale ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="$10,000"
                  />
                  {errors.sale && (
                    <p className="mt-1 text-xs text-red-600">{errors.sale}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    <IoCheckmarkCircleOutline className="inline h-3 w-3 mr-1" />
                    Status
                  </label>
                  <select
                    name="meetingStatus"
                    value={formData.meetingStatus}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.meetingStatus ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.meetingStatus && (
                    <p className="mt-1 text-xs text-red-600">{errors.meetingStatus}</p>
                  )}
                </div>
              </div>

              {/* Meeting Time - Full Width */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <IoTimeOutline className="inline h-3 w-3 mr-1" />
                  Meeting Time
                </label>
                <input
                  type="datetime-local"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.meetingTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.meetingTime && (
                  <p className="mt-1 text-xs text-red-600">{errors.meetingTime}</p>
                )}
              </div>

              {/* Compact Remark */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <IoDocumentTextOutline className="inline h-3 w-3 mr-1" />
                  Remark (Optional)
                </label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Compact Action Buttons */}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex items-center px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoSaveOutline className="h-3 w-3 mr-1" />
                  Save Sale
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AddSaleModal;
