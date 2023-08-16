'use client'

import useActiveChannel from "../hooks/useActiveChannel"

const ActiveStatus = () => {
  // Use the useActiveChannel hook to manage active channels/members
  useActiveChannel()

  // Return null (no visible component)
  return null
}
export default ActiveStatus
