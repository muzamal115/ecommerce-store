import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useOrdersData } from "../../context/OrderContext";

const Analytics = () => {

     const[ordersChartData,setOrdersChartData]=useState([])
     const[revenueChartData,setRevenueChartData]=useState([])
     const[statusChartData,setStatusChartData]=useState([])
   const{fetchAllOrders,ordersData}=useOrdersData()

    useEffect(()=>{
fetchAllOrders()
    },[])

useEffect(()=>{
    if(!ordersData||ordersData.length===0) return

    const ordersPerMonth = {};

ordersData.forEach((o) => {
  if (!o.createdAt) return;

  const date = new Date(o.createdAt);

  const month = date.toLocaleString("default", { month: "short" });

  ordersPerMonth[month] = (ordersPerMonth[month] || 0) + 1;

 

});

 const ordersCharts = Object.keys(ordersPerMonth).map((key) => ({
  name: key,
  orders: ordersPerMonth[key],
}));
console.log(ordersCharts);

setOrdersChartData(ordersCharts)

},[ordersData])


// calculate monthly revenue
useEffect(() => {
  if (!ordersData || ordersData.length === 0) return;

  const revenuePerMonth = {};

  ordersData.forEach((o) => {
    if (!o.createdAt) return;

    const date = new Date(o.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    revenuePerMonth[month] =
      (revenuePerMonth[month] || 0) + Number(o.pricing?.subtotal || 0);
  });

  const revenueChartData = Object.keys(revenuePerMonth).map((key) => ({
    name: key,
    revenue: revenuePerMonth[key],
  }));

  setRevenueChartData(revenueChartData);

}, [ordersData]);

// calculate order status
useEffect(() => {
  if (!ordersData || ordersData.length === 0) return;

  const statusCount = {};

  ordersData.forEach((o) => {
    const status = o.status?.toLowerCase() || "unknown";

    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const statusChartData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  setStatusChartData(statusChartData);

}, [ordersData]);


//   const ordersData = [
//     { name: "Jan", orders: 12 },
//     { name: "Feb", orders: 20 },
//     { name: "Mar", orders: 15 },
//     { name: "Apr", orders: 25 },
//   ];

//   const revenueData = [
//     { name: "Jan", revenue: 12000 },
//     { name: "Feb", revenue: 20000 },
//     { name: "Mar", revenue: 15000 },
//     { name: "Apr", revenue: 30000 },
//   ];

//   const statusData = [
//     { name: "Delivered", value: 40 },
//     { name: "Pending", value: 15 },
//     { name: "Cancelled", value: 5 },
//   ];

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#f97316", "#10b981", "#ef4444"];

  return (
    <div className="p-4 md:p-6 bg-gray-200 min-h-screen">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-gray-600">Track your store performance</p>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Orders Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">

            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={55}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-col gap-3">
              {statusChartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[index] }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}</span>
                  <span className="text-sm font-semibold text-gray-800 ml-1">{entry.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;