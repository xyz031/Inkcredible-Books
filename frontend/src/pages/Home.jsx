import React from 'react'
import Hero from "../components/Hom/Hero"
import RecentlyAdded from '../components/Hom/RecentlyAdded'

export default function Home() {
  return (
    <div className='bg-zinc-900 text-white px-10 py-12'>
      <Hero />
      <RecentlyAdded/>
      </div>
  )
}
