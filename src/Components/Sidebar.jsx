import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoGridOutline,
  IoCartOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoChatbubblesOutline,
  IoMailOutline,
  IoSettingsOutline,
  IoAnalyticsOutline,
  IoChevronBackOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedSection, setExpandedSection] = useState("WORKSPACE");

  const menuItems = [
    { name: "Dashboard", icon: IoGridOutline },
    { name: "Customer", icon: IoPeopleOutline, badge: 33 },
  ];

  return (
    <motion.div
      className="w-60 bg-white border-r border-gray-200 flex flex-col h-full"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="p-4 border-b border-gray-200 flex items-center space-x-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-9 w-9 rounded bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-md">
          <span className="text-white font-bold">OT</span>
        </div>
        <div>
          <h2 className="font-bold text-gray-800">OmTrans</h2>
          <p className="text-xs text-gray-500">Sales</p>
        </div>
        <motion.button
          className="ml-auto hover:bg-gray-100 p-1 rounded-full transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoChevronBackOutline className="h-5 w-5 text-gray-500" />
        </motion.button>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-xs font-semibold text-gray-500 mb-4">MAIN MENU</p>
        <nav>
          <motion.ul
            className="space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.a
                  href="#"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 font-medium border-r-4 border-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveItem(item.name)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        activeItem === item.name
                          ? "text-indigo-600"
                          : "text-gray-500"
                      }`}
                    />
                    {item.name}
                  </div>
                  {item.badge && (
                    <motion.span
                      className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;
