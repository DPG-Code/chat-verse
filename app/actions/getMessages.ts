import prisma from "@/app/libs/prismadb"

const getMessages = async (conversationId: string) => {
  try {
    // Retrieve messages from the database for a specific conversation ID
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true
      }
    })

    return messages

  } catch (error: any) {
    return []
  }
}
export default getMessages
