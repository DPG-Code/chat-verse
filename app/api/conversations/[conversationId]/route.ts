import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher"

interface IParams {
  conversationId?: string
}

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    // Check if the user is authenticated
    if(!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if the conversation exists
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    // If conversation does not exist, return a bad request response
    if(!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Delete the conversation from the database
    const deletedConversaton = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: currentUser.id
        }
      }
    })

    // Trigger Pusher event to inform users about conversation removal
    existingConversation.users.forEach((user) => {
      if(user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
      }
    })

    return NextResponse.json(deletedConversaton)

  } catch (error:any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
