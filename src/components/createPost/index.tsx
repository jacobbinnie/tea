import clsx from 'clsx'
import { AppUser } from 'interfaces'
import Image from 'next/image'
import { HeartIcon, MapPinIcon, XCircleIcon } from '@heroicons/react/24/solid'

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
  const classes = clsx(
    createPostWindow
      ? 'bg-primary h-3/4 w-full flex fixed bottom-0 flex-col px-4 py-5 py rounded-t-xl transition-all'
      : 'bg-primary h-0 opacity-0 flex fixed bottom-0 transition-all',
  )

  return (
    <div className={classes}>
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            {user.image && (
              <Image
                className="w-6 h-6 rounded-full object-cover border"
                src={user.image}
                alt="avatar"
                width={20}
                height={20}
              />
            )}
            <p className="text-sm font-medium text-tertiary">{user.name}</p>
            <HeartIcon className="w-3 text-tertiary" />
            <p className="text-xs text-tertiary">{user.karma}</p>
          </div>
          <XCircleIcon
            onClick={() => toggleCreatePostWindow()}
            className="text-tertiary w-5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <MapPinIcon className="text-tertiary w-3 animate-pulse" />
            <p className="text-xs font-medium text-tertiary">
              Posting near Grey Lynn
            </p>
          </div>
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
            className="transition-all text-tertiary text-sm h-60 bg-primary border-[1px] p-4 rounded-lg"
            onChange={e => handleUpdateNewBody(e.target.value)}
            placeholder={"What's on your mind?"}
            value={newBody}
          />
        </div>

        <div className="w-full flex justify-between items-center">
          {newBody ? (
            <p className="text-xs font-medium text-tertiary">
              {100 - newBody.length}
            </p>
          ) : (
            <p className="text-xs font-medium text-tertiary">100</p>
          )}
          <button
            type="submit"
            className="text-primary bg-tertiary font-medium text-sm py-2 w-1/2 px-4 rounded-xl"
            disabled={!newBody ? true : false}
            onClick={e => {
              e.preventDefault()
              handleCreatePost()
            }}
          >
            Post to Grey Lynn
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
