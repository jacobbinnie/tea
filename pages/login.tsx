import LoginModal from '../components/login'
import { useAuth } from '../providers/authProvider'

export default function Login() {
  const { signInWithGoogle } = useAuth()
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <LoginModal signInWithGoogle={signInWithGoogle} />
    </div>
  )
}
