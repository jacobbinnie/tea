import { useState, useEffect } from 'react'

export const useSincePosted = (timestamp: number): string => {
  const [sincePosted, setSincePosted] = useState('Just now')

  useEffect(() => {
    const updateInterval = 10000 // update every 10 seconds

    const intervalId = setInterval(() => {
      const diff = new Date().getTime() - timestamp // since post was created
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (days > 0) {
        setSincePosted(`${days} days ago`)
      } else if (hours > 0) {
        setSincePosted(`${hours} hours ago`)
      } else if (minutes > 0) {
        setSincePosted(`${minutes} minutes ago`)
      } else if (seconds > 0) {
        setSincePosted(`${seconds} seconds ago`)
      } else {
        setSincePosted('Just now')
      }
    }, updateInterval)

    // Set initial value
    const diff = new Date().getTime() - timestamp // since post was created
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) {
      setSincePosted(`${days} days ago`)
    } else if (hours > 0) {
      setSincePosted(`${hours} hours ago`)
    } else if (minutes > 0) {
      setSincePosted(`${minutes} minutes ago`)
    } else if (seconds > 0) {
      setSincePosted(`${seconds} seconds ago`)
    } else {
      setSincePosted('Just now')
    }

    return () => clearInterval(intervalId)
  }, [timestamp])

  return sincePosted
}
