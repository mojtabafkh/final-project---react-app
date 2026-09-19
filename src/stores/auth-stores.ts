import { create } from "zustand";
import type { User } from "../types/user";

type AuthStore = {
    user: User | null;
    setUser: (data: User) => void;
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,

    setUser: (newData) => {
        set(() => ({ user: newData }))
    },


}))