import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoFilterOutline, 
  IoArrowDownOutline, 
  IoEllipsisVerticalOutline, 
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoDownloadOutline
} from 'react-icons/io5';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Change to explicit import

function ProductTable({ selectedItems, setSelectedItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // Dummy product data based on the image
  const products = [
    { id: 1, clients: 'Microsoft', person: 'Mr. Rakesh', shipment: '2', sale: '$376,329', date: "12/05/2025", status: 'Successful', rating: 5.0 },
    { id: 2, clients: 'Tata', person: 'Mr. Makesh', shipment: '5', sale: '$200,598', date: "12/05/2025", status: 'Cancel', rating: 5.0 },
    { id: 3, clients: 'Mahindra', person: 'Mr. Singh', shipment: '4', sale: '$125,125', date: "16/05/2025", status: 'Hold', rating: 4.9 },
    { id: 4, clients: 'KPMG', person: 'Mr. Mohan', shipment: '2', sale: '$35,550', date: "04/05/2025", status: 'Successful', rating: 4.8 },
    { id: 5, clients: 'Infosis', person: 'Mr. Sharma', shipment: '3', sale: '$67,000', date: "25/05/2025", status: 'Cancel', rating: 4.8 },
    { id: 6, clients: 'CEAT', person: 'Mr. Ishwar', shipment: '1', sale: '$48,430.25', date: "19/05/2025", status: 'Hold', rating: 5.0 },
    { id: 7, clients: 'Maruti', person: 'Mr. Santosh', shipment: '3', sale: '$43,200', date: "18/05/2025", status: 'Successful', rating: 4.7 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Successful': return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200';
      case 'Cancel': return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200';
      case 'Hold': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(products.length);
    } else {
      setSelectedItems(0);
    }
  };

  const handleSelectOne = (e) => {
    if (e.target.checked) {
      setSelectedItems(prev => prev + 1);
    } else {
      setSelectedItems(prev => prev - 1);
    }
  };

  // Function to export data as PDF
  const exportToPDF = () => {
    setIsExporting(true);
    
    try {
      const doc = new jsPDF();
      
      // Add title to the PDF
      doc.setFontSize(18);
      doc.text('Sales Dashboard Report', 14, 22);
      
      // Add date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Create table with autotable - use the imported autoTable function directly
      const tableColumn = ["Company", "Client Name", "Shipment", "Sale", "Meeting Date", "Meeting Status"];
      const tableRows = products.map(product => [
        product.clients,
        product.person,
        product.shipment,
        product.sale,
        product.date,
        product.status
      ]);
      
      // Use the imported autoTable function with doc as first parameter
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineColor: [200, 200, 200],
        },
        headerStyles: {
          fillColor: [71, 85, 105],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        columnStyles: {
          5: { // Status column
            cellCallback: function(cell, data) {
              if (data.text === 'Successful') {
                cell.styles.textColor = [39, 119, 227];
              } else if (data.text === 'Cancel') {
                cell.styles.textColor = [220, 38, 38];
              } else if (data.text === 'Hold') {
                cell.styles.textColor = [202, 138, 4];
              }
            }
          }
        },
      });
      
      // Save the PDF
      doc.save('sales-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button 
            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IoFilterOutline className="h-5 w-5 text-gray-500" />
            <span>Filter</span>
          </motion.button>
          <motion.button 
            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <IoArrowDownOutline className="h-5 w-5 text-gray-500" />
            <span>Sort</span>
          </motion.button>
          <div className="flex items-center">
            <span className="mr-2 text-sm">May 2025</span>
          </div>
        </div>
     
        <motion.button
          className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={exportToPDF}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <motion.div 
                className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <IoDownloadOutline className="h-5 w-5 text-gray-500" />
              <span>Export</span>
            </>
          )}
        </motion.button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-center text-xs font-medium text-red-600 uppercase tracking-wider bg-gray-50">
              <th className="p-4">
                <input 
                  type="checkbox" 
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-all duration-200" 
                  onChange={handleSelectAll} 
                />
              </th>
              <th className="p-4">Company</th>
              <th className="p-4">Client Name</th>
              <th className="p-4">Shipment</th>
              <th className="p-4">Sale</th>
              <th className="p-4">Meeting Date</th>
              <th className="p-4">Meeting Status</th>
              
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {products.map((product) => (
                <motion.tr 
                  key={product.id} 
                  className="hover:bg-gray-50 transition-colors duration-150 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  onHoverStart={() => setHoveredRow(product.id)}
                  onHoverEnd={() => setHoveredRow(null)}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-all duration-200" 
                      onChange={handleSelectOne} 
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200">{product.clients}</div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.person}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.shipment}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{product.sale}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 text-center">{product.date}</td>
                  <td className="p-4 whitespace-nowrap text-center">
                    <motion.span 
                      className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.status}
                    </motion.span>
                  </td>
                
                  <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
                    <motion.button 
                      className={`text-gray-400 hover:text-gray-500 transition-colors duration-200 ${hoveredRow === product.id ? 'visible' : 'invisible'}`}
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <IoEllipsisVerticalOutline className="h-5 w-5" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Showing per page</span>
          <motion.select 
            className="rounded border-gray-300 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </motion.select>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button 
            className="border border-gray-300 rounded-md p-1 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronBackOutline className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
          <motion.button 
            className="border border-gray-300 px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            2
          </motion.button>
          <motion.span className="text-gray-500">...</motion.span>
          <motion.button 
            className="border border-gray-300 px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            25
          </motion.button>
          <motion.button 
            className="border border-gray-300 rounded-md p-1 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronForwardOutline className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">Go to page</span>
          <motion.input 
            type="text" 
            className="ml-2 w-16 rounded border-gray-300 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button 
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            Go
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductTable;
