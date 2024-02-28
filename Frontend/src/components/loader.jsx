import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
