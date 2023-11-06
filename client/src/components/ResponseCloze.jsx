import React, { useState, useEffect, useRef } from 'react'

const ResponseCloze = ({ q, qi, r }) => {
  console.log(q)
  console.log(r)

  return (
    <div className='w-full pl-4 mr-4'>
      <div className='w-11/12 font-bold py-1 rounded-sm text-xs focus:outline-0 focus:shadow'>{q.description}</div>
      <div className='w-full flex flex-col items-center justify-center mt-8 mb-4'>
        <div className='flex flex-row w-full flex-wrap justify-start items-center mb-4'>
            {q.preview && q.preview.map((p,pi)=>(
              <div key={pi} className='flex flex-row justify-center items-center my-1'>
              { Number.isInteger(p) ? <span className='border border-black mr-1 rounded bg-[#ade8f4]'><span className={`flex justify-center w-20 py-1 h-7 items-center mr-1`}>{r[p]}</span></span>
                : <span className='mr-1'>{p}</span>
              }
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ResponseCloze