// src/components/DashboardNavbar.tsx

import React from "react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

const DashboardNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo/Title */}

      {/* Right controls */}
      <div>2</div>
      <div className="flex gap-3 ">
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default DashboardNavbar;
