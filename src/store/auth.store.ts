import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type User = {
    id: string;
    email?: string;
    name?: string;
    isRegistered: boolean;
    isNeedToSync: boolean;
}

interface AuthState {
    user: User | null;
    createLocalUser: () => void;
    registerUser: (data: { email: string, name: string }) => void;
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
                }

                set({ user });
            },

            registerUser: ({ email, name }) => {
                const currentUser = get().user;

                if (!currentUser) {
                    const user: User = {
                        id: Crypto.randomUUID(),
                        isRegistered: true,
                        isNeedToSync: true,
                        name,
                        email,
                    }

                    set({ user })
                } else {
                    set({ user: {
                        ...currentUser,
                        email,
                        name,
                        isRegistered: true,
                        isNeedToSync: true,
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
