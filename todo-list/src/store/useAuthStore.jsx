import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { publicApi, privateApi } from '../service/api';
const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,


            isAuthenticated: () => get().token,

            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            initialize: () => {
                const { token } = get()
                if (token) {
                    privateApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }
            },


            register: async (name, email, password) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await publicApi.post('/users/register', { name, email, password })
                    const { user } = response.data;

                    set({
                        user,
                        isLoading: false,
                        error: null,
                    })
                    return { success: true, user }
                } catch (error) {
                    const errorMessage = error.message?.data?.error || 'error ao cadastrar usuario'
                    set({
                        isLoading: false,
                        error: errorMessage,
                        user: null,
                    })
                    return ({ success: false, error: errorMessage })
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await publicApi.post('/users/login', { email, password })
                    const { token } = response.data

                    privateApi.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    set({
                        token: token,
                        isLoading: false,
                        error: null,
                    })
                    return { success: true, token }
                } catch (error) {
                    const errorMessage = error.response?.data?.error || 'Erro ao logar usuario';

                    set({
                        isLoading: false,
                        error: errorMessage,
                        token: null,
                        user: null,
                    })

                    return { success: false, error: errorMessage }
                }
            }
        })
        , {
            name: 'auth-data',
            partialize: (state) => ({
                user: state.user,
                token: state.token
            })
        }
    )
)


export default useAuthStore;