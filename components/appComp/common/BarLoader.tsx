import React from "react";

const BarLoader = ({ bar = 4 }: { bar?: number }) => {
  return (
    <div className="space-y-4">
      {[...Array(bar)].map((_, i) => (
        <div
          key={i}
          className="bg-white/10 animate-pulse h-8 w-full px-4 py-2 rounded-md text-white rounded-tl-none"
        />
      ))}
    </div>
  );
};

export default BarLoader;
