import React, {useState, useEffect, useRef } from 'react'
import { underline, cancel, grip } from '../assets'

const Cloze = ({ qi, q, updateForm }) => {
  const [cloze, setCloze] = useState(q.category)
  const [blanks, setBlanks] = useState(q.category.options)
  const [blankOpt, setBlankOpt] = useState([''])
  const [optionExists, setOptionExists] = useState({status:false, id:0})

  const inputRef = useRef(null)

  useEffect(()=>{
    if(blanks){
      let updatedNewBlanks = []
      let i=0
      let j=0
      for(i=0; i<blanks.length; i++){
        updatedNewBlanks = [...updatedNewBlanks, {option:blanks[i].option, selected:true}]
      }
      for(j=0; j<blankOpt.length; j++){
        updatedNewBlanks = [...updatedNewBlanks, {option:blankOpt[j], selected:false}]
      }
      setCloze({...cloze, options:updatedNewBlanks})
    }
  },[blankOpt, blanks])

  const handleInput = (e) => {
    setCloze({...cloze, sentence:e.target.value, preview:e.target.value})
  }

  const handleDescription = (e) => {
    setCloze({...cloze, description:e.target.value})
  }

  const handleSelect = (e) => {
    const inputElement = inputRef.current;
    const selectionStart = inputElement.selectionStart;
    const selectionEnd = inputElement.selectionEnd;
    const inputValue = cloze.preview
    const beforeSelection = inputValue.substring(0, selectionStart);
    const selectedText = inputValue.substring(selectionStart, selectionEnd);
    const selectedTextP = cloze.sentence.substring(selectionStart, selectionEnd);
    const afterSelection = inputValue.substring(selectionEnd);
    const selectionLength = selectionEnd - selectionStart
    const underlinedText = `${beforeSelection}${'_'.repeat(selectionLength)}${afterSelection}`;
    setCloze({...cloze, preview:underlinedText})
    let matchFound = false
    for(const blank of blanks){
      console.log(blank)
      if(blank.option==selectedTextP && blank.s==selectionStart && blank.e==selectionEnd){
          matchFound = true
          break
        }
    }
    if(!matchFound){
      setBlanks(prev=>[...prev, {option:selectedTextP,s:selectionStart, e:selectionEnd, selected:true}])
    }
    if(blankOpt.includes(selectedText)){
      let i=0
      for(i=0; i<blankOpt.length; i++){
        if(blankOpt[i]==selectedText){
          setOptionExists({status:true, id:i})
        }
      }
    }
  }
  
  const handleOptionInput = (e) => {
    if(e.key == 'Enter'){
      setBlankOpt(prev => [...prev,''])
    }
  }

  const handleBlankCancel = (e) => {
    const id = e.target.getAttribute('id')
    const updatedBlanks = [...blanks]
    const selectedBlank = updatedBlanks[id]
    const inputValue = cloze.preview
    const beforeSelection = inputValue.substring(0, selectedBlank.s);
    const afterSelection = inputValue.substring(selectedBlank.e);
    const underlinedText = `${beforeSelection}${selectedBlank.option}${afterSelection}`
    console.log(underlinedText)
    updatedBlanks.splice(id,1)
    setCloze({...cloze, preview:underlinedText})
    setBlanks(updatedBlanks)
    
    let i=0
    for(const blank in blanks){
      if(blankOpt.includes(blank.option)){
        setOptionExists({status:true, id:i})
      }
      i++
    }
  }

  const handleBlankOnChange = (e) => {
    const id = e.target.getAttribute('id')
    let i=0
    const updatedBlankOpt = [...blankOpt]
    updatedBlankOpt[id] = e.target.value
    setBlankOpt(updatedBlankOpt)

    for(i=0; i<blanks.length; i++){
      if(blanks[i].option==e.target.value){
        setOptionExists({status:true, id:i})
        break
      }
    }
    if(i==blanks.length){
      setOptionExists({status:false, id:0})
    }
  }

  const handleOptCancel = (e) => {
    const id = e.target.getAttribute('id')
    const updatedBlankOpt = [...blankOpt]
    updatedBlankOpt.splice(id,1)
    setBlankOpt(updatedBlankOpt)
  }

  useEffect(()=>{
    updateForm(qi,cloze)
  },[cloze])

  console.log(cloze)

  return (
    <div className='flex flex-col w-full pl-4 pb-3 pt-2'>
      <div className='w-full flex flex-col pb-2 pr-10 mb-3'>
        <input type='text' value={cloze.description} onChange={handleDescription} placeholder='Description' className='w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
      </div>
      <div className='flex flex-col w-full pb-2 pr-10'>
        <div className='w-full mb-2'>Preview</div>
        <input type='text' disabled value={cloze.preview} className={`w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow`}/>
      </div>
      <div className='flex flex-col w-full py-2 pr-10'>
        <div className='w-full mb-2'>Sentence</div>
        <img src={underline} className='w-4 border border-black mb-1 hover:bg-[#33333333]' onClick={handleSelect}/>
        <input type='text' ref={inputRef} value={cloze.sentence} onChange={handleInput} className='w-full border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
      </div>
      <div className='flex flex-col w-2/3 py-2'>
        <div className='w-full mb-2'>Options</div>
        <ul>
          {blanks && blanks.map((i,ki)=>(
            <div className='flex flex-row items-center w-1/2 mb-2' key={ki}>
              <img src={grip} className='w-4 h-4'/>
              <input type='checkbox' value={i.option} checked={i.selected} readOnly className='border border-[#33333366] p-1 mx-2'/>
              <input type='text' value={i.option} readOnly className='border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow'/>
              <img src={cancel} id={ki} className='ml-3' onClick={handleBlankCancel}/>
            </div>
          ))}
          {blankOpt.map((i,ki)=>(
            <div className='flex flex-row w-1/2 mb-2 items-center' key={ki}>
              <img src={grip} className='w-4 h-4'/>
              <input type='checkbox' value={i} className='border border-[#33333366] mx-2'/>
              <input type='text' value={i} id={ki} placeholder={`Option ${blanks && ki+blanks.length+1}`} onChange={handleBlankOnChange} onKeyDown={handleOptionInput} className={`${optionExists.status && optionExists.id==ki && 'border border-[#d90429]'} border border-[#33333366] px-2 py-1 rounded-sm text-xs focus:outline-0 focus:shadow`}/>
              {blankOpt.length>1 && <img src={cancel} id={ki} className='ml-3' onClick={handleOptCancel}/>}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Cloze