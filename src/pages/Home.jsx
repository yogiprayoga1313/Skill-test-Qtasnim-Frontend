import React from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { FaBuffer } from "react-icons/fa6";
import http from '../helpers/http';

function Home() {
    const [product, setProduct] = React.useState([])

    React.useEffect(() => {
        async function getDataProduct() {
            const { data } = await http().get('/products?limit=8')
            // console.log(data)
            setProduct(data.results)
        }
        getDataProduct()

    }, [])

    return (
        <>
            <div className='flex flex-col gap-10 mt-20'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div>
                        <span className='text-3xl font-bold text-black'>List All Product</span>
                    </div>
                    <div className='flex justify-center items-center gap-10'>
                        <div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-[800px]" />
                        </div>
                        <div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn m-1"><FiMenu /></label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className="btn normal-case">Add Product</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-10 '>
                    <div className='grid grid-cols-4 gap-10'>
                        {product.map(item => {
                            return (
                                <>
                                    <div key={item.id} className='flex flex-col justify-center items-center gap-4'>
                                        <div className='bg-gray-300 h-40 w-40 rounded-lg flex justify-center items-center'>
                                            <div className='bg-white w-24 h-24 flex justify-center items-center rounded-full'>
                                                <FaBuffer color='black' size={30} />
                                            </div>
                                        </div>
                                        <div className='text-2xl text-black font-bold'>
                                            <Link to={`/products/${item.id}`}>{item.name_product}</Link>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home