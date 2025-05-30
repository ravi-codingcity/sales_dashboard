import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoFilterOutline,
  IoArrowDownOutline,
  IoEllipsisVerticalOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoDownloadOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoBusinessOutline,
} from "react-icons/io5";

function CustomerTable({ selectedItems, setSelectedItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Dummy customer data
  const customers = [
    {
      id: 1,
      companyName: "Microsoft Corporation",
      customerName: "John Smith",
      contactNumber: "+1 (555) 123-4567",
      email: "john.smith@microsoft.com",
      address: "Redmond, WA, USA",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      companyName: "Google LLC",
      customerName: "Sarah Johnson",
      contactNumber: "+1 (555) 987-6543",
      email: "sarah.j@google.com",
      address: "Mountain View, CA, USA",
      status: "Active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      companyName: "Tesla Inc",
      customerName: "Michael Brown",
      contactNumber: "+1 (555) 456-7890",
      email: "mbrown@tesla.com",
      address: "Austin, TX, USA",
      status: "Inactive",
      joinDate: "2024-01-08",
    },
    {
      id: 4,
      companyName: "Apple Inc",
      customerName: "Emily Davis",
      contactNumber: "+1 (555) 321-0987",
      email: "emily.davis@apple.com",
      address: "Cupertino, CA, USA",
      status: "Active",
      joinDate: "2024-03-12",
    },
    {
      id: 5,
      companyName: "Amazon",
      customerName: "David Wilson",
      contactNumber: "+1 (555) 654-3210",
      email: "dwilson@amazon.com",
      address: "Seattle, WA, USA",
      status: "Pending",
      joinDate: "2024-03-25",
    },
    {
      id: 6,
      companyName: "Meta Platforms",
      customerName: "Lisa Anderson",
      contactNumber: "+1 (555) 789-0123",
      email: "lisa.anderson@meta.com",
      address: "Menlo Park, CA, USA",
      status: "Active",
      joinDate: "2024-02-14",
    },
    {
      id: 7,
      companyName: "Netflix Inc",
      customerName: "Robert Taylor",
      contactNumber: "+1 (555) 234-5678",
      email: "rtaylor@netflix.com",
      address: "Los Gatos, CA, USA",
      status: "Active",
      joinDate: "2024-01-30",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-r from-green-50 to-emerald-100 text-green-800 border border-green-200";
      case "Inactive":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200";
      case "Pending":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(customers.length);
    } else {
      setSelectedItems(0);
    }
  };

  const handleSelectOne = (e) => {
    if (e.target.checked) {
      setSelectedItems((prev) => prev + 1);
    } else {
      setSelectedItems((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoFilterOutline className="h-4 w-4 text-gray-500" />
            <span>Filter</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoArrowDownOutline className="h-4 w-4 text-gray-500" />
            <span>Sort</span>
          </motion.button>
          <div className="flex items-center">
            <span className="mr-3 text-sm font-medium text-gray-700">
              May 2025
            </span>
          </div>
        </div>

        <motion.button
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <IoDownloadOutline className="h-4 w-4 text-gray-500" />
          <span>Export</span>
        </motion.button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-all duration-200"
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4">Company</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Email</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
              <th className="p-4">Join Date</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {customers.map((customer) => (
                <motion.tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  onHoverStart={() => setHoveredRow(customer.id)}
                  onHoverEnd={() => setHoveredRow(null)}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded transition-all duration-200"
                      onChange={handleSelectOne}
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                          <IoBusinessOutline className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.companyName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.customerName}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <IoCallOutline className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.contactNumber}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <IoMailOutline className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <IoLocationOutline className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.address}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <motion.span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {customer.status}
                    </motion.span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.joinDate}
                  </td>
                  <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
                    <motion.button
                      className={`text-gray-400 hover:text-gray-500 transition-colors duration-200 ${
                        hoveredRow === customer.id ? "visible" : "invisible"
                      }`}
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

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Showing per page</span>
          <motion.select
            className="rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </motion.select>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="border border-gray-300 rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </motion.button>
          <motion.button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
          <motion.button
            className="border border-gray-300 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            2
          </motion.button>
          <motion.span className="text-gray-500">...</motion.span>
          <motion.button
            className="border border-gray-300 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            10
          </motion.button>
          <motion.button
            className="border border-gray-300 rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronForwardOutline className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">Go to page</span>
          <motion.input
            type="text"
            className="ml-2 w-16 rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerTable;
