import { User } from 'firebase/auth'

export interface UserSession {
  token: string
  user: User
}

export interface Location {
  location: [latitude: number, longitude: number]
}

export interface AppUser {
  image: string | null
  name: string | null
  karma: number
}

export interface UserPost {
  postId: string
  body: string
  timestamp: number
  user: AppUser
}

export interface PublicPost extends UserPost {
  image?: string | null | undefined
}

export interface Vote {
  id: string
  postId: string
  userId: string
  voteValue: 1 | -1 | 0
}
