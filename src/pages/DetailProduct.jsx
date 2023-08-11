import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaBuffer } from "react-icons/fa6";
import http from '../helpers/http';

function DetailProduct() {
  const [detailProduct, setDetailproduct] = React.useState({})
  const { id } = useParams();

  React.useEffect(() => {
    async function getDataDetailProduct() {
        const { data } = await http().get(`/products/${id}`)
        setDetailproduct(data.results)
        // console.log(data)
    }
    getDataDetailProduct()
}, [id])

  return (
    <div className=' flex flex-col gap-10 mt-20'>
      <div className='text-3xl text-black flex justify-center font-bold'>
        <div>Detail Product</div>
      </div>
      <div className='flex justify-center gap-20'>
        <div key={detailProduct?.id} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <span className='text-xl text-black font-bold'>Product Name:</span>
            <span className='text-md text-black'>{detailProduct?.name_product}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl text-black font-bold'>Stock:</span>
            <span className='text-md text-black'>{detailProduct?.quantity}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl text-black font-bold'>Product Type:</span>
            <span className='text-md text-black'>Konsumsi</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl text-black font-bold'>Qty:</span>
            <span className='text-md text-black'>10</span>
          </div>
          <div>
            <Link to="/transactions" className="btn normal-case">Buy Item</Link>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-10'>
            <div className='bg-gray-300 h-[420px] w-[420px] rounded-lg flex justify-center items-center'>
              <div className='bg-white w-[200px] h-[200px] flex justify-center items-center rounded-full'>
                <FaBuffer color='black' size={30} />
              </div>
            </div>
            <div className='flex justify-around'>
              <div>
                <button className="btn normal-case">Delete Product</button>
              </div>
              <div>
                <button className="btn normal-case">Update Stok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct