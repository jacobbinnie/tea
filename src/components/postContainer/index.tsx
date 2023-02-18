import React, { useEffect, useState } from 'react'
import { PublicPost } from '../../../interfaces'
import Card from '../post'

interface PostContainerProps {
  posts: PublicPost[] | undefined
}

export const PostContainer: React.FC<PostContainerProps> = ({ posts }) => {
  const [mappedPosts, setMappedPosts] = useState<JSX.Element[] | undefined>()
  const [layout, setLayout] = useState<JSX.Element | undefined>()

  const mapPosts = () => {
    if (posts) {
      const dataMapping = Object.keys(posts).map(item => (
        <Card key={item} post={posts[item]} />
      ))
      setMappedPosts(dataMapping)
    }
  }

  const layoutBuilder = () => {
    if (mappedPosts && posts) {
      const columnCount = Object.keys(posts).length

      return (
        <div
          // eslint-disable-next-line max-len
          className={
            columnCount === 1
              ? `sm:columns-1 gap-4 space-y-4 w-full`
              : columnCount === 2
              ? `sm:columns-1 md:columns-2 gap-4 space-y-4 w-full`
              : columnCount === 3
              ? `sm:columns-1 md:columns-2 lg:columns-2 gap-4 space-y-4 w-full`
              : columnCount === 4
              ? `sm:columns-1 md:columns-2 lg:columns-2 gap-4 space-y-4 w-full`
              : `sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 w-full`
          }
        >
          {mappedPosts}
        </div>
      )
    }
  }

  useEffect(() => {
    mapPosts()
  }, [posts])

  useEffect(() => {
    if (mappedPosts) {
      setLayout(layoutBuilder)
    }
  }, [mappedPosts])

  if (layout) {
    return layout
  }
  return <h5>You have no posts</h5>
}

export default PostContainer
