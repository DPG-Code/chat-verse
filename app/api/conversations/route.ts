import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { pusherServer } from "@/app/libs/pusher"

// Handles the POST request for creating a conversation
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { userId, isGroup, members, name } = body

    // Check if the current user is authenticated
    if(!currentUser?.id || !currentUser?.email){
      return new NextResponse('Unauthorized', { status : 401 })
    }
    // Check if it's a group conversation and validate the data
    if(isGroup && (!members || members.length < 2 || !name)){
      return new NextResponse('Invalid data', { status : 400 })
    }

    // Create a new group conversation
    if(isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })

      newConversation.users.forEach((user) => {
        if(user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
          }
      })

      return NextResponse.json(newConversation)
    }

    // Check if there is an existing conversation with the user
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    })

    // Return the existing conversation if found
    const singleConversation = existingConversations[0]
    if(singleConversation) return NextResponse.json(singleConversation)

    // Create a new conversation with the user
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    })

    // Trigger Pusher event to inform users about the new conversation
    newConversation.users.forEach((user) => {
      if(user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation)
      }
    })

    return NextResponse.json(newConversation)

  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}