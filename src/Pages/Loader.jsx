import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="flex items-center justify-center w-24 h-24">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 animate-ping rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
