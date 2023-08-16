import PusherServer from "pusher"
import PusherClient from "pusher-js"

// Create a new Pusher server instance for server-side
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true
})

// Create a new Pusher client instance for client-side
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth', // Where the authentication handler is located
      transport: 'ajax'
    },
    cluster: 'eu'
  }
)