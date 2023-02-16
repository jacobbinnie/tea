import { useEffect, useState } from 'react'
import { CardContainer } from '../components/CardContainer'
import Topbar from '../components/topbar'
import { createPost, getNearbyPostIds, getUserPosts } from '../firebase'
import { PublicPost, UserPost } from '../interfaces'
import { useAuth } from '../providers/authProvider'

export default function Home() {
  const [location, setLocation] = useState<
    [latitude: number, longitude: number] | undefined
  >()
  const [newBody, setNewBody] = useState<string | undefined>()
  const [myPosts, setMyPosts] = useState<PublicPost[]>([])
  const [nearbyPosts, setNearbyPosts] = useState<PublicPost[]>([])
  const [gettingLocation, setGettingLocation] = useState(false)

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

  const getNearbyPosts = (
    location: [latitude: number, longitude: number],
    radius: number,
  ) => {
    getNearbyPostIds(
      location,
      radius,
      handleAddToNearbyPosts,
      handleRemoveFromNearbyPosts,
    )
  }

  const getLocation = () => {
    setGettingLocation(true)
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude])
      setGettingLocation(false)
    })
  }

  const handleCreatePost = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      createPost(
        newBody!,
        [position.coords.latitude, position.coords.longitude],
        Date.now(),
        user!.user.uid,
      )
    })
  }

  const loadUserPosts = (uuid: string) => {
    getUserPosts(uuid, handleAddToMyPosts)
  }

  useEffect(() => {
    getLocation()
    if (user) {
      loadUserPosts(user?.user.uid)
    }
  }, [])

  return (
    <div className="flex overflow-hidden min-h-screen bg-secondary">
      {gettingLocation && (
        <h2 className="text-tertiary">Getting Location...</h2>
      )}
      {!gettingLocation && (
        <>
          <Topbar user={user && user.user} />
          <div className="w-full flex justify-center">
            <div className="flex flex-col mt-24 p-4 w-full max-w-5xl gap-5">
              <h2 className="mt-4 mb-2 text-secondary">My Posts</h2>
              <CardContainer posts={myPosts} />
              {nearbyPosts.length > 0 && (
                <h2 className="mt-4 mb-2 text-tertiary">
                  Nearby Posts within 3 Miles (5km)
                </h2>
              )}
              <div className="flex flex-col w-full">
                <CardContainer posts={nearbyPosts} />
                <button
                  type="submit"
                  // eslint-disable-next-line max-len
                  className="mt-4 text-tertiary font-medium rounded-lg px-10 py-3 text-center mr-2 mb-2 shadow-xl border-gray-100 border-[1px] hover:border-tertiary transition-all duration-300"
                  onClick={e => {
                    e.preventDefault()
                    if (location) {
                      getNearbyPosts(location, 5)
                    }
                  }}
                >
                  Get nearby posts
                </button>
              </div>

              <div>
                {location && (
                  <>
                    <h5 className="text-secondary font-semibold text-center">
                      Your location is:
                    </h5>
                    <h5 className="text-secondary">Latitude: {location[0]}</h5>
                    <h5 className="text-secondary">Longitude: {location[1]}</h5>
                  </>
                )}
              </div>
              <textarea
                id="message"
                rows={4}
                // eslint-disable-next-line max-len
                className="block p-2.5 text-sm w-full text-gray-100 rounded-lg border focus:outline-none border-gray-100"
                placeholder="Write your thoughts here..."
                onChange={e => setNewBody(e.target.value)}
              />
              <button
                type="submit"
                // eslint-disable-next-line max-len
                className="text-tertiary hover:bg-tertiary disabled:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center mr-2 mb-2 shadow-xl"
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
      )}
    </div>
  )
}
