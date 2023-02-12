import { useEffect, useState } from 'react'
import { CardContainer } from '../components/CardContainer'
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
    Object.values(posts).forEach(post => {
      const newValue = {
        ...post,
        image: user?.user.photoURL,
      }
      newArray.push(newValue)
    })
    setMyPosts(newArray)
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
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude])
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
    <div className="flex overflow-hidden min-h-screen bg-gray-200">
      {/* <Sidebar /> */}
      {/* <Topbar /> */}
      <div className="flex flex-col mt-24 p-8 w-full items-center gap-5">
        <h2 className="mt-4 mb-2 text-secondary">My Posts</h2>
        <CardContainer posts={myPosts} />
        {nearbyPosts.length > 0 && (
          <h2 className="mt-4 mb-2 text-secondary">
            Nearby Posts within 3 Miles (5km)
          </h2>
        )}
        <div className="flex flex-col w-full">
          <CardContainer posts={nearbyPosts} />
          <button
            type="submit"
            // eslint-disable-next-line max-len
            className="mt-4 text-tertiary bg-gray-300 hover:bg-gray-200 disabled:bg-secondary focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 text-center mr-2 mb-2 shadow-xl"
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
          className="block p-2.5 text-sm w-1/2 bg-tertiary text-gray-300 rounded-lg border border-gray-300"
          placeholder="Write your thoughts here..."
          onChange={e => setNewBody(e.target.value)}
        />
        <button
          type="submit"
          // eslint-disable-next-line max-len
          className="text-tertiary bg-gray-300 hover:bg-gray-200 disabled:bg-secondary focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center mr-2 mb-2 shadow-xl"
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
  )
}
