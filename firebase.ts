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
  orderByKey,
} from 'firebase/database'
import { GeoFire, GeoQuery } from 'geofire'
import { AppUser, UserPost } from './interfaces'
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

let geoQuery: GeoQuery | undefined

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

const addUserInfo = async (
  postId: string,
  post: UserPost,
  handleAddToNearbyPosts: (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => void,
) => {
  if (post && post.user) {
    const que = query(ref(db, 'users/' + post.user))
    get(que).then(snapshot => {
      handleAddToNearbyPosts(postId, post, snapshot.val())
    })
  }
}

// Gets Single Post
export const getPublicPost = async (
  postId: string,
  handleAddToNearbyPosts: (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => void,
) => {
  const que = query(ref(db, 'posts/' + postId))
  get(que).then(snapshot => {
    addUserInfo(postId, snapshot.val(), handleAddToNearbyPosts)
  })
}

export function getNearbyPostIds(
  center: [number, number],
  radius: number,
  handleAddToNearbyPosts: (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => void,
  handleRemoveFromNearbyPosts: (key: string) => void,
) {
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

export function setGeofireKey(
  key: string,
  location: [latitude: number, longitude: number],
  handleAddToNearbyPosts: (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => void,
) {
  geoQuery?.cancel()
  geoFire.set(key, location).then(
    function () {
      console.log('Provided key has been added to GeoFire')
      getNearbyPostIds(location, 3, handleAddToNearbyPosts, () => {})
    },
    function (error) {
      console.log('Error: ' + error)
    },
  )
}

// Creates User in Realtime DB
export function createUser(
  uuid: string,
  name: string | null,
  image: string | null,
) {
  set(ref(db, 'users/' + uuid), {
    name,
    image,
    karma: 0,
  })
    .then(() => alert('User created successfully'))
    .catch(err => alert(err.message))
}

// Checks User Exists in Realtime DB. If Not, Creates User
export function checkUserCreated(
  uuid: string,
  name: string | null,
  image: string | null,
  handleUpdateAppUser: (
    image: string | null,
    name: string | null,
    karma: number,
  ) => void,
) {
  const que = query(ref(db, 'users/' + uuid))
  get(que).then(snapshot => {
    const user = snapshot.val()
    if (!user) {
      createUser(uuid, name, image)
      handleUpdateAppUser(image, name, 0)
    } else {
      handleUpdateAppUser(user.image, user.name, user.karma)
    }
  })
}

// Create Post
export function createPost(
  body: string,
  location: [latitude: number, longitude: number],
  timestamp: number,
  uid: string,
  handleAddToNearbyPosts: (
    postId: string,
    post: UserPost,
    user: AppUser,
  ) => void,
) {
  const generatedString = Date.now() + generateString(5)
  set(ref(db, 'posts/' + generatedString), {
    body,
    timestamp,
    user: uid,
  })
    .then(() => {
      setGeofireKey(generatedString, location, handleAddToNearbyPosts)
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
