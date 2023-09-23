import axios from 'axios';
import { AUTH_LOGIN } from './AuthTypes';
import { API_BASE_URL } from '../../config/Services';


export const solicitarAcceso = paramData => async dispatch => {
	var formData = new FormData();
	formData.append("username", paramData.username);
    formData.append("password", paramData.password);

	const response = await axios.post(
		`${API_BASE_URL}/serviciologinusuario.php`,formData
	);
	console.log("patchchch:",response);

	return dispatch({
		type: AUTH_LOGIN,
		status: response.status,
		usuario: response.data,
	});
};
