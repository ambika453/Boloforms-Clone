import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
            fname: '',
            lname: '',
            email: '',
            number: 0,
            area1: '',
            area2: '',
            county: '',
            city: '',
            state: '',
            pincode: 0,
            password: '',
            bookmarks: [],
            carts: []
    })
    const navigate = useNavigate()

    const handleInput = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSignup = async() => {
        setLoading(true)
        try{
        const userResponse = await fetch('http://localhost:8080/users/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (userResponse.ok) {
            const userBody = await userResponse.json()
            const userData = userBody.data
            navigate(`/user/${userData._id}/dashboard`)
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
                <p className='font-medium text-xl pb-2'>Sign Up</p>
            </div>
            <div class="w-full mt-4 text-sm">
                <div className='mb-2 flex flex-row'>
                    <div className='mr-2'>
                        <label className='mb-1'>First Name</label>
                        <input name='fname' value={user.fname} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="text" autofocus/>
                    </div>
                    <div className='ml-2'>
                        <label className='mb-1'>Last Name</label>
                        <input name='lname' value={user.lname} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="text" autofocus/>
                    </div>
                </div>
                <div class="mb-2">
                    <label className='mb-1'>Email</label>
                    <input name='email' value={user.email} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="email" autofocus/>
                </div>
                <div class="mb-6">
                    <label className='mb-1'>Password</label>
                    <input name='password'value={user.password} onChange={handleInput} class="w-full rounded-sm px-3 border border-gray-300 py-1 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="password" autofocus/>
                </div>
                <div class="mb-6">
                    <div class="flex justify-center items-center">
                        <button className='py-2 w-full bg-[#5e17eb] text-white rounded-sm font-medium' onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-center'>
                    <p className='flex w-2/3 items-start'>Registered Already?</p>
                    <Link to={'/'} className='w-1/3 flex items-end font-medium cursor-pointer hover:underline'>Sign In</Link>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Signup