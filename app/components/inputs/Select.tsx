'use client'

import ReactSelect from "react-select"

interface SelectProps {
  label: string
  disabled?: boolean
  options: Record<string,any>[]
  onChange: (value: Record<string,any>) => void
  value?: Record<string,any>
}

// Select component to add people in a group
const Select: React.FC<SelectProps> = ({ label,disabled,options,onChange,value }) => {
  return (
    <div className='z-[100]'>
      <label>{label}</label>
      <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        // menuPortalTarget={document.body} // To dont have problem with overflow because is a modal
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999
          })
        }}
        classNames={{
          control: () => 'text-sm'
        }}
      />
    </div>
  )
}
export default Select
