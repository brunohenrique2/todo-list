import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const authData = JSON.parse(localStorage.getItem('auth-data'));
    const token = authData?.state?.token;

    function isTokenValid(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp > now;
        } catch {
            return false;
        }
    }

    if (!token || !isTokenValid(token)) {
        // redireciona pro login se não tiver token ou se expirou
        localStorage.removeItem('auth-data');
        return <Navigate to="/login" replace />;
    }

    return children; // token válido → libera acesso
}

export default ProtectedRoute