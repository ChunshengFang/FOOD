// import React from 'react'
import * as Label from '@radix-ui/react-label'

const LabelInput = ({ id, type, label, value, onChange, placeholder }: any) => (
  <div className='flex flex-wrap justify-end items-center gap-[15px] px-5'>
    <Label.Root
      className='text-[15px] font-medium leading-[35px] text-slate-500 text-right'
      htmlFor={id}
    >
      {label}
    </Label.Root>
    <br />
    <input
      className='inline-flex h-[35px] w-[360px] appearance-none items-center 
        justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none
        text-slate-500 shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6
        selection:text-blackA6 focus:shadow-[0_0_0_2px_black]'
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
)

export default LabelInput
