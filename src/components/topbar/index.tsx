import { User } from 'firebase/auth'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import {
  BookmarkIcon,
  MapPinIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid'
import { AppUser } from 'interfaces'
import clsx from 'clsx'

interface TopbarProps {
  user: AppUser | null
  tab: 'myPosts' | 'home'
  setTab: Dispatch<SetStateAction<'home' | 'myPosts'>>
  toggleCreatePostWindow: () => void
}

export const Topbar: React.FC<TopbarProps> = ({
  user,
  tab,
  setTab,
  toggleCreatePostWindow,
}) => {
  return (
    <div className="fixed top-0 left-0">
      <div className="w-screen p-4 flex justify-between items-center bg-secondary">
        <h2
          onClick={() => setTab('home')}
          className="text-2xl font-extrabold italic cursor-pointer tracking-tight text-primary"
        >
          tea.wtf
        </h2>

        <div className="flex gap-5">
          <div
            onClick={() => setTab('myPosts')}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-quarterly text-sm"
          >
            my posts
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
      <div className="bg-gradient-to-b from-secondary to-transparent h-10" />
      {/* top gradient */}

      <div
        className={clsx(
          tab === 'home'
            ? 'flex gap-1 px-3 py-1 rounded-xl z-10 fixed bottom-9 bg-quarterly left-6 animate-pulse'
            : 'flex gap-1 px-3 py-1 rounded-xl z-10 fixed bottom-9 bg-quarterly left-6',
        )}
      >
        {tab === 'home' && <MapPinIcon className="text-secondary w-5" />}
        <p className="text-sm font-extrabold text-secondary">
          {tab === 'myPosts' ? 'my posts' : 'tower bridge'}
        </p>
      </div>

      {tab === 'home' && (
        <PlusCircleIcon
          onClick={() => toggleCreatePostWindow()}
          className={
            'text-quarterly w-14 fixed bottom-6 right-6 transition-all shadow-xl cursor-pointer z-10 focus:outline-none'
          }
        />
      )}

      <div className="w-full h-32 bg-gradient-to-t from-secondary to-transparent fixed bottom-0 transition-all duration-500">
        <div className="w-full h-32 bg-secondary mt-32" />
      </div>

      {/* bottom gradient */}
    </div>
  )
}

export default Topbar
