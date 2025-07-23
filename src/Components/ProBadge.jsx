import React from "react";

const ProBadge = ({
  text = "PRO",
  bgColor = "bg-yellow-400",
  textColor = "text-black",
  className = "",
}) => {
  return (
    <>
    <span
      className={`ml-2 px-2 py-0.5 text-xs rounded-full font-semibold ${bgColor} ${textColor} ${className}`}
    >
      {text}
    </span>
    </>
  );
};

export default ProBadge;
