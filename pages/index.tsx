import Home from '../components/home'
import { useAuth } from '../providers/authProvider'

export default function HomeBuilder() {
  const { user } = useAuth()

  if (user && navigator) {
    return <Home />
  }
}
