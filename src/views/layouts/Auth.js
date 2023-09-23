import { BrowserRouter } from 'react-router-dom';

import RouterView from '../../router/RouterView';
import logo from '../../img/icono-texto.png';

const Auth = () => (
	<section id='wrapper' className='login-register'>
		<article className='ui-auth-form-container'>
			<div className='card border-0 w-100'>
				<div className='card-body '>
					<div className='text-primary  text-center p-3'>
						<h1 className='fw-bold '>APP ALMACEN</h1>
						<h5 className='text-primary'> v1.0</h5>						
					</div>
					<BrowserRouter>
						<RouterView />
					</BrowserRouter>
				</div>
			</div>
		</article>
	</section>
);

export default Auth;