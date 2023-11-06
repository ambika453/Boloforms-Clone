import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Form, Login, Signup, CreateForm, Responses } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/:uid/dashboard' element={<Home />} />
        <Route path='/user/:uid/newform' element={<CreateForm />} />
        <Route path='/user/:uid/form/:fid' element={<Form />} />
        <Route path='/user/:uid/form/:fid/response/:rid' element={<Responses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App