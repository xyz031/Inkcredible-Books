import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

export default function UserOrderHistory() {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'https://inkcredible-books.onrender.com/api/v1/get-order-history',
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='min-h-screen p-4 text-zinc-100 bg-zinc-900'>
      {!OrderHistory && (
        <div className='flex items-center justify-center h-full'>
          <Loader />
        </div>
      )}
      
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='flex flex-col items-center justify-center h-[80vh]'>
          <h1 className='text-4xl font-semibold text-zinc-500'>
            No Order History
          </h1>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>

          {/* Table Header for Larger Screens */}
          <div className='hidden md:flex bg-zinc-800 w-full rounded py-2 px-6'>
            <div className='w-[5%] text-center'>Sr.</div>
            <div className='w-[20%] text-center'>Books</div>
            <div className='w-[40%] text-center'>Description</div>
            <div className='w-[10%] text-center'>Price</div>
            <div className='w-[15%] text-center'>Status</div>
            <div className='w-[10%] text-center'>Mode</div>
          </div>

          {/* Order Rows */}
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className='flex flex-col md:flex-row bg-zinc-800 w-full rounded p-4 my-2 hover:bg-zinc-900'
            >
              {/* Mobile View: Stacked Info */}
              <div className='md:hidden flex flex-col space-y-2'>
                <div className='text-lg font-semibold'>Order #{i + 1}</div>
                <div>
                  <span className='font-semibold'>Book:</span>{' '}
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className='text-blue-400 hover:underline'
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div>
                  <span className='font-semibold'>Description:</span>{' '}
                  {items.book.desc.slice(0, 50)}...
                </div>
                <div>
                  <span className='font-semibold'>Price:</span> ₹{items.book.price}
                </div>
                <div>
                  <span className='font-semibold'>Status:</span>{' '}
                  <span
                    className={`${
                      items.status === 'Order placed'
                        ? 'text-yellow-500'
                        : items.status === 'Canceled'
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {items.status}
                  </span>
                </div>
                <div>
                  <span className='font-semibold'>Mode:</span> COD
                </div>
              </div>

              {/* Desktop View */}
              <div className='hidden md:flex w-full justify-between items-center text-center'>
                <div className='w-[5%]'>{i + 1}</div>
                <div className='w-[20%]'>
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className='text-blue-400 hover:underline'
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className='w-[40%]'>{items.book.desc.slice(0, 50)}...</div>
                <div className='w-[10%]'>₹{items.book.price}</div>
                <div
                  className={`w-[15%] font-semibold ${
                    items.status === 'Order placed'
                      ? 'text-yellow-500'
                      : items.status === 'Canceled'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {items.status}
                </div>
                <div className='w-[10%] text-zinc-400'>COD</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
