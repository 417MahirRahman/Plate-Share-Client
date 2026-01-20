import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const summaryData = [
  { title: "Total Foods", value: 24 },
  { title: "Available Foods", value: 14 },
  { title: "Donated Foods", value: 10 },
  { title: "Total Requests", value: 18 },
];

const foodStatusData = [
  { name: "Available", value: 14 },
  { name: "Donated", value: 10 },
];

const requestStatusData = [
  { name: "Pending", count: 6 },
  { name: "Accepted", count: 8 },
  { name: "Rejected", count: 4 },
];

const foodAddedData = [
  { day: "Mon", foods: 2 },
  { day: "Tue", foods: 4 },
  { day: "Wed", foods: 3 },
  { day: "Thu", foods: 5 },
  { day: "Fri", foods: 6 },
];

const Dashboard = () => {
  return (
    <div>
      <div className="p-6 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
            >
              <h2 className="text-sm text-gray-600 font-medium">
                {item.title}
              </h2>
              <p className="text-3xl font-bold mt-2 text-[#DC143C]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Food Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={foodStatusData}
                  dataKey="value"
                  nameKey="name"
                  fill="#DC143C"
                  stroke="#fff"
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Request Status Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Request Status
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={requestStatusData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#DC143C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Foods Added This Week
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={foodAddedData}>
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                dataKey="foods"
                stroke="#DC143C"
                strokeWidth={3}
                dot={{ fill: "#DC143C", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
