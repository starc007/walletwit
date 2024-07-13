import React, { useState } from "react";
import { motion } from "framer-motion";

interface TabItemProps {
  title: string;
  isActive: boolean;
  setActiveTab: () => void;
}

const TabItem = ({ title, isActive, setActiveTab }: TabItemProps) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-all relative ${
        isActive ? "text-white" : "text-zinc-500 hover:text-gray-800"
      }`}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={() => setActiveTab()}
    >
      {isActive && (
        <motion.span
          layoutId="bubble-tab"
          className="absolute inset-0 z-0 bg-primary rounded-md"
          transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{title}</span>
    </button>
  );
};

const Tabs = ({
  tabList,
}: {
  tabList: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        {tabList.map((tab, index) => (
          <TabItem
            key={index}
            title={tab.title}
            isActive={activeTab === index}
            setActiveTab={() => setActiveTab(index)}
          />
        ))}
      </div>

      {/* Tab content */}
      <div className=" mt-4">{tabList[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
