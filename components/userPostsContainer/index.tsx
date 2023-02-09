import React, { useEffect, useState } from 'react'
import { DbUser, UserPost } from '../../interfaces'
import Card from '../card'

interface CardContainerProps {
  dbUser: DbUser | null
  userPosts: UserPost[] | undefined
}

export const UserPostsContainer: React.FC<CardContainerProps> = ({
  dbUser,
  userPosts,
}) => {
  const [mappedPosts, setMappedPosts] = useState<JSX.Element[] | undefined>()
  const [columnCount, setColumnCount] = useState(0)

  const mapPosts = () => {
    if (userPosts) {
      const dataMapping = Object.keys(userPosts).map(item => (
        <Card key={item} post={userPosts[item]} dbUser={dbUser} />
      ))
      setColumnCount(Object.keys(userPosts).length)
      setMappedPosts(dataMapping)
    }
  }

  useEffect(() => {
    mapPosts()
  }, [userPosts])

  if (userPosts && mappedPosts) {
    console.log(Object.keys(userPosts).length)
    return (
      <div
        // eslint-disable-next-line max-len
        className={`w-full margin-auto sm:columns-1 md:columns-${
          columnCount < 2 ? columnCount : 2
        } lg:columns-${columnCount < 3 ? columnCount : 3} xl:columns-${
          columnCount < 4 ? columnCount : 4
        } gap-4 space-y-4 p-8`}
      >
        {mappedPosts}
      </div>
    )
  }
  return <h5>You have no posts</h5>
}
