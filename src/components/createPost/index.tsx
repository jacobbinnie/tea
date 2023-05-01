import clsx from 'clsx'
import { AppUser } from 'interfaces'
import Image from 'next/image'
import {
  HeartIcon,
  MapPinIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

interface CreatePostProps {
  handleUpdateNewBody: (newBody: string) => void
  newBody: string | undefined
  handleCreatePost: () => void
  user: AppUser
  createPostWindow: boolean
  toggleCreatePostWindow: () => void
}

export const CreatePost: React.FC<CreatePostProps> = ({
  handleUpdateNewBody,
  newBody,
  handleCreatePost,
  user,
  createPostWindow,
  toggleCreatePostWindow,
}) => {
  const componentClasses = clsx(
    createPostWindow
      ? 'bg-secondary opacity-80 h-5/6 w-full flex fixed bottom-0 flex-col px-4 py-5 py rounded-t-xl transition-all duration-500 items-center'
      : 'bg-tertiary h-0 w-full opacity-0 flex fixed bottom-0 flex-col transition-all duration-500 items-center',
  )

  const countClasses = clsx(
    newBody && newBody.length > 89
      ? 'text-sm font-medium text-[red]'
      : 'text-sm font-medium text-quarterly',
  )

  return (
    <div className={componentClasses}>
      <div className="flex flex-col gap-5 w-full max-w-xl px-4 z-10">
        <div className="flex w-full justify-between items-center">
          <p className="text-xl font-extrabold text-tertiary">Create post</p>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            style={{
              outline: 'none',
              resize: 'none',
              overflow: 'auto',
              boxShadow: 'none',
              WebkitBoxShadow: 'none',
              MozWindowShadow: 'none',
            }}
            name="paragraph_text"
            cols={50}
            rows={10}
            className="transition-all bg-secondary font-medium mt-3 text-xl text-quarterly h-28"
            onChange={e => handleUpdateNewBody(e.target.value)}
            placeholder={"What's on your mind?"}
            value={newBody}
          />
        </div>

        <div className="flex gap-1 justify-between">
          <div className="flex gap-1 items-center">
            <MapPinIcon className="text-quarterly w-3 animate-pulse" />
            <p className="text-sm font-medium text-quarterly">
              near tower bridge
            </p>
          </div>
          <div className="flex gap-1 items-center h-6 text-quarterly">
            {newBody && newBody.length > 30 && (
              <>
                <p className={countClasses}>{100 - newBody.length}</p>
                <p>•</p>
              </>
            )}
            <p className="text-sm font-medium text-quarterly">min 30 chars</p>
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1">
            <ClockIcon className="text-quarterly w-3 animate-pulse" />
            <p className="text-sm font-medium text-quarterly">24hrs</p>
          </div>
          <button
            type="submit"
            className="text-secondary bg-primary disabled:opacity-10 disabled:cursor-default font-extrabold text-xl py-2 w-1/2 px-4 rounded-xl cursor-pointer transition-all duration-500"
            disabled={!newBody ? true : newBody.length < 30 ? true : false}
            onClick={e => {
              e.preventDefault()
              handleCreatePost()
            }}
          >
            Post
          </button>
        </div>
        <div className="w-full flex justify-center mt-10">
          <XCircleIcon
            onClick={() => toggleCreatePostWindow()}
            className="text-quarterly w-14 cursor-pointer focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default CreatePost
