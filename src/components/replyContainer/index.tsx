import { PublicPost } from 'interfaces'
import Reply from '../reply'

interface ReplyContainerProps {
  post: PublicPost
}

export const ReplyContainer: React.FC<ReplyContainerProps> = ({ post }) => {
  return (
    <div className="w-full">
      <div className="w-full h-[1px] bg-quarterly my-5 opacity-10" />
      <Reply post={post} />
      <div className="w-full h-[1px] bg-quarterly my-5 opacity-10" />
    </div>
  )
}

export default ReplyContainer
