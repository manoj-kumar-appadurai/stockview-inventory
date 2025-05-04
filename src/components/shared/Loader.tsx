
import React from 'react';
import { Package } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <Package className="h-16 w-16 text-primary animate-pulse" />
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin-slow opacity-25"></div>
        </div>
        <h2 className="text-xl font-medium text-gray-700">Loading StockView</h2>
        <p className="text-sm text-gray-500 mt-2">Setting up your inventory...</p>
      </div>
    </div>
  );
};

export default Loader;
