import Swal from "sweetalert2";

const ALMACENAMIENTO_DE_AUTORIZACION = 'ALMACENAMIENTO_DE_AUTORIZACION';

export const guardarAutorizacion = data => {
	localStorage.setItem(ALMACENAMIENTO_DE_AUTORIZACION, JSON.stringify(data));
	console.log("data",localStorage.getItem(ALMACENAMIENTO_DE_AUTORIZACION));
};

export const obtenerAutorizacion = () => {
	const autorizacion = localStorage.getItem(ALMACENAMIENTO_DE_AUTORIZACION);

	if (autorizacion !== null) return JSON.parse(autorizacion);

	throw new Error('Se requiere iniciar sesión');
};

export const obtenerTokenAcceso = () => {
	const autorizacion = localStorage.getItem(ALMACENAMIENTO_DE_AUTORIZACION);
	//console.log("autorizacion",autorizacion);
	if (autorizacion !== null) {
		const usuario = JSON.parse(autorizacion);
		//console.log("usuario",usuario);
		return usuario.passwordHash;
	}

	throw new Error('Se requiere iniciar sesión');
};

export const removerAutorizacion = () => {
	
	Swal.fire({
		title: '¿Desea cerrar sesión?',
		showCancelButton: true,
		confirmButtonText: 'Confirmar',
		cancelButtonText:'Cancelar',
		confirmButtonColor: '#369978'
		
	  }).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
		  localStorage.removeItem(ALMACENAMIENTO_DE_AUTORIZACION);
		  window.location.href='/';
		}
	  });
	
};

export const existeTokenAcceso = () => {
	const autorizacion = localStorage.getItem(ALMACENAMIENTO_DE_AUTORIZACION);

	if (autorizacion !== null) return true;

	return false;
};