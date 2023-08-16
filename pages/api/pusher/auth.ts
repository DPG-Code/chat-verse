import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { pusherServer } from "@/app/libs/pusher"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

// This function handles the authentication for Pusher presence channels
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Retrieve the user session using next-auth
  const session = await getServerSession(request, response, authOptions)

  // Check if the user is authenticated
  if(!session?.user?.email) {
    return response.status(401)
  }

  const socketId = request.body.socket_id
  const channel = request.body.channel_name
  // Prepare data for authentication (here, user_id is set to the user's email)
  const data = { user_id : session.user.email }

  // Authorize the user's access to the channel using Pusher
  const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

  return response.send(authResponse)
}