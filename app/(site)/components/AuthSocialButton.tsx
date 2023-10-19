import { IconGithub,IconGoogle } from "@/app/components/Icons"

interface AuthSocialButtonProps {
  icon: 'google' | 'github'
  onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon,onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='p-1 w-36 border border-neutral-300 backdrop-blur bg-neutral-400/5 text-white font-light flex items-center justify-between gap-3 rounded-full hover:bg-neutral-400/10 transition lg:text-xl xl:p-2 xl:w-48'
    >
      <span className='ml-3 xl:ml-4'>{icon[0].toUpperCase() + icon.slice(1)}</span>
      <div className='p-1.5 bg-white text-[#0a0a0a] grid place-content-center rounded-full xl:p-2'>
        {
          icon === 'google'
            ? <IconGoogle />
            : <IconGithub />
        }
      </div>
    </button>
  )
}
export default AuthSocialButton
