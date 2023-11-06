import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../assets'
import { ResponseCategorise, ResponseCloze, ResponseComprehension } from '../components'
import { refresh } from '../assets';

const Responses = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState({})
  const [r, setR] = useState()

  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 
  const fid = pathSegments[4]
  const rid = pathSegments[6]

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
        setR(resData.responses[rid])

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

  console.log(preview)

  return (
    <div className='w-full flex flex-col justify-center items-center'>
    <header className='w-full flex flex-row border-b border-[#e9ecef]'>
                <div className='flex w-full justify-start'>
                    <Link to={`/user/${uid}/dashboard`}>
                        <img src={logo} alt='logo' className="w-44 my-1 ml-2"/>
                    </Link>
                </div>
            </header>
      <div className='flex flex-col w-3/5 my-8'>
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
                </div>
                {q.categoryName=='categorize' && <ResponseCategorise q={q.category} qi={qi} r={r}/>}
                {q.categoryName=='cloze' && <ResponseCloze q={q.category} qi={qi} r={r}/>}
                {q.categoryName=='comprehension' && <ResponseComprehension q={q.category} qi={qi} r={r}/>}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Responses
