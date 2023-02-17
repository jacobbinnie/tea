import { useCallback, useEffect, useState } from 'react'
import { CardContainer } from '../CardContainer'
import Topbar from '../topbar'
import {
  createPost,
  db,
  geoFire,
  getNearbyPostIds,
  getUserPosts,
} from '../../firebase'
import { PublicPost, UserPost } from '../../interfaces'
import { useAuth } from '../../providers/authProvider'

export default function Home() {
  const [location, setLocation] = useState<
    [latitude: number, longitude: number] | undefined
  >()
  const [newBody, setNewBody] = useState<string | undefined>()
  const [myPosts, setMyPosts] = useState<PublicPost[]>([])
  const [nearbyPosts, setNearbyPosts] = useState<PublicPost[]>([])

  const { user } = useAuth()

  const handleAddToNearbyPosts = (post: UserPost, image: string) => {
    const nearbyPost = {
      body: post.body,
      timestamp: post.timestamp,
      user: post.user,
      image,
    }
    setNearbyPosts(prevState => [...prevState, nearbyPost])
  }

  const handleAddToMyPosts = (posts: UserPost[]) => {
    const newArray: PublicPost[] = []
    if (posts) {
      Object.values(posts).forEach(post => {
        const newValue = {
          ...post,
          image: user?.user.photoURL,
        }
        newArray.push(newValue)
      })
      setMyPosts(newArray)
    }
  }

  const handleRemoveFromNearbyPosts = (key: string) => {
    setNearbyPosts(prevState =>
      prevState.filter(post => post !== prevState[key]),
    )
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
      createPost(newBody!, location, Date.now(), user!.user.uid)
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
    let count = 0
    if (location && geoFire && db && count === 0) {
      console.log('Location, Geofire & DB Initialized')
      getNearbyPosts(location, 3)
      count = 1
    }
  }, [location, geoFire, db])

  useEffect(() => {
    updateLocation()
  }, [])

  return (
    <div className="flex overflow-hidden min-h-screen bg-secondary">
      <>
        <Topbar user={user && user.user} />
        <div className="w-full flex justify-center">
          <div className="flex flex-col mt-24 p-4 w-full max-w-6xl gap-5">
            {nearbyPosts.length > 0 && (
              <h2 className="text-lg text-center font-semibold text-tertiary">
                Posts Near You
              </h2>
            )}
            <div className="flex flex-col w-full">
              <CardContainer posts={nearbyPosts} />
            </div>
            {myPosts.length > 0 && (
              <>
                <h2 className="text-lg text-center font-semibold text-tertiary">
                  My Posts
                </h2>
                <CardContainer posts={myPosts} />
              </>
            )}
            <button
              type="submit"
              // eslint-disable-next-line max-len
              className="mt-4 text-tertiary font-medium rounded-lg px-10 py-3 text-center mr-2 shadow-xl border-gray-100 border-[1px] hover:border-tertiary transition-all duration-300"
              onClick={() => {
                if (location && user) {
                  getUserPosts(user?.user.uid, handleAddToMyPosts)
                }
              }}
            >
              Get My Posts
            </button>

            <div>
              {location && (
                <>
                  <h2 className="text-lg text-center font-semibold text-tertiary">
                    Your location is:
                  </h2>
                  <h2 className="text-tertiary text-center">
                    Latitude: {location[0]}
                  </h2>
                  <h2 className="text-tertiary text-center">
                    Longitude: {location[1]}
                  </h2>
                </>
              )}
            </div>
            <input
              id="message"
              // eslint-disable-next-line max-len
              className="mt-4 text-tertiary bg-secondary font-regular rounded-lg h-44 px-10 py-3 text-center mr-2 shadow-xl border-gray-100 border-[1px] hover:border-tertiary transition-all duration-300"
              placeholder="Enter post body..."
              onChange={e => setNewBody(e.target.value)}
            />
            <button
              type="submit"
              // eslint-disable-next-line max-len
              className="mt-4 text-tertiary font-medium rounded-lg px-10 py-3 text-center mr-2 shadow-xl border-gray-100 border-[1px] hover:border-tertiary transition-all duration-300"
              disabled={!newBody ? true : false}
              onClick={e => {
                e.preventDefault()
                handleCreatePost()
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    </div>
  )
}