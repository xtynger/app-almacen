import { obtenerTokenAcceso } from '../../config/LocalStorageService';

const useAuth = () => {
	try {
		return obtenerTokenAcceso().length > 0;
	} catch (error) {
		return false;
	}
};

export default useAuth;