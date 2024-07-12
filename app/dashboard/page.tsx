"use client";
import { DataContextProvider } from "@/context/DataContext";
import React from "react";

const Dashboard = () => {
  return (
    <DataContextProvider>
      <div>Dashboard</div>
    </DataContextProvider>
  );
};

export default Dashboard;
