import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaBuffer } from "react-icons/fa6";
import http from '../helpers/http';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet';

function DetailProduct() {
  const [detailProduct, setDetailproduct] = React.useState({})
  const { id } = useParams();
  const [typeProduct, setTypeProduct] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false)
  const [openModalDelete, setOpenModalDelete] = React.useState(false)
  const [openModalBuy, setOpenModalBuy] = React.useState(false)

  const navigate = useNavigate()


  // React.useEffect(() => {
  //   async function getDataDetailProduct() {
  //     const { data } = await http().get(`/products/${id}`)
  //     setDetailproduct(data.results)
  //     console.log(data.results)
  //   }
  //   getDataDetailProduct()
  // }, [id])

  const getDetailProduct = React.useCallback(async () => {
    const { data } = await http().get(`/products/${id}`)
    setDetailproduct(data.results)
  }, [id])

  React.useEffect(() => {
    getDetailProduct()
  }, [getDetailProduct])



  React.useEffect(() => {
    async function getDataTypeProduct() {
      const { data } = await http().get('/type_products')
      // console.log(data)
      setTypeProduct(data.results)
    }
    getDataTypeProduct()
  }, [])

  const updateProduct = async (values) => {
    try {
      const form = new URLSearchParams(values)
      const { data } = await http().patch(`/stok/${id}`, form.toString());
      if (data) {
        setOpenModal(false)
        getDetailProduct()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTransactions = async (values) => {
    try {
      const form = new URLSearchParams(values)
      const { data } = await http().post('/transactions', form.toString());
      console.log(data)
      if (data) {
        setOpenModal(false)
        getDetailProduct()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModalBuy = () => {
    setOpenModalBuy(true)
  }
  const handleCloseModalBuy = () => {
    setOpenModalBuy(false)
  }
  const handleDeleteModalOpen = () => {
    setOpenModalDelete(true)
  }
  const handleDeleteModalClose = () => {
    setOpenModalDelete(false)
  }



  const handleDelete = async (id) => {
    const { data } = await http().delete(`/products/${id}`)
    if (data) {
      navigate('/')
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Detail</title>
      </Helmet>
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
              <span className='text-md text-black'>{detailProduct?.name_type_product}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl text-black font-bold'>Qty Sold:</span>
              <span className='text-md text-black'>{detailProduct?.quantity_sold}</span>
            </div>
            <div>
              <button onClick={handleOpenModalBuy} htmlFor="my_modal_7" className="btn normal-case">Buy Item</button>
              <input type="checkbox" id="my_modal_7" className="modal-toggle" checked={openModalBuy} />
              <div className="modal">
                <div className="modal-box bg-white">
                  <h3 className="font-bold text-lg text-black mb-10">Buy Product</h3>
                  <Formik
                    initialValues={{
                      product_id: detailProduct?.id,
                      quantity_sold: '',
                      date_transaction: ''
                    }}
                    onSubmit={createTransactions}
                    enableReinitialize
                  >
                    {({ handleBlur, handleChange, handleSubmit, values }) => (
                      <>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                          <div className='flex flex-col gap-5'>
                            <span className='text-black font-bold'>Product Id</span>
                            <input
                              type="text"
                              placeholder="name_product"
                              className="input input-bordered w-full"
                              name='product_id'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.product_id}
                            />
                          </div>
                          <div className='flex flex-col gap-5'>
                            <div>
                              <span className='font-bold text-black text-md'>Date</span>
                            </div>
                            <div>
                              <input
                                name='date_transaction'
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date_transaction} />
                            </div>
                          </div>
                          <div className='flex flex-col gap-5'>
                            <span className='text-black font-bold'>Qty</span>
                            <input
                              type="number"
                              placeholder="quantity"
                              className="input input-bordered w-full"
                              name='quantity_sold'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.quantity_sold}
                            />
                          </div>
                          <div className="modal-action">
                            <button type='submit' className="btn btn-secondary">Save</button>
                            <button type='button' onClick={handleCloseModalBuy} htmlFor="my_modal_7" className="btn">Close!</button>
                          </div>
                        </form>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
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
                  <button onClick={handleDeleteModalOpen} htmlFor="my_modal_5" className="btn normal-case">Delete Product</button>
                  <input type="checkbox" id="my_modal_5" className="modal-toggle" checked={openModalDelete} />
                  <div className="modal">
                    <div className="modal-box bg-white">
                      <h3 className="font-bold text-lg text-black">Delete Product!</h3>
                      <p className="py-4 text-error">Are You Sure for Delete Product?</p>
                      <div className="modal-action">
                        <button onClick={() => handleDelete(id)} className="btn btn-error">Delete</button>
                        <button onClick={handleDeleteModalClose} htmlFor="my_modal_5" className="btn">Close!</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={handleOpenModal} htmlFor="my_modal_6" className="btn normal-case">Update Stok</button>
                  <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={openModal} />
                  <div className="modal">
                    <div className="modal-box bg-white">
                      <h3 className="font-bold text-lg text-black mb-10">Update Stok</h3>
                      <Formik
                        initialValues={{
                          name_product: detailProduct?.name_product,
                          product_id: detailProduct?.product_id,
                          quantity: detailProduct?.quantity
                        }}
                        onSubmit={updateProduct}
                        enableReinitialize
                      >
                        {({ handleBlur, handleChange, handleSubmit, values }) => (
                          <>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                              <div className='flex flex-col gap-5'>
                                <span className='text-black font-bold'>Product Name</span>
                                <input
                                  type="text"
                                  placeholder="name_product"
                                  className="input input-bordered w-full"
                                  name='name_product'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.name_product}
                                />
                              </div>
                              <div className='flex flex-col gap-5'>
                                <span className='text-black font-bold'>Product Type</span>
                                <select
                                  className="select select-primary text-black"
                                  name="product_id"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.product_id}>
                                  {typeProduct.map(item => (
                                    <>
                                      <option key={item.id} value={item.id}>
                                        {item.name_type_product}
                                      </option>
                                    </>
                                  ))}
                                </select>
                              </div>
                              <div className='flex flex-col gap-5'>
                                <span className='text-black font-bold'>Qty</span>
                                <input
                                  type="number"
                                  placeholder="quantity"
                                  className="input input-bordered w-full"
                                  name='quantity'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.quantity}
                                />
                              </div>
                              <div className="modal-action">
                                <button type='submit' className="btn btn-secondary">Save</button>
                                <button type='button' onClick={handleCloseModal} htmlFor="my_modal_6" className="btn">Close!</button>
                              </div>
                            </form>
                          </>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduct