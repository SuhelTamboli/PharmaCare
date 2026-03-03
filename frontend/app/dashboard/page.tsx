"use client";

import { AlertsNotifications } from "@/components/AlertsNotifications";
import StatCard from "@/components/StatCard";
import { WeeklySalesTrend } from "@/components/WeeklySalesTrend";
import { useFetch } from "@/hooks/useFetch";
import { IndianRupee, Package, AlertCircle, FileText } from "lucide-react";
import { checkIsExpired } from "../utils/helper";
import { Medicine } from "../inventory/page";

export default function DashboardStats() {
  // const stats = [
  //   {
  //     title: "Today's Revenue",
  //     value: "19,500",
  //     subtitle: "67 orders",
  //     trend: "12.5%",
  //     icon: <IndianRupee size={20} />,
  //     borderColor: "border-emerald-500", // Full string here
  //     textColor: "text-emerald-600 dark:text-emerald-400",
  //     iconBg:
  //       "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  //   },
  //   {
  //     title: "Low Stock Items",
  //     value: "3",
  //     subtitle: "Needs reorder",
  //     icon: <Package size={20} />,
  //     borderColor: "border-amber-500", // Full string here
  //     textColor: "text-amber-600 dark:text-amber-400",
  //     iconBg:
  //       "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  //   },
  //   {
  //     title: "Expired Medicines",
  //     value: "1",
  //     subtitle: "Remove immediately",
  //     icon: <AlertCircle size={20} />,
  //     borderColor: "border-red-500", // Full string here
  //     textColor: "text-red-600 dark:text-red-400",
  //     iconBg: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  //   },
  //   {
  //     title: "Pending Prescriptions",
  //     value: "14",
  //     subtitle: "Awaiting review",
  //     icon: <FileText size={20} />,
  //     borderColor: "border-blue-500", // Full string here
  //     textColor: "text-blue-600 dark:text-blue-400",
  //     iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  //   },
  // ];

  // Pass the specific URL to the useFetch hook
  const {
    data: medicines,
    loading,
    error,
    refresh,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/medicine/all-medicines`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Essential for cross-site cookies/sessions
    },
  );

  // Since 'data' starts as null, we default to an empty array for filtering
  const inventory: Medicine[] = medicines || [];

  const lowStockCount = inventory.filter(
    (item) => item.stock > 0 && item.stock < 10,
  ).length;

  const outOfStockCount = inventory.filter((item) => item.stock === 0).length;

  const expiredCount = inventory.filter((item) =>
    checkIsExpired(item.expiry_date),
  ).length;

  const stats = [
    {
      title: "Today's Revenue",
      value: "19,500",
      subtitle: "67 orders",
      trend: "12.5%",
      icon: <IndianRupee size={20} />,
      borderColor: "border-emerald-500",
      textColor: "text-emerald-600 dark:text-emerald-400",
      iconBg:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "Low Stock Items",
      value: loading ? "..." : lowStockCount.toString(),
      subtitle:
        outOfStockCount > 0
          ? `${outOfStockCount} Out of Stock`
          : "Check inventory",
      icon: <Package size={20} />,
      borderColor: "border-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
      iconBg:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
      title: "Expired Medicines",
      value: loading ? "..." : expiredCount.toString(),
      subtitle: expiredCount > 0 ? "Remove immediately" : "All clear",
      icon: <AlertCircle size={20} />,
      borderColor: "border-red-500",
      textColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
    {
      title: "Pending Prescriptions",
      value: "14",
      subtitle: "Awaiting review",
      icon: <FileText size={20} />,
      borderColor: "border-blue-500",
      textColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <WeeklySalesTrend />
        </div>

        <div className="lg:col-span-2">
          <AlertsNotifications inventory={inventory} />
        </div>
      </div>
    </div>
  );
}
