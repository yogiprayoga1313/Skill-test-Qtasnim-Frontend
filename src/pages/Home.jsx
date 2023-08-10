import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='bg-red-500 text-2xl'>Home</div>
            <span className='bg-blue-500'>hallo</span>
            <Link to='/detailProduct'>Detail</Link>
        </>
    )
}

export default Home