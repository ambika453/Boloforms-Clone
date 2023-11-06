import React, { useState, useEffect } from 'react'
import { logo } from '../assets'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})

    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const uid = pathSegments[2] 

    const setup = async() => {
        setLoading(true)
        try{
          const res = await fetch(`https://boloforms-clone-bakend.vercel.app/${uid}/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (res.ok) {
            const resBody = await res.json();
            setUser(resBody.data);
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
        <div>
            <header className='flex flex-row border-b border-[#e9ecef]'>
                <div className='flex w-full justify-start'>
                    <Link to={`/user/${uid}/dashboard`}>
                        <img src={logo} alt='logo' className="w-44 my-1 ml-2"/>
                    </Link>
                </div>
                <div className='flex justify-end items-center w-full mr-10'>
                    <Link to={`/user/${uid}/newform`} className='group'>
                        <button className='flex flex-row items-center justify-center py-1 px-2 rounded border-2 border-[#5e17eb] group-hover:bg-[#5e17eb]'>
                            <h1 className='text-[#5e17eb] text-sm font-semibold group-hover:text-[#ffffff]'>Create Form </h1>
                        </button>
                    </Link>
                </div>
            </header>
            <div className='w-full flex flex-col justify-center items-center mt-12'>
              <div className='w-2/3 font-bold rounded flex justify-center py-1 mb-6'>ALL FORMS</div>
                  <div className='w-1/3 my-1 border text-[#5e17eb] border-[#5e17eb] rounded flex justify-center py-1'>
                    { user && user.forms && user.forms.length>0 ? (
                        <div>
                        {user && user.forms && user.forms.map((f,fi)=>(
                          <Link to={`/user/${uid}/form/${f._id}`}>
                            <div>{f.name}</div>
                          </Link>
                        ))}
                      </div>
                    ) : 
                      (
                        <div>No Forms Created</div>
                      )
                    } 
                  </div>
            </div>
        </div>
    )
}

export default Home
