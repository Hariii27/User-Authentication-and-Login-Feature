import {Naviagte} from 'react-router-dom';
import {useAuth} from '../Context/auth';

export default function protectedroute({children}){
    const {user, loading} = useAuth();

    if(loading) return <p>Loading...</p>
    if(!user) return <Navigate to="/login" replace />;

    return children;
}