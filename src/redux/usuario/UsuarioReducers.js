import {
	USUARIO_LISTAR,
	USUARIO_LISTAR_ID,
	USUARIO_DETALLE,
	USUARIO_VALIDAR_REGISTRAR,
	USUARIO_REGISTRAR,
	USUARIO_ACTUALIZAR,
	USUARIO_ELIMINAR,
	ANULAR_USUARIO
	
} from './UsuarioTypes';

const UsuarioReducers = (state = {}, action) => {
	switch (action.type) {
		case USUARIO_LISTAR: {
			return {
				...state,
				usuarios: action.usuarios,
			};
		}
		case USUARIO_LISTAR_ID: {
			return {
				...state,
				usuario: action.usuario,
			};
		}
		case USUARIO_DETALLE: {
			return {
				...state,
				detalleUsuario: action.detalleUsuario,
			};
		}
		case USUARIO_VALIDAR_REGISTRAR: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_REGISTRAR: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_ACTUALIZAR: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_ELIMINAR: {
			return {
				...state,
				data: action.data,
			};
		}		
		case ANULAR_USUARIO: {
			return {
				...state,
				data: action.data,
			};
		}
		case USUARIO_ORDENES:{
			return {
				...state,
				data: action.data,
			};
		}
		default: {
			return state;
		}
	}
};

export default UsuarioReducers;