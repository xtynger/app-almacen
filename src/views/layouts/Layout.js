import Admin from './Admin';
import Auth from './Auth';
import useAuth from '../../hooks/auth/useAuth';
import { obtenerAutorizacion } from '../../config/LocalStorageService';

const Layout = () => {
	const auth = useAuth();
	if(auth) {
		let data = obtenerAutorizacion();
    	window.usuario = data;
	}
	return (
		<>
			{auth ? <Admin /> : <Auth />}
		</>
	);
};

export default Layout;