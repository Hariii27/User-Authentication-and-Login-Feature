import {Routes, Route, Navigate} from 'react-router-dom';
import Register from'./Pages/register';
import Login from './Pages/login';
import Dashboard from'./Pages/dashboard';
import Protectedroute from './Components/protectedroute';

export default function App(){
    return(
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route 
                path="/dashboard"
                element={
                    <protectedRoute>
                        <Dashborad/>
                    </protectedRoute>
                }
            />
            <route path="*" element={<Navigate to="/login" replace />}/>
        </Routes>
    )
}
