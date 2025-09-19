import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import api from '../service/api';
const useAuthStore = create(
    persist(
        (set,get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,


            isAuthenticated: () => get().token,

            setLoading: (loading) => set({isLoading: loading}),
            setError: (error) => set({error}),
            clearError: () => set({error: null}),

             initialize: () => {
                const { token } = get()
                if ( token ) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }
            },


            register: async (name, email, password) => {
                set({isLoading: true, error: null})
                try {
                    const response = await api.post('/users/register', {name, email, password})
                    const {user} = response.data;
                    
                    set({
                        user,
                        isLoading: false,
                        error:null,
                    })
                    return {success: true, user}
                } catch (error) {
                    const errorMessage = error.message?.data?.error || 'error ao cadastrar usuario'
                    set({
                        isLoading: false,
                        error: errorMessage,
                        user: null,
                    })
                    return({success: false, error: errorMessage})
                }
            },  login: async (email, password) => {
                    set({isLoading: true, error: null})
                    try {
                        const response = await api.post('/users/login', {email, password})
                        const {token} = response.data

                        api.defaults.headers.common['Authorization'] = `Bearer${token}`

                        set({
                            token,
                            isLoading: false,
                            error: null,
                        })
                        return {success: true, token}
                    } catch (error) {
                        const errorMessage = error.message?.data?.error || 'error ao logar usuario'
                        set({
                            isLoading: false,
                            error: errorMessage,
                            token: null,
                            user: null,
                        })
                        return {success: false, error: errorMessage}
                    }
                 }
        })
        ,{
            name: 'auth-store',
            partialize: (state) => ({
                user: state.user,
                toke: state.token
            })
        }
    )
)


export default useAuthStore;