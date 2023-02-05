import { useEffect, useState } from 'react'
import { Location } from '../interfaces'

export default function Home() {
  const [location, setLocation] = useState<Location | undefined>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }, [])

  return (
    <div className="h-screen bg-gray-300 gap-5 flex justify-center items-center flex-col">
      <div>
        <h2>Your latitude is: {location?.latitude}</h2>
        <h2>Your longitude is: {location?.longitude}</h2>
      </div>

      <textarea
        id="message"
        rows={4}
        // eslint-disable-next-line max-len
        className="block p-2.5 text-sm w-1/2 bg-secondary text-gray-300 rounded-lg border border-gray-300"
        placeholder="Write your thoughts here..."
      />
      <button
        type="submit"
        // eslint-disable-next-line max-len
        className="text-white bg-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center mr-2 mb-2 shadow-xl"
      >
        Submit
      </button>
    </div>
  )
}
