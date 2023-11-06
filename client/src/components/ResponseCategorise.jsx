import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ResponseCategorize = ({ q, qi, r }) => {
  console.log(r)
  console.log(q)

  return (
    <div className='flex flex-col w-full pl-4 pb-3'>
        <div className='w-full pb-2 pr-10'>
          <p className='w-full font-bold pt-1 pb-4 rounded-sm text-xs focus:outline-0 focus:shadow'>{q.description}</p>
        </div>
        <div className='flex flex-row w-full items-center justify-center mt-8'>
          {q && q.categories && q.categories.map((c,ci)=>(
            <div className='flex w-full justify-center' key={ci}>
              <div className='flex justify-center border border-[#33333366] rounded py-1 px-3 w-28'>{c}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-row w-full items-center justify-center'>
          <div className='flex flex-row w-full items-center justify-center mt-4'>
            {r.length>0 && r.map((sc,sci)=>(
              <div className='flex flex-col w-full items-center justify-center' key={sci}>
                <div className='flex flex-col items-center justify-center bg-[#ade8f4] rounded py-2 w-28'>
                  {sc.selections && sc.selections.map((s,si)=>(
                    <div key={si} className={`w-20 flex justify-center items-center py-1 px-1 border border-[#33333366] rounded my-1`}>{s}</div>
                  ))}
                </div>
              </div>
            ))}
          </div> 
        </div>
    </div>
  )
}

export default ResponseCategorize