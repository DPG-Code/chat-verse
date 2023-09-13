export const IconClose = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export const IconEdit = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 20h4L18.5 9.5a2.828 2.828 0 10-4-4L4 16v4M13.5 6.5l4 4" />
    </svg>
  )
}

export const IconGroup = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M10 13a2 2 0 104 0 2 2 0 00-4 0M8 21v-1a2 2 0 012-2h4a2 2 0 012 2v1M15 5a2 2 0 104 0 2 2 0 00-4 0M17 10h2a2 2 0 012 2v1M5 5a2 2 0 104 0 2 2 0 00-4 0M3 13v-1a2 2 0 012-2h2" />
    </svg>
  )
}

export const IconSeen = ({ status }: { status: string }) => {
  return (
    <svg
      className={`w-6 h-6 ${status === 'seen' ? 'stroke-green-500' : 'stroke-gray-500'}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M7 12l5 5L22 7M2 12l5 5m5-5l5-5" />
    </svg>
  )
}

export const IconBack = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

export const IconOptions = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
      <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0" />
    </svg>
  )
}

export const IconPhoto = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 7h1a2 2 0 002-2 1 1 0 011-1h6a1 1 0 011 1 2 2 0 002 2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2" />
      <path d="M9 13a3 3 0 106 0 3 3 0 00-6 0" />
    </svg>
  )
}

export const IconSend = () => {
  return (
    <svg
      className="w-6 h-6"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M10 14L21 3M21 3l-6.5 18a.55.55 0 01-1 0L10 14l-7-3.5a.55.55 0 010-1L21 3" />
    </svg>
  )
}
