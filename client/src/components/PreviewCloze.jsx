import React, { useState, useEffect, useRef } from 'react'

const PreviewCloze = ({ q, qi, updatePreview }) => {
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState({})
  const [cloze, setCloze] = useState({})

  const de = useRef(0)
  const doc = useRef(0)

  useEffect(()=>{
    if(q && q.preview){
      const preview = q.preview.split(' ')
      let updatedCloze = []
      const pattern = /_+/
      for(let i=0; i<preview.length; i++){
        if(preview[i].match(/_+/)){
          preview[i] = updatedCloze.length
          updatedCloze = [...updatedCloze, 'option']
        }
      }
      setCloze(updatedCloze)
      setQuestion({description:q.description, options:q.options, preview:preview})
    }
  },[])

  const handleDragEnd = () => {
    console.log(doc.current,de.current)
    let updatedCloze = [...cloze]
    let updatedQuestion = {...question}
    updatedCloze[doc.current] = question.options[de.current].option
    updatedQuestion.options[de.current].option = ''
    setCloze(updatedCloze)
    setQuestion(updatedQuestion)
  }

  useEffect(()=>{
    if(qi && updatePreview){
      updatePreview(qi,cloze)
    }
  },[cloze])

  console.log(cloze)

  return (
    <div className='w-full pl-4 mr-4'>
      <div className='w-11/12 font-bold py-1 rounded-sm text-xs focus:outline-0 focus:shadow'>{q.description}</div>
      <div className='w-11/12 flex flex-row flex-wrap items-center justify-center mt-6'>
        {question && question.options && question.options.map((o,oi)=>(
          <div 
          className={`flex justify-center border border-black rounded py-1 w-20 m-2 ${o.option.length>0 ? 'cursor-move' : 'border-none'}`}
          onDragStart={()=>{de.current = oi}} 
          onDragEnd={handleDragEnd}
          onDragOver={(e)=>{e.preventDefault()}}
          draggable
          >{o.option}</div>
        ))}
      </div>
      <div className='w-full flex flex-col items-center justify-center mt-8 mb-4'>
        <div className='flex flex-row w-full flex-wrap justify-start items-center mb-4'>
            {question.preview && question.preview.map((p,pi)=>(
              <div key={pi} className='flex flex-row justify-center items-center my-1'>
              { Number.isInteger(p) ? <span className='border border-black mr-1 rounded bg-[#ade8f4]'><span className={`flex justify-center w-20 py-1 h-7 items-center mr-1 ${ cloze[p]=='option' ? 'opacity-0' : 'opacity-1'}`} onDragEnter={()=>{doc.current = p}}>{cloze[p]}</span></span>
                : <span className='mr-1'>{p}</span>
              }
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewCloze