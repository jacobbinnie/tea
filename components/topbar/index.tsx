import { User } from 'firebase/auth'
import Image from 'next/image'
import React from 'react'

interface TopbarProps {
  user: User | null
}

export const Topbar: React.FC<TopbarProps> = ({ user }) => {
  return (
    <div className="fixed top-0 left-0">
      <div className="w-screen p-4 flex justify-between items-center bg-secondary">
        <h2 className="text-2xl font-bold italic tracking-tight text-primary animate-pulse">
          tea.wtf
        </h2>
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
      <div className="bg-gradient-to-b from-secondary to-transparent h-10"></div>
    </div>
  )
}

export default Topbar
