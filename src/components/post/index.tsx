import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { PublicPost, Vote } from '../../../interfaces'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useSincePosted } from 'src/utils'
import { useAuth } from 'providers/authProvider'
import { getPostVotes, getUserVotes, votePost } from '../../../firebase'
import clsx from 'clsx'
import ReplyModal from '../replyModal'

interface PostProps {
  post: PublicPost
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { user, appUser } = useAuth()

  const [voting, setVoting] = useState(false)
  const [totalVotes, setTotalVotes] = useState<number>()
  const [vote, setVote] = useState<'UP' | 'NONE' | 'DOWN'>()
  const [replyWindow, setReplyWindow] = useState(false)

  const toggleReplyWindow = () => setReplyWindow(prev => !prev)

  const handleSetTotalVotes = (votes: number) => {
    setTotalVotes(votes)
  }

  const handleVotePost = async (voteValue: 1 | -1) => {
    if (
      (voteValue === 1 && vote === 'UP') ||
      (voteValue === -1 && vote === 'DOWN')
    ) {
      setVote('NONE')
    } else if (voteValue === 1) {
      setVote('UP')
    } else setVote('DOWN')

    if (user && user?.uid) {
      setVoting(true)
      await votePost(user?.uid, post.postId, voteValue)
      setVoting(false)
    }
  }

  const upvoteClasses = clsx(
    vote === 'UP'
      ? 'px-3 rounded cursor-pointer bg-backdrop transition-all duration-500'
      : 'px-3 rounded cursor-pointer transition-all duration-500',
  )

  const downvoteClasses = clsx(
    vote === 'DOWN'
      ? 'px-3 rounded cursor-pointer bg-backdrop transition-all duration-500'
      : 'px-3 rounded cursor-pointer transition-all duration-500',
  )

  const handleGetPostVote = async () => {
    if (user) {
      await getPostVotes(post.postId, handleSetTotalVotes)
      const userVotes = await getUserVotes(user.uid) // TODO: move this up so it's called only once

      if (userVotes) {
        const voteWithPostId = Object.values<Vote>(userVotes).find(
          vote => vote.postId === post.postId,
        )
        if (voteWithPostId) {
          setVote(voteWithPostId.voteValue === 1 ? 'UP' : 'DOWN')
        } else setVote('NONE')
      } else setVote('NONE')
    }
  }

  const handleCreateComment = (body: string) => {
    console.log('Creating comment logic here....', body)
    return true
  }

  useEffect(() => {
    handleGetPostVote()
  }, [])

  return (
    <div className=" bg-secondary items-start px-4 py-6 min-w-full max-w-full break-inside-avoid transition-all duration-500">
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-medium text-quarterly">
            {useSincePosted(post.timestamp)}
          </p>

          {vote && totalVotes !== undefined && (
            <div className="flex gap-3 px-1">
              <div className={upvoteClasses}>
                <ChevronUpIcon
                  className={clsx(
                    vote === 'UP'
                      ? 'w-5 text-primary transition-all duration-500'
                      : 'w-5 text-quarterly transition-all duration-500',
                  )}
                  onClick={() => {
                    !voting && handleVotePost(1)
                  }}
                />
              </div>
              <div className={downvoteClasses}>
                <ChevronDownIcon
                  className={clsx(
                    vote === 'DOWN'
                      ? 'w-5 text-primary transition-all duration-500'
                      : 'w-5 text-quarterly transition-all duration-500',
                  )}
                  onClick={() => !voting && handleVotePost(-1)}
                />
              </div>
              <div className="pl-4 rounded">
                <p className="text-sm font-medium text-primary">{totalVotes}</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-xl text-tertiary font-extrabold break-words">
          {post.body}
        </p>

        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <p className="text-sm font-medium text-quarterly">
              {post.user.name}
            </p>
            <HeartIcon className="w-3 font-medium text-quarterly" />
            <p className="text-sm font-medium text-quarterly">
              {post.user.karma}
            </p>
          </div>
          <div
            onClick={() => toggleReplyWindow()}
            className="cursor-pointer text-sm font-extrabold bg-primary py-1 px-3 rounded-xl text-secondary"
          >
            Replies
          </div>
        </div>
      </div>

      <ReplyModal
        handleCreateComment={handleCreateComment}
        replyWindow={replyWindow}
        toggleReplyWindow={toggleReplyWindow}
        user={{ image: '123', karma: 12, name: 'Jacob' }}
        post={post}
      />
    </div>
  )
}

export default Post
