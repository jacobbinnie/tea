import React from 'react'
import Spinner from '../../../assets/loading.svg'

interface LoadingProps {
  loadingMessage?: string
}

export const Loading: React.FC<LoadingProps> = ({ loadingMessage }) => {
  return (
    <div className="gap-5 w-full h-full flex flex-col justify-center items-center">
      <div className="fill-tertiary">
        <Spinner />
      </div>

      <h1>{loadingMessage ? loadingMessage : 'Loading...'}</h1>
    </div>
  )
}

export default Loading
