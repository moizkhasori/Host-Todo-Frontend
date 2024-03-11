import React from "react";
import {uid} from "uid"
const SelectComponent = ({ options, onChangeFunction, value }) => {
  return (
    <select className="w-full p-4 rounded-md outline-none" value={value} onChange={(e) => {onChangeFunction(e.target.value)}}>
      {options.map(option => <option key={uid()}>{option}</option>)}
    </select>
  );
};

export default SelectComponent;
