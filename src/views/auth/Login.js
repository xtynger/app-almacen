import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { toastme } from 'toastmejs';
import { StatusCodes } from 'http-status-codes';
import store from '../../redux/Store';
import { solicitarAcceso } from '../../redux/auth/AuthActions';
import { guardarAutorizacion } from '../../config/LocalStorageService';

const Login = () => {
	const [credencial, setCredencial] = useState({ username: '', password: '' });

	const cambiosEnFormulario = e => {
		const { name, value, checked, type } = e.target;

		setCredencial({
			...credencial,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const iniciarSesion = async e => {
		try {
			e.preventDefault();
			const response = await store.dispatch(solicitarAcceso(credencial));

			console.log("user",response.usuario);

			if (response.status === StatusCodes.OK && Object.keys(response.usuario).length !== 0 ) {
                if(response.usuario.estado!="0"){
                    toastme.success(
                        `Bienvenido al sistema ${response.usuario.nombre}`,
                    );
                    guardarAutorizacion(response.usuario);
                    window.location.href = '/';	
                }else{
                    toastme.error(
                        `Usuario Inhabilitado`,
                    );
                }
							
			}else{
                toastme.error(
					`Usuario o contraseña inválidos`,
				);
            }
		} catch (error) {
			console.log(error);
		}
	};

	return (
        <div className='row d-flex justify-content-center'>
            <Form className='col-10 col-sm-6 col-md-4 col-xl-4 d-grid gap-5'>
                <FormControl
                    type='input'
                    name='username'
                    value={credencial.username}
                    onChange={cambiosEnFormulario}
                    placeholder='Nombre de usuario'
                    required
                    className='shadow-lg'
                    autoFocus
                />
                <FormControl
                    type='password'
                    name='password'
                    value={credencial.password}
                    onChange={cambiosEnFormulario}
                    placeholder='Contraseña'
                    required
                    className='shadow shadow-info shadow-intensity-lg'
                />
                <Button
                    variant='primary'
                    onClick={iniciarSesion}
                    size='lg'
                    className='rounded-pill'
                    
                >
                    Acceder
                </Button>

            </Form>
        </div>
	);
};

export default Login;