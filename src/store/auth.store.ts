import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

type User = {
    id: string;
    email?: string;
    name?: string;
    isRegistered: boolean;
    isNeedToSync: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

interface AuthState {
    user: User | null;
    createLocalUser: () => void;
    registerUser: (data: { email: string, name: string, isNeedToSync: boolean, id?: string, createdAt?: Date }) => void;
    logout: () => void;
    reset: () => void;
    markSynced: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,

            createLocalUser: () => {
                const currentUser = get().user;

                if (currentUser) {
                    return;
                }

                const user: User = {
                    id: Crypto.randomUUID(),
                    isRegistered: false,
                    isNeedToSync: false,
                    createdAt: new Date(),
                }

                set({ user });
            },

            registerUser: ({ email, name, id, createdAt, isNeedToSync }) => {
                const currentUser = get().user;

                if (!currentUser) {
                    const user: User = {
                        id: id || Crypto.randomUUID(),
                        isRegistered: true,
                        isNeedToSync,
                        name,
                        email,
                        createdAt: createdAt || new Date(),
                    }

                    set({ user })
                } else {
                    set({ user: {
                        ...currentUser,
                        email,
                        name,
                        isRegistered: true,
                        isNeedToSync,
                    }})
                }
            },

            logout: () => {
                set({ user: null });
            },

            reset: () => {
                set({ user: null })
            },

            markSynced: () => { 
                const currentUser = get().user;

                if (!currentUser) {
                    return;
                }

                set({
                    user: {
                        ...currentUser,
                        isNeedToSync: false,
                    }
                })
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
