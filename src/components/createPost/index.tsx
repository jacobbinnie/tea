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

  return (
    <div className={componentClasses}>
      <div className="flex flex-col gap-5 w-full max-w-xl px-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-xl font-semibold text-quarterly">Create post</p>
          <XCircleIcon
            onClick={() => toggleCreatePostWindow()}
            className="text-quarterly w-10 cursor-pointer"
          />
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
            className="transition-all bg-secondary font-medium mt-3 text-lg text-quarterly h-28"
            onChange={e => handleUpdateNewBody(e.target.value)}
            placeholder={"What's on your mind?"}
            value={newBody}
          />
        </div>

        <div className="flex gap-1 justify-between">
          <div className="flex gap-1">
            <MapPinIcon className="text-quarterly w-3 animate-pulse" />
            <p className="text-sm font-medium text-quarterly">near Grey Lynn</p>
          </div>
          {newBody ? (
            <p className="text-sm font-medium text-quarterly">
              {100 - newBody.length}
            </p>
          ) : (
            <p className="text-sm font-medium text-quarterly">100</p>
          )}
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1">
            <ClockIcon className="text-quarterly w-3 animate-pulse" />
            <p className="text-sm font-medium text-quarterly">24hrs</p>
          </div>
          <button
            type="submit"
            className="text-quarterly bg-primary disabled:opacity-10 disabled:cursor-default font-semibold text-lg py-2 w-1/2 px-4 rounded-xl cursor-pointer transition-all"
            disabled={!newBody ? true : false}
            onClick={e => {
              e.preventDefault()
              handleCreatePost()
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
