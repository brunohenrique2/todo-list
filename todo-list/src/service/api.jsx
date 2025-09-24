import axios from 'axios';


export const publicApi = axios.create({
    baseURL: 'http://localhost:3000/public'
})

export const privateApi = axios.create({
    baseURL: 'http://localhost:3000/private'
})


privateApi.interceptors.request.use(
    (config) => {
        const authData = JSON.parse(localStorage.getItem('auth-data'));
        const token = authData?.state?.token;

        if (!token) return config; // sem token, segue normal

        // Função pra checar validade
        function isTokenValid(token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const now = Math.floor(Date.now() / 1000);
                return payload.exp > now;
            } catch {
                return false;
            }
        }

        if (!isTokenValid(token)) {
            localStorage.removeItem('auth-data');
            throw new Error("Token expirado!");
        }

        // Se chegou aqui, o token é válido
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
