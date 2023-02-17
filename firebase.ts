// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  query,
  get,
  orderByChild,
  equalTo,
} from 'firebase/database'
import { GeoFire, GeoQuery } from 'geofire'
import React from 'react'
import { DbUser, UserPost } from './interfaces'
import { generateString } from './utils/utils'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase()

// Create a Firebase reference where GeoFire will store its information
const firebaseRef = ref(db, 'geofireKeys/')

// Create a GeoFire index
export const geoFire = new GeoFire(firebaseRef)

export function setGeofireKey(
  key: string,
  location: [latitude: number, longitude: number],
) {
  geoFire.set(key, location).then(
    function () {
      console.log('Provided key has been added to GeoFire')
    },
    function (error) {
      console.log('Error: ' + error)
    },
  )
}

export function removeGeofireKey(key: string) {
  geoFire.remove(key).then(
    function () {
      console.log('Provided key has been removed from GeoFire')
    },
    function (error) {
      console.log('Error: ' + error)
    },
  )
}

const addUserImage = async (
  post: UserPost,
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  handleAddToNearbyPosts: (post: UserPost, image: string) => void,
) => {
  const que = query(ref(db, 'users/' + post.user + '/image'))
  get(que).then(snapshot => {
    handleAddToNearbyPosts(post, snapshot.val())
  })
}

// Gets Single Post
export const getPublicPost = async (
  postId: string,
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  handleAddToNearbyPosts: (post: UserPost, image: string) => void,
) => {
  const que = query(ref(db, 'posts/' + postId))
  get(que).then(snapshot => {
    addUserImage(snapshot.val(), handleAddToNearbyPosts)
  })
}

export function getNearbyPostIds(
  center: [number, number],
  radius: number,
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  handleAddToNearbyPosts: (post: UserPost, image: string) => void,
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  handleRemoveFromNearbyPosts: (key: string) => void,
) {
  let geoQuery: GeoQuery | undefined
  const processedIds: string[] = []

  if (geoQuery !== undefined) {
    console.log('Updating Query')
    geoQuery.updateCriteria({
      center,
      radius,
    })
  } else {
    geoQuery = geoFire.query({
      center,
      radius,
    })
  }

  geoQuery.on('key_entered', (key: string) => {
    if (!processedIds.includes(key)) {
      getPublicPost(key, handleAddToNearbyPosts)
    }
  })

  geoQuery.on('key_exited', (key: string) => {
    handleRemoveFromNearbyPosts(key)
  })
}

// Creates User in Realtime DB
export function createUser(
  uuid: string,
  name: string | null,
  email: string,
  image: string | null,
) {
  set(ref(db, 'users/' + uuid), {
    name,
    email,
    image,
  })
    .then(() => alert('User created successfully'))
    .catch(err => alert(err.message))
}

// Checks User Exists in Realtime DB. If Not, Creates User
export function checkUserCreated(
  uuid: string,
  name: string | null,
  email: string,
  image: string | null,
  callbackFunc: React.Dispatch<React.SetStateAction<DbUser | null>>,
) {
  const que = query(ref(db, 'users/' + uuid))
  get(que).then(snapshot => {
    const user = snapshot.val()
    if (!user) {
      createUser(uuid, name, email, image)
    }
    callbackFunc(user)
  })
}

// Create Post
export function createPost(
  body: string,
  location: [latitude: number, longitude: number],
  timestamp: number,
  uid: string,
) {
  const generatedString = Date.now() + generateString(5)
  set(ref(db, 'posts/' + generatedString), {
    body,
    timestamp,
    user: uid,
  })
    .then(() => {
      setGeofireKey(generatedString, location)
    })
    .catch(err => alert(err.message))
}

// Gets Logged In User's Posts
export function getUserPosts(
  uuid: string,
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  handleAddToMyPosts: (posts: UserPost[]) => void,
) {
  const que = query(ref(db, 'posts/'), orderByChild('user'), equalTo(uuid))
  get(que).then(async snapshot => {
    handleAddToMyPosts(snapshot.val())
  })
}
