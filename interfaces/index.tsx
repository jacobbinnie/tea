import { User } from 'firebase/auth'

export interface UserSession {
  token: string
  user: User
}

export interface Location {
  location: [latitude: number, longitude: number]
}

export interface UserPost {
  body: string
  timestamp: number
  user: string
}

export interface PublicPost extends UserPost {
  image?: string | null | undefined
}

export interface DbUser {
  email: string
  image: string
  name: string
}
