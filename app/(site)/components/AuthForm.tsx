'use client'

import { useCallback,useEffect,useState } from "react"
import { useForm,FieldValues,SubmitHandler } from "react-hook-form"
import Button from "@/app/components/Button"
import Input from "@/app/components/inputs/Input"
import AuthSocialButton from "./AuthSocialButton"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn,useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant,setVariant] = useState<Variant>('LOGIN')
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') router.push('/users')
  },[session?.status,router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  },[variant])

  const { register,handleSubmit,formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios.post('/api/register',data)
        .then(() => signIn('credentials',data))
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials',{
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) toast.error('Invalid Credentials!')
          if (callback?.ok && !callback?.error) {
            toast.success('Logged In!')
            router.push('/users')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const soacialAction = (action: string) => {
    setIsLoading(true)

    signIn(action,{ redirect: false })
      .then((callback) => {
        if (callback?.error) toast.error('Invalid Credentials!')
        if (callback?.ok && !callback?.error) toast.success('Logged In!')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4">
        {variant === 'REGISTER' && (
          <Input
            id='name'
            label='Name'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          id='email'
          label='Email'
          type="email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id='password'
          label='Password'
          type="password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Button
          disabled={isLoading}
          fullWidth
          type='submit'
        >
          {variant === 'LOGIN' ? 'Sign In' : 'Register'}
        </Button>
      </form>
      <span className="text-xs text-center text-gray-500">Or continue with</span>
      <div className="w-full flex items-center justify-center gap-2">
        <AuthSocialButton
          icon="google"
          onClick={() => soacialAction('google')}
        />
        <AuthSocialButton
          icon="github"
          onClick={() => soacialAction('github')}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <p className='text-center text-gray-500'>{variant === 'LOGIN' ? 'New to ChatVerse?' : 'Already have an account?'}</p>
        <button
          onClick={toggleVariant}
          className="py-1 px-4 flex items-center justify-center"
        >
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default AuthForm
