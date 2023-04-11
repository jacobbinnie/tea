import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth'
import { getApps } from 'firebase/app'
import { app, checkUserCreated } from '../firebase'
import { DbUser, UserSession } from '../interfaces'
import { useRouter } from 'next/router'

interface AuthContextValues {
  authUser: User | null
  signInWithGoogle: () => Promise<void | null>
}

const AuthContext = createContext<AuthContextValues>({
  authUser: null,
  signInWithGoogle: async () => null,
})

interface AuthProviderOptions {
  children?: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [dbUser, setDbUser] = useState<DbUser | null>(null)

  const router = useRouter()

  const auth = getAuth()
  const authUser = auth.currentUser

  useEffect(() => {
    !authUser && router.pathname !== '/login' && router.push('./login')
  }, [authUser])

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
      user.user.email!,
      user.user.photoURL,
      setDbUser,
    )
  }

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
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
  }

  const value = {
    authUser,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
