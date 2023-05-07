import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  browserSessionPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  User,
  UserCredential,
} from 'firebase/auth'
import { getApps } from 'firebase/app'
import { app, checkUserCreated } from '../firebase'
import { useRouter } from 'next/router'
import { AppUser } from 'interfaces'

interface AuthContextValues {
  user: User | null
  appUser: AppUser | null
  signInWithGoogle: (
    handleSetSigningIn: (value: boolean) => void,
  ) => Promise<void | null>
}

const AuthContext = createContext<AuthContextValues>({
  user: null,
  appUser: null,
  signInWithGoogle: async () => null,
})

interface AuthProviderOptions {
  children?: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [user, setUser] = useState<User | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)

  const router = useRouter()
  const auth = getAuth()

  const handleUpdateAppUser = (
    image: string | null,
    name: string | null,
    karma: number,
  ) => {
    setAppUser({
      image,
      name,
      karma,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        checkUserCreated(
          user.uid,
          user.displayName,
          user.photoURL,
          handleUpdateAppUser,
        )
        setUser(user) // logged in user object
      } else {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login' // redirect to login page
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const initializeFirebase = useCallback(() => {
    app
    auth.languageCode = 'it'
  }, [])

  if (getApps().length < 1) {
    initializeFirebase()
  }

  const provider = new GoogleAuthProvider()

  const addUserToDatabase = async (user: UserCredential) => {
    checkUserCreated(
      user.user.uid,
      user.user.displayName,
      user.user.photoURL,
      handleUpdateAppUser,
    )
  }

  const signInWithGoogle = async (
    handleSetSigningIn: (value: boolean) => void,
  ) => {
    if ('ontouchstart' in document.documentElement) {
      try {
        handleSetSigningIn(true)
        await setPersistence(auth, browserSessionPersistence)
        // Start a sign in process for an unauthenticated user.
        provider.addScope('profile')
        provider.addScope('email')
        await signInWithRedirect(auth, provider)
        // This will trigger a full page redirect away from your app

        // After returning from the redirect when your app initializes you can obtain the result
        const result = await getRedirectResult(auth)
        if (result) {
          // This is the signed-in user
          const user = result.user
          // This gives you a Google Access Token.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          if (credential) {
            const token = credential.accessToken
            if (token && user) {
              addUserToDatabase(result)
            }
          }
          router.push('./')
          handleSetSigningIn(false)
        }
      } catch (error) {
        handleSetSigningIn(false)
        console.log(error)
        throw new Error('Something went wrong')
      }
    } else {
      // DESKTOP LOGIC
      handleSetSigningIn(true)
      setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          return signInWithPopup(auth, provider)
            .then(result => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result)
              if (credential) {
                const token = credential.accessToken
                const user = result.user

                if (token && user) {
                  addUserToDatabase(result)
                }
              }
              router.push('./')
              handleSetSigningIn(false)
            })
            .catch(error => {
              handleSetSigningIn(false)
              const errorCode = error.code
              const errorMessage = error.message
              throw new Error(errorCode, errorMessage)
            })
        })
        .catch(error => {
          handleSetSigningIn(false)
          // Handle Errors here.
          throw new Error(error)
        })
    }
  }

  const value = {
    user,
    appUser,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
