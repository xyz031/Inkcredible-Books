import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaExternalLinkSquareAlt, FaRegUser, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AllOrders() {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: '' });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'https://inkcredible-books.onrender.com/api/v1/get-all-orders',
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `https://inkcredible-books.onrender.com/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <>
          <div className='p-0 md:p-4 text-zinc-100'>
            <div className='flex flex-col items-center'>
              <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
                All Orders
              </h1>

              {/* Header Row for Larger Screens */}
              <div className='hidden md:grid grid-cols-5 bg-zinc-800 w-full rounded py-2 px-8 gap-4'>
                <div className='text-center font-semibold'>Sr.</div>
                <div className='text-center font-semibold'>Books</div>
                <div className='text-center font-semibold'>Description</div>
                <div className='text-center font-semibold'>Price</div>
                <div className='text-center font-semibold'>Status</div>
              </div>

              {/* Order Rows */}
              {AllOrders.map((items, i) => (
                <div
                  key={i}
                  className='flex flex-col md:grid md:grid-cols-5 bg-zinc-800 w-full rounded py-2 px-4 md:px-8 gap-4 my-2 hover:bg-zinc-900 hover:cursor-pointer'
                >
                  {/* Mobile View: Order Details */}
                  <div className='flex flex-col md:hidden text-center'>
                    <div className='font-semibold'>Order #{i + 1}</div>
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className='hover:text-blue-300'
                    >
                      {items.book.title}
                    </Link>
                    <div>{items.book.desc.slice(0, 50)}...</div>
                    <div>Price: ₹ {items.book.price}</div>
                  </div>

                  {/* Desktop View */}
                  <div className='hidden md:block text-center'>{i + 1}</div>
                  <div className='hidden md:block text-center'>
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className='hover:text-blue-300'
                    >
                      {items.book.title}
                    </Link>
                  </div>
                  <div className='hidden md:block text-center'>
                    {items.book.desc.slice(0, 50)} ...
                  </div>
                  <div className='hidden md:block text-center'>₹ {items.book.price}</div>

                  {/* Status */}
                  <div className='text-center'>
                    <button
                      className='hover:scale-105 transition-all duration-300'
                      onClick={() => setOptions(i)}
                    >
                      {items.status === 'Order placed' ? (
                        <span className='text-yellow-500'>{items.status}</span>
                      ) : items.status === 'Canceled' ? (
                        <span className='text-red-500'>{items.status}</span>
                      ) : (
                        <span className='text-green-500'>{items.status}</span>
                      )}
                    </button>

                    {/* Status Options */}
                    <div className={`${Options === i ? 'block' : 'hidden'}`}>
                      <select
                        name='status'
                        className='bg-gray-800 mt-2'
                        onChange={change}
                      >
                        {[
                          'Order placed',
                          'Out for delivery',
                          'Delivered',
                          'Canceled',
                        ].map((status, index) => (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className='text-green-500 hover:text-pink-600 mx-2'
                        onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
