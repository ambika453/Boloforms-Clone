import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const FormResponses = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 
  const fid = pathSegments[4]

  const setup = async() => {
    setLoading(true)
    try{
      const res = await fetch(`http://localhost:8080/users/${uid}/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <div className='w-full flex flex-col justify-center items-center mt-12'>
      <div className='w-2/3 font-bold rounded flex justify-center py-1 mb-6'>ALL RESPONSES</div>
      <div className='w-1/3 my-1 border text-[#5e17eb] border-[#5e17eb] rounded flex justify-center py-1'>
        {user.responses && user.responses.map((r,ri)=>(
          <Link to={`/user/${uid}/form/${fid}/response/${ri}`}><div>{r.email}</div></Link>
        ))}
      </div>
    </div>
  )
}

export default FormResponses