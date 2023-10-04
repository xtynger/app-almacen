import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, FormSelect, InputGroup, NavLink, Row, Stack } from "react-bootstrap";
import store from "../../../redux/Store";
import { StatusCodes } from 'http-status-codes';
import { listarUsuarioPorId, listarUsuarios, registrarUsuario, validarregistrarUsuario, actualizarUsuario } from "../../../redux/usuario/UsuarioActions";
import { toastme } from "toastmejs";

const UsuarioForm = ({accion,id}) =>{
    const [usuario, setUsuario] = useState({});
    const [validated, setValidated] = useState(false);
    const [dataNivelUsuario,setDataNivelUsuario] = useState([
        {
            id:2,
            descripcion:'Admin'
        },
        {
            id:3,
            descripcion:'Picker'
        },
        
    ]  );

    useEffect(()=>{
        if(window.usuario.nivelUsuario=='1'){
            setDataNivelUsuario([
                {
                    id:2,
                    descripcion:'Admin'
                },
                {
                    id:3,
                    descripcion:'Picker'
                },
            ])
        }

        if(window.usuario.nivelUsuario=='2'){
            setDataNivelUsuario([
                {
                    id:3,
                    descripcion:'Picker'
                },
            ])
        }

        if(accion=='editar'){
            listarUsuarioId(id);
        }
    },[]);

    const listarUsuarioId = async(id)=>{
        try {
            const response = await store.dispatch(listarUsuarioPorId(id));
            console.log("usuario:", response.detalleUsuario);
            if (response.status === StatusCodes.OK) {
                setUsuario(response.detalleUsuario);
            }
            
        } catch (error) {
            //console.log(error);
        }
    }
    
    const functAccion = async() =>{
        console.log("nuevo usuario",usuario);
        if(accion=='nuevo'){
            try {
                const response = await store.dispatch(validarregistrarUsuario(usuario));
                if(response.data==0){
                    try {
                        const response2 = await store.dispatch(registrarUsuario(usuario));
                        if (response2.status === StatusCodes.OK) {
                            console.log("Nuevo Usuario agregado");
                            window.location.href = '/usuario';
                        }
                    } catch (error) {
                        //console.log(error);
                    }
                }else{
                    toastme.error(
                        `Usuario ya registrado`,
                    );
                }
            } catch (error) {
                //console.log(error);
            }
        }
        if(accion=='editar'){
            try {
                const response = await store.dispatch(actualizarUsuario(usuario));
                console.log("response.data",response.data);
                if (response.status === StatusCodes.OK) {
                    console.log("Nuevo Usuario agregado");
                    window.location.href = '/usuario';
                }
            } catch (error) {
                //console.log(error);
            }
        }
    }    

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("goo");
            setValidated(true);
        }else{
            setValidated(false);
            functAccion();
            event.preventDefault();
            event.stopPropagation();
        }    
    };

    const cambiosEnFormulario = e => {
		const { name, value, checked, type } = e.target;
        console.log("etarget",e.target.name);
        console.log("etarget",e.target.value);
		setUsuario({
			...usuario,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

    return(
        <Form className='col-10 col-sm-6 col-md-4 col-xl-4 d-grid gap-4 mx-auto' noValidate validated={validated} onSubmit={handleSubmit}>
            <select
                className="form-select"
                value={usuario.nivelUsuario??''}
                name="nivelUsuario"
                onChange={cambiosEnFormulario}
                required
                autoFocus
            >
                <option value="">Seleccione</option>
                {dataNivelUsuario.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.descripcion}
                    </option>
                ))}
            </select>
            <FormControl
                type='input'
                name='nombre'
                value={usuario.nombre??''}
                onChange={cambiosEnFormulario}
                placeholder='Nombres'
                required
                autoFocus
            />
            <FormControl
                type='input'
                name='apellido'
                value={usuario.apellido??''}
                onChange={cambiosEnFormulario}
                placeholder='Apellidos'
                required
                autoFocus
            />            
            <InputGroup >
                <FormControl
                    type='input'
                    name='username'
                    value={usuario.username??''}
                    onChange={cambiosEnFormulario}
                    placeholder='Correo'
                    required
                    autoFocus
                />
                <InputGroup.Text>@isil.pe</InputGroup.Text>
            </InputGroup>
            <FormControl
                type='password'
                name='password'
                value={usuario.password??''}
                onChange={cambiosEnFormulario}
                placeholder='Contraseña'
                required
                autoFocus
            />
            {/* <Form.Check type="checkbox" name='recuerdame' label="Recuerdame" /> */}
            <Stack gap={4} className="col-12 mx-auto">
                <Button
                    variant='primary'
                    size='lg'
                    className='rounded-pill'
                    type="submit"
                    >
                        Guardar
                </Button>
                <a href="/usuario" className='btn btn-secondary btn-lg rounded-pill-cancel cancel-a'>
                    Cancelar
                </a>
            </Stack>
                        
        </Form>
    );
}
export default UsuarioForm;