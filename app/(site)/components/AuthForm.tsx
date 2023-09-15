'use client'

import { useCallback,useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { signIn,useSession } from "next-auth/react"
import { useForm,FieldValues,SubmitHandler } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"

import Button from "@/app/components/Button"
import Input from "@/app/components/inputs/Input"
import AuthSocialButton from "./AuthSocialButton"
import { IconArrowRight } from "@/app/components/Icons"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant,setVariant] = useState<Variant>('LOGIN')
  const [isLoading,setIsLoading] = useState(false)

  // Show Login or Register FORM depending of variant ('LOGIN' | 'REGISTER')
  useEffect(() => {
    if (session?.status === 'authenticated') router.push('/users')
  },[session?.status,router])

  // Function to toggle variant
  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  },[variant])

  // Data from form
  const { register,handleSubmit,formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  // Action to realize depending of variant ('LOGIN' | 'REGISTER')
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

  // Choisse action to realize
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
    <div className='flex flex-col items-center justify-center gap-5'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-6">
        {variant === 'REGISTER' && (
          <Input
            id='name'
            placeholder='Name'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}
        <Input
          id='email'
          placeholder='Email'
          type='email'
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id='password'
          placeholder='Password'
          type='password'
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Button
          disabled={isLoading}
          type='submit'
        >
          {variant === 'LOGIN' ? 'Sign In' : 'Register'}
          <IconArrowRight />
        </Button>
      </form>
      <span className='text-base text-center text-neutral-500 font-semibold lg:text-lg'>Or continue with</span>
      <div className='w-full flex items-center justify-center gap-2 lg:gap-6'>
        <AuthSocialButton
          icon='google'
          onClick={() => soacialAction('google')}
        />
        <AuthSocialButton
          icon='github'
          onClick={() => soacialAction('github')}
        />
      </div>
      <footer className='w-full text-base flex items-center justify-center gap-3 lg:text-xl'>
        <p className='text-center text-neutral-400 font-medium'>{variant === 'LOGIN' ? 'New to ChatVerse?' : 'Already have an account?'}</p>
        <button onClick={toggleVariant}>
          <p className='text-white font-bold underline underline-offset-4'>{variant === 'LOGIN' ? 'Create an account' : 'Login'}</p>
        </button>
      </footer>
    </div>
  )
}

export default AuthForm
