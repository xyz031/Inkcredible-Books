import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoLanguageSharp } from 'react-icons/io5';
import { FaShoppingCart, FaHeart} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function ViewBookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
    id: localStorage.getItem('id')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://inkcredible-books.onrender.com/api/v1/get-books-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        'https://inkcredible-books.onrender.com/api/v1/add-book-to-favourite',
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding to favourites:', error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        'https://inkcredible-books.onrender.com/api/v1/add-to-cart',
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v1/delete-book/${id}`, { headers });
      alert(response.data.message || 'Book deleted successfully');
      navigate('/all-books');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  if (loading) {
    return (
      <div className='h-screen bg-zinc-900 flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='px-4 min-h-screen md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
      {data ? (
        <>
          <div className='w-full lg:w-3/6 flex justify-center'>
            <div className='bg-zinc-800 p-6 rounded flex justify-center relative'>
              <img
                src={data.url}
                alt={data.title}
                className='h-[50vh] lg:h-[70vh] rounded object-cover'
              />
              {isLoggedIn && role === 'user' && (
                <div className='absolute top-4 right-4 flex flex-col gap-4'>
                  <button
                    onClick={handleFavourite}
                    className='bg-black rounded-full text-red-500 text-3xl p-3 '
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={handleCart}
                    className='bg-black rounded-full text-blue-500 text-3xl p-3 mt-2'
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {isLoggedIn && role === 'admin' && (
                <div className='absolute top-4 right-4 flex flex-col gap-4'>
                  <Link
                    to={`/updateBook/${id}`}
                    className='bg-black rounded-full text-white text-3xl p-3'
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={deleteBook}
                    className='bg-black rounded-full text-red-500 text-3xl p-3 mt-2'
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
            <p className='text-zinc-500 mt-4 text-xl'>{data.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
            <p className='flex items-center text-zinc-400 mt-4 text-lg'>
              <IoLanguageSharp className='mr-2' /> {data.language}
            </p>
            <p className='text-2xl text-zinc-200 font-semibold mt-4'>₹{data.price}</p>
          </div>
        </>
      ) : (
        <div className='text-center text-zinc-200'>
          <p>Book details not found.</p>
        </div>
      )}
    </div>
  );
}
