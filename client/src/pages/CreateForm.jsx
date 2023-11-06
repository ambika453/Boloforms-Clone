import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { grip, plus, del, logo } from '../assets'
import { Categorize, Cloze, Comprehension } from '../components'

const CreateForm = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [form, setForm] = useState({name:'',questions:[]})

  const location = useLocation()
  const navigate = useNavigate()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 

  const setup = async() => {
    setLoading(true)
    try{
      const res = await fetch(`https://boloforms-clone-bakend.vercel.app/users/${uid}/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.ok) {
        const resBody = await res.json()
        const resData = resBody.data
        setUser(resData)
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    setup()
  },[])

  const handleInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleOptions = (e) => {
    const option = e.target.value
    const j = parseInt(e.target.getAttribute('id'))
    const updatedForm = {...form}
    if(option=='categorize'){
      updatedForm.questions[j] = {categoryName:'categorize', category:{}}
    }else if(option=='cloze'){
      updatedForm.questions[j] = {categoryName:'cloze', category:{}}
    }else if(option=='comprehension'){
      updatedForm.questions[j] = {categoryName:'comprehension', category:{}}
    }else{
      updatedForm.questions[j] = {categoryName:'select category', category:{}}
    }
    setForm(updatedForm)
  }

  const handlePlus = (e) => {
    const id = parseInt(e.target.getAttribute('id'))
    const updatedForm = {...form}
    updatedForm.questions.splice(id,0,{categoryName:'select category', category:{}})
    setForm(updatedForm)
  }

  const handleDel = (e) => {
    const id = parseInt(e.target.getAttribute('id'))
    const updatedForm = {...form}
    updatedForm.questions.splice(id,1)
    setForm(updatedForm)
  }

  const updateForm = (index, data) => {
    const updatedForm = {...form}
    updatedForm.questions[index].category = data
    setForm(updatedForm)
  }

  const submitForm = async() => {
    setLoading(true)
    let updatedUser = {...user}
    updatedUser = {...updatedUser, forms:[...updatedUser.forms, form]}
    try{
      const res = await fetch(`http://localhost:8080/users/${uid}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });

      if (res.ok) {
        const resBody = await res.json()
        console.log(resBody.data)
        alert('form created')
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  console.log(form)

  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <header className='w-full flex flex-row border-b border-[#e9ecef]'>
                <div className='flex w-full justify-start'>
                    <Link to={`/user/${uid}/dashboard`}>
                        <img src={logo} alt='logo' className="w-44 my-1 ml-2"/>
                    </Link>
                </div>
            </header>
        <div className='w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col w-3/5 mt-8'>
            <div className='flex flex-row w-full justify-center items-center group'>
            <div>
                <img src={grip} className='w-5 h-5 mx-1 opacity-0'/>
            </div>
            <div className='flex w-11/12 border-l-4 border-l-[#5e17eb] border-b border-r border-[#e5e7eb] rounded shadow'>
                <div className='w-full p-4'>
                <input type='text' name="name" value={form.name} onChange={handleInput} className='w-full text-xl font-normal focus:outline-0 focus:border-b-2 border-[#333333]'/>
                </div>
            </div>
            <div className='flex flex-col py-2 ml-2 opacity-0 group-hover:opacity-100'>
                <img src={plus} className='w-5 h-5 mb-1 cursor-pointer' id={0} onClick={handlePlus}/>
            </div>
            </div>
            <div className='text-sm'>
            {form.questions.map((q,qi)=> (
                <div key={qi} className='flex flex-col w-full items-center justify-center group mt-2'>
                <div className='flex flex-row w-full items-center justify-center'>
                    <div>
                    <img src={grip} className='w-5 h-5 mx-1 cursor-move'/>
                    </div>
                    <div className='flex flex-col w-11/12 border-l-4 border-l-[#5e17eb] border-y border-r border-[#e5e7eb] rounded shadow'>
                    <div className='flex w-full justify-center items-center'>
                        <div className='w-full p-4'>Question {qi+1}</div>
                        <div className='flex w-full justify-center'>
                        <select value={q.categoryName} id={qi} onChange={handleOptions} className='w-1/2 focus:outline-0 text-xs border border-[#33333366] p-1 rounded-sm shadow'>
                            <option value='select category'>Select Category</option>
                            <option value='categorize'>Categorize</option>
                            <option value='cloze'>Cloze</option>
                            <option value='comprehension'>Comprehension</option>
                        </select>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        {q.categoryName=='categorize' && <Categorize qi={qi} updateForm={updateForm}/> }
                        {q.categoryName=='cloze' && <Cloze qi={qi} updateForm={updateForm}/> } 
                        {q.categoryName=='comprehension' && <Comprehension qi={qi} updateForm={updateForm}/> }
                    </div>
                    </div>
                    <div className='flex flex-col py-2 ml-2 opacity-0 group-hover:opacity-100'>
                    <img src={plus} className='w-5 h-5 mb-1 cursor-pointer' id={qi+1} onClick={handlePlus}/>
                    <img src={del} className='w-5 h-5 cursor-pointer' id={qi} onClick={handleDel}/>
                    </div>
                </div>
                </div>
            ))}
            </div>
            <div className='w-full my-8 flex justify-center'>
            <button onClick={submitForm} className='bg-[#5e17eb] rounded-sm text-white text-sm font-medium px-4 py-1'>Save</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CreateForm
