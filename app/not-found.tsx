import Link from 'next/link'
import './stars.css'

export default function Home() {
  return (
    <main id='principal-page' className='p-12 min-h-full w-full flex items-center justify-center overflow-hidden relative'>
      <section className='flex flex-col items-center justify-center text-center gap-16 z-10'>
        <h2 className='text-white text-3xl font-semibold lg:text-6xl 2xl:text-8xl'>404 - Not Found</h2>
        <p className='-mt-12 text-neutral-400 text-xl font-medium lg:text-2xl 2xl:text-4xl'>Could not find requested resource</p>
        <Link
          className='py-2.5 px-8 border-0 outline-0 bg-neutral-900 text-white hover:bg-neutral-800 transition font-medium flex items-center justify-center gap-2 rounded-xl lg:text-xl lg:px-12 lg:gap-3'
          href='/'
        >
          Return Home
        </Link>
      </section>
      <div id='stars'></div>
    </main>
  )
}
