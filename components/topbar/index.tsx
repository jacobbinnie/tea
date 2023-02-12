import React from 'react'

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = () => {
  return (
    <div className="w-[calc(100%-6rem)] fixed top-0 left-0 h-24 bg-gray-200 p-8 flex justify-between">
      <div className="w-44 h-6 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-44 h-6 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-44 h-6 bg-gray-300 animate-pulse rounded"></div>
    </div>
  )
}

export default Topbar
