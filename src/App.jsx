// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailProduct from './pages/DetailProduct'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/detailProduct' element={<DetailProduct/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
