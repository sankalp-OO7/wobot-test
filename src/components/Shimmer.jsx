import React from "react";

export default function Shimmer({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
}) {
  return (
    <div
      className={`bg-gray-200 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
        bg-[length:200%_100%] ${width} ${height} ${rounded} ${className}`}
    />
  );
}
