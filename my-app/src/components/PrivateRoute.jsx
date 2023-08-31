import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from 'helpers';

export { PrivateRoute };

function PrivateRoute({roles, children }) {
    const { user: authUser } = useSelector(x => x.auth);
    const navigate = useNavigate();
    
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    if(roles) {
        console.log(roles);
        if(!authUser.roles.includes(roles)) {
            return <Navigate to="/unauthorized" state={{ from: history.location }} />
        }
    }
    

    // authorized so return child components
    return children;
}