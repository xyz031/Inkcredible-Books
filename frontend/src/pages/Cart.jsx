import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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
      console.log(res);
      setCart(Cart.filter(item => item._id !== bookid));
    } catch (error) {
      console.error(error);
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        'https://inkcredible-books.onrender.com/api/v1/place-order',
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-auto min-h-screen py-8">
      {!Cart && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          {Cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto flex-1 flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-1">
                  <h1 className="text-2xl text-zinc-100 font-semibold px-5">{item.title}</h1>
                  <p className="text-normal text-zinc-300 mt-2 px-5 hidden lg:block">
                    {item.desc.slice(0, 100)}...
                  </p>
                </div>
                <div className="w-full md:w-32 mt-4 md:mt-0 md:ml-4 text-2xl text-zinc-100 font-semibold text-center">
                  ₹ {item.price}
                </div>
              </div>
              <button
                className="bg-red-100 text-red-700 border border-red-700 rounded p-2 mt-4 md:mt-0"
                onClick={() => deleteItem(item._id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2>
              <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full" onClick={PlaceOrder}>
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
