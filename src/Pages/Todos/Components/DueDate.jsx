import React from "react";

const DueDate = ({duedate}) => {
  return (
    <div>
      <span className="font-medium">duedate: </span>
      <span>{duedate}</span>
    </div>
  );
};

export default DueDate;
