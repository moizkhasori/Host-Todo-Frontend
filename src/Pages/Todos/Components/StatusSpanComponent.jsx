import React from "react";

const StatusSpanComponent = ({text}) => {
  
  const statusColorObj = {
    Pending: "bg-red-500",
    InProgress: "bg-orange-500",
    Completed: "bg-green-500",
  };

  return (
    <span className={`py-1 px-2 ${statusColorObj[text]} rounded-lg`}>
      {text}
    </span>
  );
};

export default StatusSpanComponent;
