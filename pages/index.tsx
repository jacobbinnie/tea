import Home from '../components/Home'
import { useAuth } from '../providers/authProvider'

export default function HomeBuilder() {
  const { user } = useAuth()

  if (user) {
    return <Home />
  }
}
