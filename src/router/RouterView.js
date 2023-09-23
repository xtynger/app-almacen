import { Routes, Route} from 'react-router-dom';
import { PrivateOutlet, PublicOutlet } from './CheckPageNavigation';

//Publicas
import Login from '../views/auth/Login';

//Privados
import HomeIndex from '../views/home/HomeIndex';



const RouterView = () => {
	const nivel = window.usuario==undefined?'':window.usuario.nivelUsuario;

	return(
		<Routes>
			<Route path='/login' element={<PublicOutlet />}>
				<Route path='' element={<Login />} />
			</Route>
			<Route path='/' element={<PrivateOutlet />}>
				<Route path='' element={<HomeIndex />} />
			</Route>			
		</Routes>
	)
}

export default RouterView;