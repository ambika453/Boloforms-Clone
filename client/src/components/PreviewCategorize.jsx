import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PreviewCategorize = ({ q, qi, updatePreview }) => {
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(q)
  const [categorize, setCategorize] = useState([])

  const de = useRef(0)
  const doc = useRef(0)

  useEffect(()=>{
    if(q && q.options){
      let data = {...q}
      let answers = []
      let selections = []
      for(let j=0; j<data.options.length; j++){
        selections = [...selections, 'option']
      }
      for(let i=0; i<data.categories.length; i++){
        answers = [...answers, {category:data.categories[i], selections:selections, count:0}]
      }
      setCategorize(answers)
    }
  },[])

  const handleDragEnd = () => {
    console.log(doc.current,de.current)
    let updatedCategorize = [...categorize]
    let updatedQuestion = {...question}
    const id = updatedCategorize[doc.current].count
    updatedCategorize[doc.current].count = id+1
    updatedCategorize[doc.current].selections[id] = question.options[de.current].option
    updatedQuestion.options[de.current].option = ''
    setCategorize(updatedCategorize)
    setQuestion(updatedQuestion)
  }

  useEffect(()=>{
    updatePreview(qi,categorize)
  },[categorize])

  console.log(categorize)

  return (
    <div className='flex flex-col w-full pl-4 pb-3'>
        <div className='w-full pb-2 pr-10'>
          <p className='w-full font-bold pt-1 pb-4 rounded-sm text-xs focus:outline-0 focus:shadow'>{question.description}</p>
        </div>
        <div className='flex felx-row w-full flex-wrap items-center justify-center mt-2'>
          {question.options && question.options.map((o,oi)=>(
              <div 
                key={oi}
                className={`flex justify-center items-center my-1 w-20 h-7 mx-2 rounded border border-[#33333366] ${o.option.length>0 ? 'cursor-move' : 'border-none'}`}
                onDragStart={()=>{de.current = oi}} 
                onDragEnd={handleDragEnd}
                onDragOver={(e)=>{e.preventDefault()}}
                draggable
              >{o.option}</div>
          ))}
        </div>
        <div className='flex flex-row w-full items-center justify-center mt-8'>
          {question.categories && question.categories.map((c,ci)=>(
            <div className='flex w-full justify-center' key={ci}>
              <div className='flex justify-center border border-[#33333366] rounded py-1 px-3 w-28'>{c}</div>
            </div>
          ))}
        </div>
        <div className='flex flex-row w-full items-center justify-center'>
          <div className='flex flex-row w-full items-center justify-center mt-4'>
            {categorize && categorize.map((sc,sci)=>(
              <div className='flex flex-col w-full items-center justify-center' key={sci} onDragEnter={()=>{doc.current = sci}}>
                <div className='flex flex-col items-center justify-center bg-[#ade8f4] rounded py-2 w-28'>
                  {sc.selections && sc.selections.map((s,si)=>(
                    <div key={si} className={`w-20 flex justify-center items-center py-1 px-1 border border-[#33333366] rounded my-1 ${sc.count>si ? 'opacity-1' : 'opacity-0'}`}>{s}</div>
                  ))}
                </div>
              </div>
            ))}
          </div> 
        </div>
    </div>
  )
}

export default PreviewCategorize