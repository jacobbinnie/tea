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
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
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
  signInWithGoogle: () => Promise<void | null>
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
    console.log('Initialized Firebase')
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

  const signInWithGoogle = async () => {
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
          })
          .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            throw new Error(errorCode, errorMessage)
          })
      })
      .catch(error => {
        // Handle Errors here.
        throw new Error(error)
      })
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
