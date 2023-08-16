import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher"

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, image, conversationId } = body

    // Check if the current user is authorized
    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Create a new message
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        sender: true,
        seen: true
      } 
    })

    // Update the conversation with the new message
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    })

    // Trigger Pusher event to inform users about the new message
    await pusherServer.trigger(conversationId, 'messages:new', newMessage)

    // Get the last message in the updated conversation
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

    // Trigger Pusher events to inform users about the updated conversation
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        message: [lastMessage]
      })
    })

    return NextResponse.json(newMessage)

  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE')
    return new NextResponse('Internal Error', { status: 500 })
  }
}