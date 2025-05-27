import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch, IoNotifications, IoEllipsisVertical } from 'react-icons/io5';

function Navbar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative w-64">
        <motion.div
          animate={{ width: isFocused ? '110%' : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`absolute top-0 left-0 h-full rounded-md ${isFocused ? 'ring-2 ring-indigo-500' : ''}`}
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none transition-all duration-200"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <IoSearch 
          className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.button 
          className="text-gray-500 hover:text-gray-700 relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoNotifications className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </motion.button>
        
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="h-8 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
            Tarun
          </div>
        </motion.div>
        
        <motion.button 
          className="p-2 rounded-md hover:bg-gray-100"
          whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.95 }}
        >
          <IoEllipsisVertical className="h-5 w-5 text-gray-500" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Navbar;