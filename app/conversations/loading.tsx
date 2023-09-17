import { IconLoader } from "../components/Icons"

const Loading = () => {
  return (
    <div
      className='w-screen h-screen text-fuchsia-700 bg-neutral-950/25 backdrop-blur-sm flex items-center justify-center fixed z-[100]'
    >
      <IconLoader />
    </div>
  )
}
export default Loading
