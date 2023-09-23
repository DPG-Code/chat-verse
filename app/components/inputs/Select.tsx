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
    <div className='flex flex-col items-center justify-center gap-2 z-50 relative lg:gap-3'>
      <label className='text-lg text-white font-semibold lg:text-2xl'>{label}</label>
      <ReactSelect
        data-test-id='members-select'
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        className='no-outline'
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999
          }),
          control: (base) => ({
            ...base,
            backgroundColor: '#171717',
            '&:active': {
              backgroundColor: '#262626'
            },
            '&:focus': {
              outline: 'none',
              border: 'none',
              boxShadow: 'none'
            }
          }),
          // Elements to choise
          menu: (base) => ({
            ...base,
            backgroundColor: '#171717',
            color: '#FFFFFF'
          }),
          option: (base) => ({
            ...base,
            backgroundColor: '#171717',
            ':hover': {
              backgroundColor: '#262626',
            },
          }),
          // Element Choised
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#171717'
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#FFFFFF'
          }),
          multiValueRemove: (base) => ({
            ...base,
            backgroundColor: '#262626',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#ef4444',
              color: '#FFFFFF'
            }
          }),
        }}
        classNames={{
          control: () => 'text-base lg:text-2xl'
        }}
      />
    </div>
  )
}
export default Select
