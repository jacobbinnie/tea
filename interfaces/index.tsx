import { User } from 'firebase/auth'

export interface UserSession {
  token: string
  user: User
}

export interface Location {
  latitude: number
  longitude: number
}
