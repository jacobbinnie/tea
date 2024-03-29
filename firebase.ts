import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  remove,
  query,
  get,
  orderByChild,
  equalTo,
  update,
  onValue,
} from 'firebase/database'
import { GeoFire, GeoQuery } from 'geofire'
import { AppUser, UserPost, Vote } from './interfaces'
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

const firebaseRef = ref(db, 'geofireKeys/')
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

  geoQuery.on('key_entered', (postId: string) => {
    if (!processedIds.includes(postId)) {
      const que = query(ref(db, 'posts/' + postId))

      get(que).then(snapshot => {
        const userPost = snapshot.val()
        if (postId && userPost) {
          const que = query(ref(db, 'users/' + snapshot.val().user))

          get(que).then(snapshot => {
            handleAddToNearbyPosts(postId, userPost, snapshot.val())
          })
        }
      })
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
  try {
    set(ref(db, 'posts/' + generatedString), {
      body,
      timestamp,
      user: uid,
    })
    setGeofireKey(generatedString, location, handleAddToNearbyPosts)
    return true
  } catch (err) {
    throw new Error('Something went wrong')
    return false
  }
}

// Gets Logged In User's Posts
export function getUserPosts(
  uuid: string,
  handleAddToMyPosts: (posts: UserPost[]) => void,
) {
  const que = query(ref(db, 'posts/'), orderByChild('user'), equalTo(uuid))
  get(que).then(async snapshot => {
    handleAddToMyPosts(snapshot.val())
  })
}

export async function getUserVotes(userId: string) {
  const voteRef = ref(db, 'votes/')
  const userVotesQuery = query(voteRef, orderByChild('userId'), equalTo(userId))

  try {
    const snapshot = await get(userVotesQuery)
    return snapshot.val()
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

// Likes User Post
export async function votePost(
  userId: string,
  postId: string,
  voteValue: 1 | -1,
) {
  try {
    const votes = await getUserVotes(userId)

    let hasVoted = false
    let voteId = ''
    if (votes) {
      Object.keys(votes).forEach(key => {
        if (votes[key].postId === postId) {
          hasVoted = true
          voteId = key
        }
      })
    }

    if (hasVoted) {
      // Only update vote value if it's different from current value
      if (votes[voteId].voteValue !== voteValue) {
        await update(ref(db, `votes/${voteId}`), { voteValue })
      } else {
        remove(ref(db, `votes/${voteId}`))
      }
    } else {
      const generatedString = Date.now() + generateString(5)

      set(ref(db, `votes/${generatedString}`), {
        id: generatedString,
        postId: postId,
        userId: userId,
        voteValue: voteValue,
      })
    }
  } catch (err) {
    console.log('Error while fetching user votes: ', err)
  }
}

export async function getPostVotes(
  postId: string,
  callback: (count: number) => void,
) {
  const voteRef = ref(db, 'votes/')
  const postVotesQuery = query(voteRef, orderByChild('postId'), equalTo(postId))

  let count = 0

  onValue(
    postVotesQuery,
    snapshot => {
      if (snapshot.val()) {
        const votes = Object.values<Vote>(snapshot.val())
        const count = votes.reduce((acc, vote) => acc + vote.voteValue, 0)

        callback(count)
      } else {
        const count = 0

        callback(count)
      }
    },
    error => {
      console.log('Error while fetching post votes: ', error)
    },
  )

  return count
}
