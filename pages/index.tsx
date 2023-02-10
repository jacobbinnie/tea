import { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Topbar from '../components/topbar'
import { UserPostsContainer } from '../components/userPostsContainer'
import { createPost, getUserPosts } from '../firebase'
import { Location, UserPost } from '../interfaces'
import { useAuth } from '../providers/authProvider'

export default function Home() {
  const [location, setLocation] = useState<Location | undefined>()
  const [newBody, setNewBody] = useState<string | undefined>()
  const [userPosts, setUserPosts] = useState<UserPost[] | undefined>()

  const { user, dbUser } = useAuth()

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  const handleCreatePost = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      createPost(
        newBody!,
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        Date.now(),
        user?.user.uid,
      )
    })
  }

  const loadUserPosts = (uuid: string) => {
    getUserPosts(uuid, setUserPosts)
  }

  useEffect(() => {
    getLocation()
    if (user) {
      loadUserPosts(user?.user.uid)
    }
  }, [])

  return (
    <div className="flex overflow-hidden m-h-screen bg-gray-200">
      <Sidebar />
      <Topbar />
      <div className="flex-1 ml-24 mt-24 p-8">
        <UserPostsContainer userPosts={userPosts} dbUser={dbUser} />
        <div>
          <h2>Your latitude is: {location?.latitude}</h2>
          <h2>Your longitude is: {location?.longitude}</h2>
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
