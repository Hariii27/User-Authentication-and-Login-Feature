import {useAuth} from '../Context/authcontext';

export default function Dashborad() {
    const {user,logout} = useAuth();

    return(
        <div style={{ maxWidth: 480, margin:'60px auto'}}>
            <h2>Welcome, {user.name}</h2>
            <p>Email:{user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
    
}