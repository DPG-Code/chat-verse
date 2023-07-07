interface AuthSocialButtonProps {
  icon: 'google' | 'github'
  onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon,onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-1 px-4 flex items-center justify-center"
    >
      {icon}
    </button>
  )
}
export default AuthSocialButton
