import { create } from "zustand"

// Define the shape of the store
interface ActiveListStore {
  members: string[]
  add: (id: string) => void
  remove: (id: string) => void
  set: (ids: string[]) => void
}

// Create a Zustand store using the create function
const useActiveList = create<ActiveListStore> ((set) => ({
  members: [],
  // Add a member ID to the list
  add: (id) => set((state) => ({members: [...state.members, id]})),
  // Remove a member ID from the list
  remove: (id) => set((state) => ({members: state.members.filter((memberId => memberId !== id))})),
  // Set the list of member IDs
  set: (ids) => set({members: ids})
}))

export default useActiveList