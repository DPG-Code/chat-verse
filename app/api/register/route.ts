import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

// Register new User
export async function POST(
  request: Request
) {
  // Get data -> hashed password (bcrypt) -> create new user -> return user
  try {
    const body = await request.json()
    const { email, name, password } = body
  
    if(!email || !name || !password) return new NextResponse('Missing info', { status: 400 })
  
    const hashedPassword = await bcrypt.hash(password, 12)
  
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