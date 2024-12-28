import Image from 'next/image'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-[25%] shrink-0 hidden md:flex items-center bg-white border-primary/20 border-2  rounded-2xl py-2 px-4'>
      <input className='outline-none border-transparent bg-transparent rounded-lg w-full  px-2' type="text" placeholder='Search...'/>
      <Image src={'/search.png'} width={20} height={20} alt='search' className='mr-2'/>
    </div>
  )
}

export default SearchBar

