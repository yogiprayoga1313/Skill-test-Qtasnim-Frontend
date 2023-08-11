import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import { FaBuffer } from "react-icons/fa6";
import http from '../helpers/http';
import { Helmet } from "react-helmet";
import { Formik } from 'formik';


function Home() {
    const [searchParams, setSearchParams] = useSearchParams('')
    const [product, setProduct] = React.useState([])
    const [typeProduct, setTypeProduct] = React.useState([])
    const [addProduct, setAddProduct] = React.useState(false)
    const [sortBy, setSortBy] = React.useState('ASC')


    const getDataProduct = React.useCallback(async () => {
        const { data } = await http().get(`/products?${searchParams}&sortBy=${sortBy}&limit=8`)
        setProduct(data.results)
    }, [searchParams, sortBy])

    React.useEffect(() => {
        getDataProduct()
    }, [getDataProduct])

    React.useEffect(() => {
        async function getDataTypeProduct() {
            const { data } = await http().get('/type_products')
            // console.log(data)
            setTypeProduct(data.results)
        }
        getDataTypeProduct()
    }, [])

    const handleSort = (sortBy) => {
        setSortBy(sortBy)
        // setSort(sort)
        // setMessage(message)

        const elem = document.activeElement;
        elem?.blur();
    }

    const onSearch = (values) => {
        setSearchParams(`search=${values.search}`);

    };

    const addNewProduct = async (values) => {
        try {

            const form = new URLSearchParams(values)
            const { data } = await http().post('/products', form.toString());
            if (data) {
                getDataProduct()
            }

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
            </Helmet>
            <div className='flex flex-col gap-10 mt-20'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div>
                        <span className='text-3xl font-bold text-black'>List All Product</span>
                    </div>
                    <div className='flex justify-center items-center gap-10'>
                        <Formik
                            initialValues={{
                                search: '',
                            }}
                            onSubmit={onSearch}>
                            {({ handleBlur, handleChange, handleSubmit, values }) => (
                                <>
                                    <form className='flex gap-5' onSubmit={handleSubmit}>
                                        <div>
                                            <input type="text"
                                                placeholder="Search..."
                                                className="input text-black input-bordered w-[800px]"
                                                name='search'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.search}
                                            />
                                        </div>
                                        <div>
                                            <button type='submit' className='btn btn-primary st'>
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </Formik>
                        <div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn m-1"><FiMenu /></label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={() => { handleSort('DESC') }}><a className='text-black'>Terbaru</a></li>
                                    <li onClick={() => { handleSort('ASC') }}><a className='text-black'>Terlama</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-10'>
                            <Link onClick={() => setAddProduct(true)} className="btn normal-case">Add Product</Link>
                            {addProduct && <Link onClick={() => setAddProduct(false)} className="btn btn-error normal-case">Close</Link>}
                        </div>
                    </div>
                    {addProduct &&
                        <Formik
                            initialValues={{
                                name_product: '',
                                quantity: '',
                                type_id: ''
                            }}
                            onSubmit={addNewProduct}
                            enableReinitialize
                        >
                            {({ handleSubmit, handleChange, handleBlur, values }) => (
                                <>
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                        <div className='flex flex-col gap-5'>
                                            <span className='text-black font-bold'>Product Name</span>
                                            <input
                                                type="text"
                                                placeholder="Product Name"
                                                className="input input-bordered w-[300px]"
                                                name='name_product'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name_product}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <span className='text-black font-bold'>Qty</span>
                                            <input
                                                type="number"
                                                placeholder="quantity"
                                                className="input input-bordered w-[300px]"
                                                name='quantity'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.quantity}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3 form-control'>
                                            <span className='text-black font-bold'>Type Product</span>
                                            <select
                                                className="select select-primary text-black"
                                                name="type_id"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.type_id}>
                                                {typeProduct.map(item => (
                                                    <>
                                                        <option key={item?.id} value={item?.id}>
                                                            {item?.name_type_product}
                                                        </option>
                                                    </>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <button type='submit' className="btn normal-case">Save</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </Formik>}
                </div>
                <div className='flex justify-center gap-10 '>
                    <div className='grid grid-cols-4 gap-10'>
                        {product && product.map(item => {
                            return (
                                <>
                                    <div key={`items-coy-${item?.id}`} className='flex flex-col justify-center items-center gap-4'>
                                        <div className='bg-gray-300 h-40 w-40 rounded-lg flex justify-center items-center'>
                                            <div className='bg-white w-24 h-24 flex justify-center items-center rounded-full'>
                                                <FaBuffer color='black' size={30} />
                                            </div>
                                        </div>
                                        <div className='text-2xl text-black font-bold hover:text-red-400'>
                                            <Link to={`/products/${item?.id}`}>{item?.name_product}</Link>
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