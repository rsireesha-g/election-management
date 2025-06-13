import { Navigate } from 'react-router-dom';

export const VoterPrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (!token || type !== 'voter') {
        return <Navigate to="/login" />
    }
    return children

}
