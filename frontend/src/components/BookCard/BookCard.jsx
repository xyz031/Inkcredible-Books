import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

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
      toast.success(response.data.message || 'Book removed from favourites');
    } catch (error) {
      console.error('Error removing book:', error);
      toast.error('Failed to remove book from favourites');
    }
  };

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col items-center w-full h-full">
      <Link to={`/view-book-details/${data._id}`} className="w-full flex-1 flex flex-col items-center">
        <div className="bg-zinc-900 flex justify-center items-center rounded-xl overflow-hidden w-full aspect-[3/4] mb-4">
          <img
            className="h-48 w-auto object-contain max-w-full max-h-full transition-transform duration-300 hover:scale-105"
            src={data.url}
            alt={data.title}
          />
        </div>
        <h2 className="mt-2 text-lg md:text-xl text-zinc-100 font-bold text-center line-clamp-2 min-h-[2.5rem]">{data.title}</h2>
        <p className="mt-1 text-sm md:text-base text-zinc-400 font-medium text-center line-clamp-1">{data.author}</p>
        <p className="mt-2 text-xl text-yellow-200 font-semibold text-center">₹{data.price}</p>
      </Link>
      {favourite && (
        <button
          className="mt-4 bg-red-600 text-white rounded px-4 py-2 font-semibold hover:bg-red-700 transition duration-200 w-full"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
}
