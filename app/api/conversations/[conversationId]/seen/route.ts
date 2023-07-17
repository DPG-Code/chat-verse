import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'

interface IParams {
  conversationId?: string
}

export async function POST(
  request: Request,
  {params}: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    // Check if the current user is authorized
    if(!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Find the conversation by ID and include the messages and users
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    // Check if the conversation exists
    if(!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Get the last message in the conversation
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    // Check if there is a last message
    if(!lastMessage) {
      return NextResponse.json(conversation)
    }

    // Update the last message with the current user as seen
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage)

  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE_SEEN')
    return new NextResponse('Internal Error', { status: 500 })
  }
}