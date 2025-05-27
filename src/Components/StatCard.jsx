import React from "react";
import { motion } from "framer-motion";
import {
  IoTrendingUpOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
// Import from a different icon set that has a target icon

function StatCard({ title, value, change, changePercent, vs, color, icon }) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-full -mr-6 -mt-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.5 }}
        style={{
          background: color
            ? color
            : "linear-gradient(to right, #4f46e5, #3b82f6)",
        }}
      />

      <div className="flex items-center justify-between mb-2 relative">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <motion.div whileHover={{ rotate: 15 }} className="text-indigo-600">
          <IoInformationCircleOutline className="h-5 w-5 text-gray-400" />
        </motion.div>
      </div>

      <div className="flex items-end justify-between relative">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          {value}
        </motion.h2>
        <div className="text-right">
          {change && (
            <motion.div
              className="flex items-center text-xs font-medium text-emerald-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            >
              <IoTrendingUpOutline className="h-3 w-3 mr-1" />
              {change}
            </motion.div>
          )}
          {changePercent && (
            <motion.div
              className="flex items-center text-xs font-medium text-emerald-500 justify-end"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            >
              <IoTrendingUpOutline className="h-3 w-3 mr-1" />
              {changePercent}
            </motion.div>
          )}
          <div className="text-xs text-gray-500">{vs}</div>
        </div>
      </div>

      <motion.div
        className={`absolute bottom-3 right-3 text-opacity-50 ${
          color
            ? color
                .replace("bg-", "text-")
                .replace("-500", "-400")
                .replace("gradient-to-r from-", "")
                .replace(" to-", "")
            : "text-indigo-400"
        }`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {}
      </motion.div>
    </motion.div>
  );
}

export default StatCard;
