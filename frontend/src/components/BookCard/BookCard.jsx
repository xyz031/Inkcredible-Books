import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BookCard({ data, favourite }) {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        'https://inkcredible-books.onrender.com/api/v1/delete-book-from-favourite',
        {},
        { headers }
      );
      alert(response.data.message || 'Book removed from favourites');
    } catch (error) {
      console.error('Error removing book:', error);
      alert('Failed to remove book from favourites');
    }
  };

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col items-center max-w-xs md:max-w-sm'>
      <Link to={`/view-book-details/${data._id}`} className='w-full'>
        <div className='flex flex-col items-center'>
          <div className='bg-zinc-900 flex justify-center rounded overflow-hidden w-full'>
            <img
              className='h-[25vh] w-auto object-cover'
              src={data.url}
              alt={data.title}
            />
          </div>
          <h2 className='mt-4 text-lg md:text-xl text-zinc-200 font-semibold text-center'>
            {data.title}
          </h2>
          <p className='mt-2 text-sm md:text-base text-zinc-400 font-medium text-center'>
            {data.author}
          </p>
          <p className='mt-2 text-lg md:text-xl text-zinc-200 font-semibold text-center'>
            ₹{data.price}
          </p>
        </div>
      </Link>

      {favourite && (
        <button
          className='mt-4 bg-red-600 text-white rounded px-4 py-2 font-semibold hover:bg-red-700 transition duration-200'
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
}
