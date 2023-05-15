import { PublicPost } from 'interfaces'
import Reply from '../reply'
import { useState } from 'react'
import clsx from 'clsx'

interface ReplyContainerProps {
  post: PublicPost
}

export const ReplyContainer: React.FC<ReplyContainerProps> = ({ post }) => {
  const [newBody, setNewBody] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const handleUpdateNewBody = (newBody: string) => {
    if (newBody.length <= 100) {
      setNewBody(newBody)
    }
  }

  const countClasses = clsx(
    newBody && newBody.length > 89
      ? 'text-sm font-medium text-[red]'
      : 'text-sm font-medium text-quarterly',
  )

  const handleCreatePostUx = () => {
    setLoading(true)
    // const res = handleCreatePost()

    // if (res) {
    //   toggleCreatePostWindow()
    //   setLoading(false)
    //   handleUpdateNewBody('')
    // } else {
    //   setLoading(false)
    //   alert("Something went wrong, we couldn't create your post.")
    // }
  }

  return (
    <div className="w-full">
      <div className="w-full h-[1px] bg-quarterly my-5 opacity-10" />
      <Reply post={post} reply={false} />
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

      <div className="flex gap-1 items-center h-6 text-quarterly">
        {newBody && newBody.length > 20 && (
          <>
            <p className={countClasses}>{100 - newBody.length}</p>
            <p>•</p>
          </>
        )}
        <p className="text-sm font-medium text-quarterly">min 20 chars</p>
      </div>
      <button
        type="submit"
        className="text-secondary bg-primary disabled:opacity-10 disabled:cursor-default font-extrabold text-xl py-2 w-1/2 px-4 rounded-xl cursor-pointer transition-all duration-500"
        disabled={
          loading ? true : !newBody ? true : newBody.length < 20 ? true : false
        }
        onClick={e => {
          e.preventDefault()
          handleCreatePostUx()
        }}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
      <div className="w-full h-[1px] bg-quarterly my-5 opacity-10" />
      <Reply post={post} reply={true} />
      <Reply post={post} reply={true} />
      <Reply post={post} reply={true} />
    </div>
  )
}

export default ReplyContainer
