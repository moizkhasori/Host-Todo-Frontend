import React from 'react'
import { uid } from 'uid'

const SelectComponent2 = ({options,currentValue, onChangeFunction}) => {
  return (
    <select className="px-4 py-2 rounded-md" onChange={e => onChangeFunction(e.target.value)} value={currentValue}>
             {options.map(option => <option key={uid()}>{option}</option>)}
          </select>
  )
}

export default SelectComponent2