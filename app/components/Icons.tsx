export const IconClose = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  )
}

export const IconEdit = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
      <path d="M13.5 6.5l4 4"></path>
    </svg>
  )
}

export const IconGroup = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
      <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
      <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
    </svg>
  )
}

export const IconSeen = ({ status }: { status: string }) => {
  return (
    <svg className={`w-6 h-6 ${status === 'seen' ? 'stroke-green-500' : 'stroke-gray-500'} lg:w-8 lg:h-8`} width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 12l5 5l10 -10"></path>
      <path d="M2 12l5 5m5 -5l5 -5"></path>
    </svg>
  )
}

export const IconBack = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 6l-6 6l6 6"></path>
    </svg>
  )
}

export const IconOptions = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
    </svg>
  )
}

export const IconPhoto = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
      <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
    </svg>
  )
}

export const IconSend = () => {
  return (
    <svg className="w-6 h-6 lg:w-8 lg:h-8" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 14l11 -11"></path>
      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
    </svg>
  )
}
