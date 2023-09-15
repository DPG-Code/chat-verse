import Image from "next/image"
import AuthForm from "./components/AuthForm"

export default function Home() {
  return (
    <main className='px-12 min-h-full w-full grid place-content-center overflow-hidden'>
      <section className='flex flex-col items-center justify-center gap-16 z-10 lg:gap-12 2xl:gap-16'>
        <h1 className='text-center text-white text-6xl font-bold lg:text-8xl 2xl:text-9xl'>ChatVerse</h1>
        <div className='flex flex-col items-center justify-center gap-8'>
          <h2 className='text-center text-white text-xl font-medium lg:text-3xl 2xl:text-4xl'>Sign in to your account!</h2>
          <AuthForm />
        </div>
      </section>
      <Image
        className='min-w-screen min-h-screen object-cover z-0'
        fill
        src='/images/background.webp'
        alt='background'
      />
    </main>
  )
}
