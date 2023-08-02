import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { name, image } = body

    // Check if the user is authenticated
    if(!currentUser?.id) { 
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Update the user's information in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data:{
        name: name,
        image: image
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
