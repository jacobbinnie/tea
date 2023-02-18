import { User } from 'firebase/auth'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import HomeIcon from '../../assets/icons/home.svg'
import MyPosts from '../../assets/icons/server.svg'

interface TopbarProps {
  user: User | null
  setTab: Dispatch<SetStateAction<'home' | 'myPosts'>>
}

export const Topbar: React.FC<TopbarProps> = ({ user, setTab }) => {
  return (
    <div className="fixed top-0 left-0">
      <div className="w-screen p-4 flex justify-between items-center bg-secondary">
        <h2 className="text-2xl font-bold italic tracking-tight text-primary animate-pulse">
          tea.wtf
        </h2>
        <div className="flex gap-5">
          <div
            onClick={() => setTab('home')}
            className="flex text-gray-100 text-sm cursor-pointer hover:text-tertiary transition-all duration-300"
          >
            <HomeIcon />
          </div>
          <div
            onClick={() => setTab('myPosts')}
            className="flex text-gray-100 text-sm cursor-pointer hover:text-tertiary transition-all duration-300"
          >
            <MyPosts />
          </div>
          {user && user.photoURL && (
            <Image
              className="w-6 h-6 rounded-full object-cover border"
              src={user.photoURL}
              alt="avatar"
              width={20}
              height={20}
            />
          )}
        </div>
      </div>
      <div className="bg-gradient-to-b from-secondary to-transparent h-10"></div>
    </div>
  )
}

export default Topbar
