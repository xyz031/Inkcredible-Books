import React from 'react';
import { Link } from 'react-router-dom';
import image from '../image/boy.png';

export default function Hero() {
  return (
    <div className='h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16'>
      {/* Text Section */}
      <div className='w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left leading-snug'>
          Discover Your Great Read
        </h1>
        <p className='mt-4 text-lg md:text-xl text-zinc-300 text-center lg:text-left max-w-lg'>
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <Link 
            to="/all-books" 
            className='text-yellow-100 text-lg md:text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 py-2 hover:bg-yellow-100 hover:text-zinc-800 rounded transition-all duration-300'>
            Discover Books
          </Link>
        </div>
      </div>
      
      {/* Image Section */}
      <div className='w-full lg:w-3/6 flex items-center justify-center'>
        <img 
          src={image} 
          alt='Illustration of a person reading a book' 
          className='w-full max-w-md h-auto object-contain'
        />
      </div>  
    </div>
  );
}
