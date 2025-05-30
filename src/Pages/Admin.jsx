import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import StatCard from "../Components/StatCard";
import ProductTable from "../Components/ProductTable";
import Customer from "./Customer";
import AddSaleModal from "../Components/AddSaleModal";
import { IoAddOutline, IoGridOutline, IoLayersOutline } from "react-icons/io5";

function Admin() {
  const [selectedItems, setSelectedItems] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);

  // Dummy stats data
  const stats = [
    {
      title: "Total Sale",
      value: "$10,780",
      change: null,
      changePercent: "+3%",
      vs: "vs last month",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      iconColor: "text-blue-400",
      icon: "chart-line",
    },
    {
      title: "Monthly Target",
      value: "$15,490",
      change: null,
      changePercent: "+9%",
      vs: "vs last month",
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      iconColor: "text-purple-400",
      icon: "target",
    },
    {
      title: "Remaining Target",
      value: "$2,355",
      change: null,
      changePercent: "+7%",
      vs: "vs last month",
      color: "bg-gradient-to-r from-emerald-500 to-teal-600",
      iconColor: "text-emerald-400",
      icon: "clock",
    },
    {
      title: "Avg. Monthly Sales",
      value: "$890",
      change: null,
      changePercent: "+5%",
      vs: "vs last month",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      iconColor: "text-amber-400",
      icon: "chart-bar",
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  // Render different components based on active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case "Customer":
        return <Customer />;
      case "Dashboard":
      default:
        return (
          <motion.div 
            className="flex-1 overflow-y-auto p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h1 
                className="text-2xl font-bold text-gray-800"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                Sales Dashboard
              </motion.h1>
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
              >
                <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                  <IoLayersOutline className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                  <IoGridOutline className="h-5 w-5 text-gray-600" />
                </button>
                <motion.button 
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setIsAddSaleModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoAddOutline className="h-5 w-5 mr-2" />
                  Add New Sale
                </motion.button>
              </motion.div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                delay: 0.6 
              }}
            >
              <ProductTable
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </motion.div>

            {selectedItems > 0 && (
              <motion.div 
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white py-3 px-4 rounded-lg shadow-lg flex items-center gap-2 border border-gray-200"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className="text-sm font-medium">{selectedItems} Selected</span>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200">
                  Apply Code
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200">
                  Edit Info
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200">
                  Delete
                </button>
                <button className="ml-2 hover:bg-gray-100 p-1 rounded-full transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="hover:bg-gray-100 p-1 rounded-full transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          activeMenuItem={activeMenuItem} 
          setActiveMenuItem={setActiveMenuItem} 
        />
        {renderContent()}
      </div>
      
      {/* Add Sale Modal */}
      <AddSaleModal 
        isOpen={isAddSaleModalOpen} 
        onClose={() => setIsAddSaleModalOpen(false)} 
      />
    </div>
  );
}

export default Admin;
