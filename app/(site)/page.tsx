import Image from "next/image"
import AuthForm from "./components/AuthForm"
import './stars.css'

export default function Home() {
  return (
    <main id='principal-page' className='px-12 min-h-full w-full flex items-center justify-center overflow-hidden relative'>
      <section className='flex flex-col items-center justify-center gap-16 z-10 lg:gap-12 2xl:gap-16'>
        <Image
          className='w-96 h-auto invert lg:w-[640px]'
          width='640'
          height='140'
          src='/chatverse.webp'
          alt='logo'
          priority
        />
        <div className='flex flex-col items-center justify-center gap-8'>
          <h2 className='text-center text-white text-xl font-medium lg:text-3xl 2xl:text-4xl'>Start talking to your friends!</h2>
          <p className='-mt-4 text-center text-neutral-500 text-lg font-medium lg:text-xl 2xl:text-2xl'>What are you waiting?, its free.</p>
          <AuthForm />
        </div>
      </section>
      <div id="stars"></div>
    </main>
  )
}
