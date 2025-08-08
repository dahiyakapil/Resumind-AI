import React from "react";

const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <div
    style={{ width: size, height: size }}
    className="animate-spin rounded-full border-4 border-dashed border-blue-500 border-t-transparent"
    aria-label="loading"
  />
);

export default Spinner;
