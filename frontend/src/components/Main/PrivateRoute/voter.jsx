import { Navigate } from 'react-router-dom';

export const VoterPrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('user_type');

    if (!token || type !== 'voter') {
        return <Navigate to="/" replace />
    }
    return children

}
