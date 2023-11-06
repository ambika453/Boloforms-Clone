import React, { useState, useEffect } from 'react'

const PreviewComprehension = ({ q, qi, updatePreview }) => {
  const [question, setQuestion] = useState(q)
  const [comprehension, setComprehension] = useState([])

  const handleMcq = (e) => {
    const mid = e.target.getAttribute('mid')
    const id = e.target.getAttribute('id')
    let updatedComprehension = [...comprehension]
    if(Number(mid)+1<=updatedComprehension.length){
      updatedComprehension[mid] = id
    }else{
      updatedComprehension = [...updatedComprehension, id]
    }
    setComprehension(updatedComprehension)
  }

  useEffect(()=>{
    if(qi && updatePreview){
      updatePreview(qi,comprehension)
    }
  },[comprehension])

  console.log(comprehension)

  return (
    <div className='flex flex-col w-full items-center justify-center mb-2'>
      <div className='flex flex-col w-full pl-4 pr-6 items-center justify-center'>
        <div className='w-full pb-2'>
            <p className='w-full py-1 rounded-sm text-xs font-bold focus:outline-0 focus:shadow'>{question.description}</p>
        </div>
        <div className='w-full pb-2'>
            <p className='w-full py-1 rounded-sm text-xs focus:outline-0 focus:shadow'>{question.paragraph}</p>
        </div>
      </div>
      <div className='w-full pl-3 pr-5 mt-2'>
        {question.subQuestions && question.subQuestions.map((s,si)=>(
          <div key={si} className='flex flex-col w-full items-center justify-center my-4 group'>
            <div className='flex flex-row w-full items-center justify-center'>
              <div className='flex flex-col w-full rounded shadow'>
                <div className='flex w-full justify-center items-center'>
                  <div className='w-full p-4'>Question {qi+1}.{si+1}</div>
                </div>
                <div className='flex w-full'>
                <div className='flex flex-col w-full items-center justify-center'>
                  <div className='w-full pb-2 px-4'>
                    <p id={si} className='w-full py-1 rounded-sm font-medium text-xs focus:outline-0 focus:shadow'>{s.description}</p>
                  </div>
                  <div className='w-full pb-2'>
                    {s.options.map((z,zi)=>(
                      <div className='flex flex-row items-center justify-start m-2' key={zi}>
                        <input type='radio' mid={si} name={si} id={zi} className='mr-2 ml-2' onClick={handleMcq}/>
                        <p mid={si} id={zi} className='w-2/5 px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'>{z.option}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviewComprehension