// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  get,
  orderByChild,
  equalTo,
} from 'firebase/database'
import { GeoFire } from 'geofire'
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
const db = getDatabase()

// Create a Firebase reference where GeoFire will store its information
const firebaseRef = ref(db)

// Create a GeoFire index
const geoFire = new GeoFire(firebaseRef)

export function getGeofireKey(key) {
  geoFire
    .get(key)
    .then(response => {
      return response
    })
    .catch(err => {
      throw new Error(err)
    })
}

export function setGeofireKey(key, location) {
  geoFire.set(key, location).then(
    function () {
      console.log('Provided key has been added to GeoFire')
    },
    function (error) {
      console.log('Error: ' + error)
    },
  )
}

export function removeGeofireKey(key) {
  geoFire.remove(key).then(
    function () {
      console.log('Provided key has been removed from GeoFire')
    },
    function (error) {
      console.log('Error: ' + error)
    },
  )
}

export function getNearbyPosts(currentLocation, radius) {
  geoFire
    .query({
      center: currentLocation,
      radius: radius,
    })
    .then(result => {
      return result
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}

// Creates User in Realtime DB
export function createUser(uuid, name, email, image) {
  set(ref(db, 'users/' + uuid), {
    name,
    email,
    image,
  })
    .then(() => alert('User created successfully'))
    .catch(err => alert(err.message))
}

// Checks User Exists in Realtime DB. If Not, Creates User
export function checkUserCreated(uuid, name, email, image, callbackFunc) {
  onValue(ref(db, 'users/' + uuid), snapshot => {
    const user = snapshot.val()
    if (!user) {
      createUser(uuid, name, email, image)
    }
    callbackFunc(user)
  })
}

// Create Post
export function createPost(body, location, timestamp, uid) {
  set(ref(db, 'posts/' + Date.now() + generateString(5)), {
    body,
    location,
    timestamp,
    user: uid,
  })
    .then(() => alert('Post created successfully'))
    .catch(err => alert(err.message))
}

// Gets Logged In User's Posts
export function getUserPosts(uuid, callbackFunc) {
  const que = query(ref(db, 'posts/'), orderByChild('user'), equalTo(uuid))
  get(que).then(snapshot => {
    callbackFunc(snapshot.val())
  })
}
