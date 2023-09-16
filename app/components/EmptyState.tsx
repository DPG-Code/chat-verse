import { IconNewChat } from "./Icons"

const EmptyState = () => {
  return (
    <div id='empty-state' className='px-24 w-full h-full text-neutral-400 flex flex-col items-center justify-center relative overflow-hidden gap-4'>
      <h3 className='text-center text-xl lg:text-2xl 2xl:text-3xl'>Select a chat or start a new conversation</h3>
      <IconNewChat />
    </div>
  )
}
export default EmptyState
