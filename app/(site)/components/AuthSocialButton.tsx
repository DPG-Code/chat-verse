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
      className='py-2.5 px-8 bg-neutral-800 text-white font-semibold flex items-center justify-center gap-3 rounded-xl lg:px-12 lg:text-xl'
    >
      {icon}
      {
        icon === 'google'
          ? <IconGoogle />
          : <IconGithub />
      }
    </button>
  )
}
export default AuthSocialButton
