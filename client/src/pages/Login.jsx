import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({ email:'', password:''})
    const navigate = useNavigate()

    const handleInput = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSignin = async() => {
        setLoading(true)
        try{
        const usersResponse = await fetch('http://localhost:8080/users/get', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });

        if (usersResponse.ok) {
            const usersBody = await usersResponse.json()
            const usersData = usersBody.data
            for(let userData of usersData){
                if(userData.email==user.email && userData.password==user.password){
                    navigate(`/user/${userData._id}/dashboard`)
                    break;
                }
            }
        }
        }catch(err){
            alert(err)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='flex w-full justify-center items-center h-screen'>
        <div class="w-1/4 my-36 text-sm flex flex-col justify-center items-center">
            <div class="border border-gray-300 w-full bg-white shadow-lg rounded p-6">
            <div class="flex flex-col items-center justify-center">
                <p className='font-medium text-xl'>Sign In</p>
            </div>
            <div class="w-full mt-2 text-sm">
                <div class="mb-4">
                    <label className='mb-1'>Email</label>
                    <input name='email' value={user.email} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="email" autofocus/>
                </div>
                <div class="mb-6">
                    <label className='mb-1'>Password</label>
                    <input name='password'value={user.password} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="password" autofocus/>
                </div>
                <div class="mb-6">
                    <div class="flex justify-center items-center">
                        <button className='py-2 w-full bg-[#5e17eb] text-white rounded-sm font-medium' onClick={handleSignin}>Sign In</button>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-center'>
                    <p className='flex w-2/3 items-start'>Not Registered?</p>
                    <Link to={'/signup'} className='w-1/3 flex items-end font-medium cursor-pointer hover:underline'>Sign Up</Link>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login