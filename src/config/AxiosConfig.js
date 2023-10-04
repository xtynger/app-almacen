import axios from 'axios';
import { existeTokenAcceso, obtenerTokenAcceso } from './LocalStorageService';

// Add a request interceptor
axios.interceptors.request.use(
	config => {
		const existeToken = existeTokenAcceso();
		let token;

		if (existeToken) {
			token = obtenerTokenAcceso();
		}

		if (token) {
			config.headers['token-acceso'] = token; // as return full code with token type
			// config.headers['Accept'] = 'application/json';
			// config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

// Add a response interceptor
axios.interceptors.response.use(
	response => response,
	error => Promise.reject(error),
);