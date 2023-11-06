import React, { useState, useEffect } from 'react'
import { grip, cancel, plus, del } from '../assets'

const Comprehension = ({ qi, q, updateForm }) => {
  const [comprehension, setComprehension] = useState(q.category)

  const handleInput = (e) => {
    setComprehension({...comprehension, [e.target.name]:e.target.value})
  }

  const handleSubPlus = (e) => {
    const id = parseInt(e.target.getAttribute('id'))
    const updatedComprehension = {...comprehension}
    updatedComprehension.subQuestions.splice(id,0,{description:'', options:[{option:'', selected:false}]})
    setComprehension(updatedComprehension)
  }

  const handleSubDel = (e) => {
    const id = parseInt(e.target.getAttribute('id'))
    const updatedComprehension = {...comprehension}
    updatedComprehension.subQuestions.splice(id,1)
    setComprehension(updatedComprehension)
  }

  const handleSubDescription = (e) => {
    const id = parseInt(e.target.getAttribute('id'))
    const updatedComprehension = {...comprehension}
    updatedComprehension.subQuestions[id].description = e.target.value
    setComprehension(updatedComprehension)
  }

  const handleOptionEnter = (e) => {
    const mid = parseInt(e.target.getAttribute('mid'))
    const updatedComprehension = {...comprehension}
    if(e.key == 'Enter'){
      updatedComprehension.subQuestions[mid].options = [...updatedComprehension.subQuestions[mid].options, {option:'', selected:false}]
    }
    setComprehension(updatedComprehension)
  }

  const handleOptionInput = (e) => {
    const mid = e.target.getAttribute('mid')
    const id = e.target.getAttribute('id')
    const updatedComprehension = {...comprehension}
    updatedComprehension.subQuestions[mid].options[id] = {option:e.target.value, selected:false}
    setComprehension(updatedComprehension)
  }

  const handleRadioClick = (e) => {
    const mid = e.target.getAttribute('mid')
    const id = e.target.getAttribute('id')
    const updatedComprehension = {...comprehension}
    let i=0
    for(i; i<updatedComprehension.subQuestions[mid].options.length; i++){
      if(i==id){
        updatedComprehension.subQuestions[mid].options[id].selected = true
      }else{
        updatedComprehension.subQuestions[mid].options[id].selected = false
      }
    }
    setComprehension(updatedComprehension)
  }

  const handleOptionCancel = (e) => {
    const mid = e.target.getAttribute('mid')
    const id = e.target.getAttribute('id')
    const updatedComprehension = {...comprehension}
    updatedComprehension.subQuestions[mid].options.splice(id,1)
    setComprehension(updatedComprehension)
  }

  useEffect(()=>{
    updateForm(qi,comprehension)
  },[comprehension])

  console.log(comprehension)

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='flex flex-col w-full pl-4 pr-6 items-center justify-center'>
        <div className='w-full pb-2'>
            <input type='text' name='description' value={comprehension.description} onChange={handleInput} placeholder='Description' className='w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
        </div>
        <div className='w-full pb-2'>
            <textarea name='paragraph' value={comprehension.paragraph} onChange={handleInput} placeholder='Paragrpah' className='w-full h-24 border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
        </div>
      </div>
      <div className='w-full pl-3 pr-5'>
        {comprehension.subQuestions && comprehension.subQuestions.map((s,si)=>(
          <div key={si} className='flex flex-col w-full items-center justify-center mb-4 group'>
            <div className='flex flex-row w-full items-center justify-center'>
              <div>
                <img src={grip} className='w-4 h-4 mr-1 cursor-move'/>
              </div>
              <div className='flex flex-col w-full border border-[#e5e7eb] rounded shadow'>
                <div className='flex w-full justify-center items-center'>
                  <div className='w-full p-4'>Question {qi+1}.{si+1}</div>
                </div>
                <div className='flex w-full'>
                <div className='flex flex-col w-full items-center justify-center'>
                  <div className='w-full pb-2 px-4'>
                    <input type='text' id={si} value={s.description} onChange={handleSubDescription} placeholder='Description' className='w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
                  </div>
                  <div className='w-full'>
                    {s.options.map((z,zi)=>(
                      <div className='flex flex-row items-center m-2' key={zi}>
                        <img src={grip} className='w-3 h-3 m-1'/>
                        <input type='radio' mid={si} name={si} id={zi} checked={z.selected} className='mr-2' onClick={handleRadioClick}/>
                        <input type='text' mid={si} id={zi} value={z.option} onChange={handleOptionInput} onKeyDown={handleOptionEnter} className='w-2/5 border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
                        <img src={cancel} mid={si} id={zi} onClick={handleOptionCancel} className={`ml-3 cursor-pointer ${zi==0 && 'opacity-0'}`}/>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              <div className='flex flex-col py-2 ml-2 opacity-0 group-hover:opacity-100'>
                <img src={plus} className='w-4 h-4 mb-1 cursor-pointer' id={si+1} onClick={handleSubPlus}/>
                <img src={del} className='w-4 h-4 cursor-pointer' id={si} onClick={handleSubDel}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comprehension