import React from 'react'

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="w-24 fixed left-0 top-0 h-screen bg-tertiary p-10"></div>
  )
}

export default Sidebar
