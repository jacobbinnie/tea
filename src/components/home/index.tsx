import { useCallback, useEffect, useState } from 'react'
import Topbar from '../topbar'
import {
  createPost,
  db,
  geoFire,
  getNearbyPostIds,
  getUserPosts,
} from '../../../firebase'
import { AppUser, PublicPost, UserPost } from '../../../interfaces'
import { useAuth } from '../../../providers/authProvider'
import NearbyPosts from '../nearbyPosts'
import Loading from '../loading'
import MyPosts from '../myPosts'
import CreatePost from '../createPost'
import clsx from 'clsx'

export default function Home() {
  const [location, setLocation] = useState<
    [latitude: number, longitude: number] | undefined
  >()
  const [newBody, setNewBody] = useState<string | undefined>()
  const [nearbyPosts, setNearbyPosts] = useState<PublicPost[]>([])
  const [gettingNearbyPosts, setGettingNearbyPosts] = useState(true)

  const [myPosts, setMyPosts] = useState<PublicPost[]>([])
  const [gettingMyPosts, setGettingMyPosts] = useState(true)

  const [tab, setTab] = useState<'home' | 'myPosts'>('home')
  const [createPostWindow, setCreatePostWindow] = useState(false)

  const { appUser, user } = useAuth()

  const handleUpdateNewBody = (newBody: string) => {
    if (newBody.length <= 100) {
      setNewBody(newBody)
    }
  }

  const toggleCreatePostWindow = () => setCreatePostWindow(prev => !prev)

  const handleAddToMyPosts = (posts: UserPost[]) => {
    const newArray: PublicPost[] = []
    if (posts) {
      Object.values(posts).forEach(post => {
        const newValue = {
          ...post,
          image: appUser?.image,
        }
        newArray.push(newValue)
      })
      setMyPosts(newArray)
      setGettingMyPosts(false)
    }
  }

  const handleAddToNearbyPosts = (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => {
    const nearbyPost = {
      postId,
      body: post.body,
      timestamp: post.timestamp,
      user: user,
    }

    setNearbyPosts(prevState => {
      const alreadyExists = prevState.some(
        prevPost => prevPost.postId === postId,
      )

      if (alreadyExists) {
        return prevState
      } else {
        return [...prevState, nearbyPost]
      }
    })

    setGettingNearbyPosts(false)
  }

  const handleRemoveFromNearbyPosts = (key: string) => {
    // setNearbyPosts(prevState =>
    //   prevState.filter(post => post !== prevState[key]),
    // )
    // Fix this
    console.log('Test', key)
  }

  const getNearbyPosts = useCallback(
    (location: [latitude: number, longitude: number], radius: number) => {
      getNearbyPostIds(
        location,
        radius,
        handleAddToNearbyPosts,
        handleRemoveFromNearbyPosts,
      )
    },
    [],
  )

  const handleCreatePost = () => {
    if (location) {
      const res = createPost(
        newBody!,
        location,
        Date.now(),
        user!.uid,
        handleAddToNearbyPosts,
      )
      return res
    }
  }

  const updateLocation = useCallback(() => {
    if (global.navigator) {
      global.navigator.geolocation.watchPosition(function (position) {
        setLocation([position.coords.latitude, position.coords.longitude])
      })
    }
  }, [location])

  useEffect(() => {
    if (location && geoFire && db && nearbyPosts.length === 0) {
      getNearbyPosts(location, 3)
    }
  }, [location, geoFire, db])

  useEffect(() => {
    if (tab === 'myPosts' && user) {
      getUserPosts(user?.uid, handleAddToMyPosts)
    }
  }, [tab])

  useEffect(() => {
    updateLocation()
  }, [])

  const postsClasses = clsx(
    createPostWindow
      ? 'w-full blur-lg flex justify-center transition-all duration-500'
      : 'w-full flex justify-center transition-all duration-500',
  )

  if (!location) {
    return (
      <div className="h-screen w-screen bg-secondary flex justify-center items-center">
        <Loading loadingMessage="Retrieving Location..." />
      </div>
    )
  }

  return (
    <div className="flex overflow-hidden min-h-screen bg-secondary">
      <Topbar
        user={appUser}
        setTab={setTab}
        toggleCreatePostWindow={toggleCreatePostWindow}
      />
      <div className={postsClasses}>
        <div className="flex flex-col mt-24 w-full max-w-xl gap-5 pb-24">
          {tab === 'home' ? (
            <NearbyPosts
              nearbyPosts={nearbyPosts}
              gettingNearbyPosts={gettingNearbyPosts}
            />
          ) : (
            <MyPosts myPosts={myPosts} gettingMyPosts={gettingMyPosts} />
          )}
        </div>
      </div>
      {appUser && (
        <CreatePost
          handleUpdateNewBody={handleUpdateNewBody}
          newBody={newBody}
          handleCreatePost={handleCreatePost}
          user={appUser}
          createPostWindow={createPostWindow}
          toggleCreatePostWindow={toggleCreatePostWindow}
        />
      )}
    </div>
  )
}
