import React from 'react'

interface LoginModalProps {
  signInWithGoogle: () => Promise<void | null>
}

export const LoginModal: React.FC<LoginModalProps> = ({ signInWithGoogle }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <p className="text-md font-extrabold cursor-pointer tracking-tight text-primary">
        what's happening. nearby.
      </p>

      <div className="flex w-full justify-between items-center gap-1 fixed bottom-6 px-5">
        <p className="text-3xl font-extrabold italic cursor-pointer tracking-tight text-primary">
          tea.wtf
        </p>

        <button
          onClick={() => signInWithGoogle()}
          type="button"
          className="text-white font-medium rounded-lg border-quarterly border-[1px] py-3 px-5"
        >
          <p className="text-quarterly">sign in with Google</p>
          {/* <svg
            className="w-4 h-4 text-tertiary"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg> */}
        </button>
      </div>
    </div>
  )
}

export default LoginModal
