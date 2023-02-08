import { User } from 'firebase/auth'

export interface UserSession {
  token: string
  user: User
}

export interface Location {
  latitude: number
  longitude: number
}

export interface UserPost {
  body: string
  location: Location
  timestamp: number
  user: string
}
