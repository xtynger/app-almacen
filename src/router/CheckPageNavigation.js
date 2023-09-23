import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';

export const PrivateOutlet = () => {
	const auth = useAuth();
	return auth ? <Outlet /> : <Navigate to='/login' />;
};

export const PublicOutlet = () => {
	const auth = useAuth();
	return !auth ? <Outlet /> : <Navigate to='/' />;
};