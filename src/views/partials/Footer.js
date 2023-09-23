const Footer = () => (
	<footer className='footer'>
		© {new Date().getFullYear()}
		<span className='mx-1 fw-bold'>APP ALMACEN</span> Desarrollado por
		<a
			href='#'
			target='_blank'
			className='ms-1'
			rel='noreferrer'
		>
			Grupo 6 - ISIL
		</a>
	</footer>
);

export default Footer;