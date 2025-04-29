import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-zinc-800 text-white px-8 py-6'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
        
        {/* Footer Logo and Year */}
        <h1 className='text-2xl font-semibold text-center md:text-left'>&copy; 2024 InkcredibleBooks</h1>
        
        {/* Footer Navigation Links */}
        <div className='mt-4 md:mt-0 flex flex-col md:flex-row gap-4 text-center'>
        </div>
      </div>
    </footer>
  );
}
