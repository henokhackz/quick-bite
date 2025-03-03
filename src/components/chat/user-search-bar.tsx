import { SearchIcon } from 'lucide-react'
import React from 'react'

const UserSearch = () => {
  return (
    <div className='w-full px-4 py-2 flex gap2'>
        <input className='text-gray-500 text-sm focus:outline-none focus:border-b-2 focus:border-primary/20  '/>
        <SearchIcon size={20} className='ml-2'/>
      
    </div>
  )
}

export default UserSearch
