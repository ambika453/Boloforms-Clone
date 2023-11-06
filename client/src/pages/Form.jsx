import React, { useState, useEffect } from 'react'
import { logo } from '../assets'
import { Link, useLocation } from 'react-router-dom'
import { FormBuilder, FormPreview, FormResponses } from '../components'

const Form = () => {
    const [loading, setLoading] = useState(false)
    const [component, setComponent] = useState(1)
    const [user, setUser] = useState({})

    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const uid = pathSegments[2] 
    
    const handleComponent = (e) => {
        const compValue = e.target.getAttribute('value')
        setComponent(compValue)
    }

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

    console.log(user)

    return (
        <div>
            <header className='flex flex-row border-b text-sm'>
                <div className='flex w-1/4 justify-start'>
                    <Link to={`/user/${uid}/dashboard`}>
                        <img src={logo} alt='logo' className="w-44 my-1 ml-2"/>
                    </Link>
                </div>
                <div className='flex justify-center items-end w-2/4'>
                    <ul className='flex flex-row w-full justify-center font-medium'>
                        <li className={`px-8 pb-1 cursor-pointer ${component==1 ? `border-b-2 border-[#5e17eb]` : null}`} value='1' onClick={handleComponent}>Edit</li>
                        <li className={`px-8 pb-1 cursor-pointer ${component==2 ? `border-b-2 border-[#5e17eb]` : null}`} value='2' onClick={handleComponent}>Preview</li>
                        <li className={`px-8 pb-1 cursor-pointer ${component==3 ? `border-b-2 border-[#5e17eb]` : null}`} value='3' onClick={handleComponent}>Responses</li>
                    </ul>
                </div>
                <div className='flex w-1/4 justify-end items-center'>
                    <div className='flex justify-center mr-10 group'>
                        <button className='px-3 py-1 border-2 text-[#5e17eb] font-semibold rounded border-[#5e17eb] group-hover:bg-[#5e17eb]'><span className='group-hover:text-white'>Send</span></button>
                    </div>
                </div>
            </header>
            <main>
                {component==1 ? <FormBuilder/> : null}
                {component==2 ? <FormPreview /> : null}
                {component==3 ? <FormResponses/> : null}
            </main>
        </div>
    )
}

export default Form
