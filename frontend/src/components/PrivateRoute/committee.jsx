import { Navigate } from 'react-router-dom';

export const CommitteePrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');


    if (!token || type !== 'committee') {
        return <Navigate to="/login" />
    }
    return children

}
