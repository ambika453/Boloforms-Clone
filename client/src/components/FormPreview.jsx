import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PreviewCategorize, PreviewCloze, PreviewComprehension } from '../components'
import { refresh } from '../assets';

const FormPreview = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState({})

  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 
  const fid = pathSegments[4]

  const setup = async() => {
    setLoading(true)
    try{
      const res = await fetch(`https://boloforms-clone-bakend.vercel.app/users/${uid}/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const resBody = await res.json()
        const resData = resBody.data
        const resForms = resBody.data.forms
        setUser(resData)

        for(let i=0; i<resForms.length; i++){
            if(resForms[i]._id==fid){
                setPreview(resForms[i])
                break
            }
        }
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

  const updatePreview = (index, data) => {
    const updatedPreview = {...preview}
    updatedPreview.questions[index].category = data
    setPreview(updatedPreview)
  }

  const submitForm = async() => {
    setLoading(true)
    let updatedUser = {...user}
    updatedUser = {...updatedUser, responses:[...updatedUser.responses, {form_id: fid, email:user.email, response:preview}]}
    try{
      const res = await fetch(`https://boloforms-clone-bakend.vercel.app/users/${uid}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });

      if (res.ok) {
        const resBody = await res.json()
        console.log(resBody.data)
        alert('Form Submitted')
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  console.log(preview)

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col w-3/5 mt-8'>
        <div className='flex flex-row w-full justify-center items-center'>
          <div className='flex w-11/12 border-l-4 border-l-[#5e17eb] border-t-2 border-t-[#5e17eb] border-b border-r border-[#e5e7eb] rounded shadow'>
            <div className='w-full p-4'>
              <p className='w-full text-xl font-normal focus:outline-0 focus:border-b-2 border-[#333333]'>{preview.name}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center text-sm'>
            {preview.questions && preview.questions.map((q,qi)=>(
              <div key={qi} className='flex flex-col mt-2 w-11/12 border-l-4 border-l-[#5e17eb] border-y border-r border-[#e5e7eb] rounded shadow'>
                <div className='flex flex-row w-full justify-center items-center'>
                  <div className='w-full px-4 pt-4 pb-3'>Question {qi+1}</div>
                  <img src={refresh} className='w-5 h-5 mr-8 cursor-pointer'/>
                </div>
                {q.categoryName=='categorize' && <PreviewCategorize q={q.category} qi={qi} updatePreview={updatePreview}/>}
                {q.categoryName=='cloze' && <PreviewCloze q={q.category} qi={qi} updatePreview={updatePreview}/>}
                {q.categoryName=='comprehension' && <PreviewComprehension q={q.category} qi={qi} updatePreview={updatePreview}/>}
              </div>
            ))}
        </div>
      </div>
      <div className='w-full mt-6 mb-12 flex justify-center'>
          <button onClick={submitForm} className='bg-[#5e17eb] rounded-sm text-white text-sm font-medium px-4 py-1'>Submit</button>
      </div>
    </div>
  )
}

export default FormPreview
