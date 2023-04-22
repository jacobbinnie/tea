import { User } from 'firebase/auth'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { BookmarkIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { AppUser } from 'interfaces'

interface TopbarProps {
  user: AppUser | null
  setTab: Dispatch<SetStateAction<'home' | 'myPosts'>>
  toggleCreatePostWindow: () => void
}

export const Topbar: React.FC<TopbarProps> = ({
  user,
  setTab,
  toggleCreatePostWindow,
}) => {
  return (
    <div className="fixed top-0 left-0">
      <div className="w-screen py-3 px-6 flex justify-between items-center bg-secondary">
        <h2
          onClick={() => setTab('home')}
          className="text-2xl cursor-pointer font-bold italic tracking-tight text-primary"
        >
          tea.wtf
        </h2>

        <PlusCircleIcon
          onClick={() => toggleCreatePostWindow()}
          className="text-tertiary w-10 fixed bottom-6 right-6 transition-all shadow-xl"
        />

        <div className="flex gap-5">
          <div
            onClick={() => setTab('myPosts')}
            className="flex items-center gap-2 text-gray-100 text-sm cursor-pointer hover:text-tertiary transition-all duration-300"
          >
            My Posts
          </div>
          {user && user.image && (
            <Image
              className="w-6 h-6 rounded-full object-cover border"
              src={user.image}
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
