import { Navigate } from 'react-router-dom';

export const CommitteePrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('user_type');

    console.log(token, type, 'private route')
    if (!token || type !== 'committee') {
        return <Navigate to="/login" />
    }
    return children

}
