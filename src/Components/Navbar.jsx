import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSearch,
  IoNotifications,
  IoEllipsisVertical,
  IoGridOutline,
  IoPeopleOutline,
  IoChevronDownOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

function Navbar({ activeMenuItem, setActiveMenuItem }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: IoGridOutline },
    { name: "Customer", icon: IoPeopleOutline },
  ];

  const notifications = [
    {
      id: 1,
      title: "New customer registered",
      time: "2 min ago",
      type: "info",
    },
    { id: 2, title: "Sale completed", time: "5 min ago", type: "success" },
    { id: 3, title: "Payment pending", time: "10 min ago", type: "warning" },
  ];

  const handleMenuClick = (itemName) => {
    setActiveMenuItem(itemName);
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Left Section - Logo and Navigation */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">OT</span>
          </div>
          <div className="hidden md:block">
            <h2 className="font-bold text-gray-800 text-lg">OmTrans</h2>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.name}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                activeMenuItem === item.name
                  ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
              onClick={() => handleMenuClick(item.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center">
                <item.icon
                  className={`h-5 w-5 mr-2 ${
                    activeMenuItem === item.name
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                />
                {item.name}
              </div>
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <IoCloseOutline className="h-6 w-6 text-gray-600" />
          ) : (
            <IoMenuOutline className="h-6 w-6 text-gray-600" />
          )}
        </motion.button>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <motion.div
            animate={{ width: isFocused ? "105%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute top-0 left-0 h-full rounded-md ${
              isFocused ? "ring-2 ring-indigo-500" : ""
            }`}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none transition-all duration-200"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <IoSearch className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            className="text-gray-500 hover:text-gray-700 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoNotifications className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            notification.type === "success"
                              ? "bg-green-400"
                              : notification.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-blue-400"
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
          <div className="h-8 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
            Tarun
          </div>
        </motion.div>

        {/* More Options */}
        <motion.button
          className="p-2 rounded-md hover:bg-gray-100"
          whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.95 }}
        >
          <IoEllipsisVertical className="h-5 w-5 text-gray-500" />
        </motion.button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    activeMenuItem === item.name
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                  onClick={() => handleMenuClick(item.name)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        activeMenuItem === item.name
                          ? "text-indigo-600"
                          : "text-gray-500"
                      }`}
                    />
                    {item.name}
                  </div>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Overlay for notifications */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
