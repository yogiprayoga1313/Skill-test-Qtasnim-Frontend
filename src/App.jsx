// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailProduct from './pages/DetailProduct'
import Transactions from './pages/Transactions'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<DetailProduct/>}/>
      <Route path='/transactions' element={<Transactions/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
