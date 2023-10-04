import { 
	CONSULTAR_ORDEN_POR_ENVIO,
	LISTAR_ORDEN,
	LISTAR_ORDEN_DETALLE,
	REGISTRAR_ORDEN,
	REGISTRAR_ORDEN_DETALLE,
	MODIFICAR_ORDEN,
	LISTAR_ARTICULO_DETALLE,
	MODIFICAR_ORDEN_DETALLE,
	REGISTRAR_DETALLE_ARTICULO,
	MODIFICAR_AVANCE_ORDEN,
	ANULAR_ORDEN	
} from './OrdenVentaTypes';

const OrdenVentaReducer = (state = {}, action) => {
	switch (action.type) {
		case CONSULTAR_ORDEN_POR_ENVIO: {
			return {
				...state,
				listarOrden: action.listarOrden,
			};
		}
		case LISTAR_ORDEN: {
			return {
				...state,
				listarOrden: action.listarOrden,
			};
		}
		case LISTAR_ORDEN_DETALLE: {
			return {
				...state,
				listarOrden: action.listarOrden,
			};
		}

		/* CODIGO AGREGADO POR MOISES  */
		case LISTAR_ARTICULO_DETALLE: {
			return {
				...state,
				detalleArticulo: action.detalleArticulo,
			};
		}
		
		/* CODIGO AGREGADO POR MOISES  */

		case REGISTRAR_ORDEN: {
			return {
				...state,
				data: action.data,
			};
		}
		case MODIFICAR_ORDEN: {
			return {
				...state,
				data: action.data,
			};
		}
		case REGISTRAR_ORDEN_DETALLE: {
			return {
				...state,
				data: action.data,
			};
		}
		case REGISTRAR_DETALLE_ARTICULO: {
			return {
				...state,
				data: action.data,
			};
		}
		case MODIFICAR_ORDEN_DETALLE: {
			return {
				...state,
				data: action.data,
			};
		}
		case MODIFICAR_AVANCE_ORDEN: {
			return {
				...state,
				data: action.data,
			};
		}
		case ELIMINAR_DETALLE_HIJOS: {
			return {
				...state,
				data: action.data,
			};
		}
		case ANULAR_ORDEN: {
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

export default OrdenVentaReducer;
