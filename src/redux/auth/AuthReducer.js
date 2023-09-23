import { AUTH_LOGIN } from './AuthTypes';

const AuthReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH_LOGIN: {
			return {
				...state,
				usuario: action.usuario,
			};
		}
		default: {
			return state;
		}
	}
};

export default AuthReducer;
