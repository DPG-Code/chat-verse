import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

// Register new User
export async function POST(
  request: Request
) {
  try {
    const body = await request.json()
    const { email, name, password } = body
  
    // Check if required information is missing
    if(!email || !name || !password) return new NextResponse('Missing info', { status: 400 })
  
    // Hash the password.
    const hashedPassword = await bcrypt.hash(password, 12)
  
    // Create a new user and return the user object
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })
  
    return NextResponse.json(user)

  } catch (error: any) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal error', { status: 500 })
  }
}