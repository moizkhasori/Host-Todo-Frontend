import React from "react";

const PrioritySpanComponent = ({ text }) => {
  const priorityColorObj = {
    Low: "bg-green-500",
    Medium: "bg-orange-500",
    High: "bg-red-500",
  };

  return (
    <span className={`py-1 px-2 ${priorityColorObj[text]} rounded-lg`}>
      {text}
    </span>
  );
};

export default PrioritySpanComponent;
