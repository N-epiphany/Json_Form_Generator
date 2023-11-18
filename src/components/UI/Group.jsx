import React from 'react'

const Group = ({className, children, heading}) => {
  return (
    <div className={` p-3 bg-[#FCFDFF] rounded-md border border-blue-100 flex flex-col gap-2 ${className}`}>
        {heading && <h2 className='text-sm font-semibold border-b pb-2 mb-1'>{heading}</h2>}
        {children}
    </div>
  )
}

export default Group