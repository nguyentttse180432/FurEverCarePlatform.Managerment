import { create } from 'zustand';
import { IUser } from '../models/IUser';

interface UserState {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users: IUser[]) => set({ users }),
}));

export default useUserStore;