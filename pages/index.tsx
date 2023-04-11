import Home from '../src/components/home'
import { useAuth } from '../providers/authProvider'

export default function HomeBuilder() {
  const { authUser } = useAuth()

  if (authUser && navigator) {
    return <Home />
  }
}
