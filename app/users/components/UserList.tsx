"use client"

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className="flex flex-col">
      <strong>People</strong>
      <div className="flex flex-col">
        {
          items.map((item) => (
            <UserBox
              key={item.id}
              data={item}
            />
          ))
        }
      </div>
    </div>
  )
}
export default UserList
