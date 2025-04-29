import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function Cart() {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('https://inkcredible-books.onrender.com/api/v1/get-user-cart', { headers });
      setCart(res.data.message);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const total = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const deleteItem = async (bookid) => {
    try {
      const res = await axios.put(
        `https://inkcredible-books.onrender.com/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      setCart(Cart.filter(item => item._id !== bookid));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const orderRes = await axios.post(
        'https://inkcredible-books.onrender.com/api/v1/create-razorpay-order',
        { amount: Total },
        { headers }
      );
      const { order } = orderRes.data;
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Bookstore Payment',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            'https://inkcredible-books.onrender.com/api/v1/verify-razorpay-payment',
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers }
          );
          if (verifyRes.data.status === 'Success') {
            const placeOrderRes = await axios.post(
              'https://inkcredible-books.onrender.com/api/v1/place-order',
              { order: Cart },
              { headers }
            );
            toast.success('Payment successful! ' + placeOrderRes.data.message);
            navigate('/profile/orderHistory');
          } else {
            toast.error('Payment verification failed!');
          }
        },
        prefill: {
          email: localStorage.getItem('email') || '',
        },
        theme: {
          color: '#6366f1',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Payment failed!');
      console.error(error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-2 md:px-8 py-8">
      <div className="max-w-5xl mx-auto w-full">
        {!Cart && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {Cart && Cart.length === 0 && (
          <div className="h-[60vh] flex items-center justify-center flex-col">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-400 text-center">Empty Cart</h1>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-100 mb-8 text-center tracking-tight drop-shadow-lg">Your Cart</h1>
            <div className="flex flex-col gap-6">
              {Cart.map((item, i) => (
                <div
                  className="w-full rounded-2xl flex flex-col md:flex-row p-4 bg-zinc-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 items-center gap-4"
                  key={i}
                >
                  <img src={item.url} alt={item.title} className="h-40 w-32 object-contain rounded-xl bg-zinc-900" />
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl text-zinc-100 font-bold mb-2">{item.title}</h1>
                      <p className="text-base md:text-lg text-zinc-300 mb-2 line-clamp-2">{item.desc.slice(0, 100)}...</p>
                    </div>
                    <div className="w-full md:w-32 text-2xl text-yellow-200 font-semibold text-center">₹ {item.price}</div>
                  </div>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded-full p-3 hover:bg-red-200 transition-all mt-4 md:mt-0"
                    onClick={() => deleteItem(item._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-end gap-4">
              <div className="p-6 bg-zinc-800 rounded-2xl shadow-lg w-full md:w-1/2">
                <h1 className="text-3xl text-zinc-200 font-bold mb-4 text-center md:text-left">Total Amount</h1>
                <div className="flex items-center justify-between text-xl text-zinc-200 mb-4">
                  <h2>{Cart.length} books</h2>
                  <h2>₹ {Total}</h2>
                </div>
                <button
                  className="w-full bg-yellow-100 text-zinc-900 font-bold rounded-lg px-6 py-3 mt-2 hover:bg-yellow-200 transition-all text-lg shadow"
                  onClick={handleRazorpayPayment}
                >
                  Pay with Razorpay
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
