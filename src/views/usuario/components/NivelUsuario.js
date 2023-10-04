import { useEffect, useState } from "react";

const NivelUsuario = ({nivel}) => {
    const [changeNivel, setChangeNivel] = useState('0');
    const [changeColor, setChangeColor] = useState('0');
    useEffect(()=>{
        validarNivel();
    },[]);

    const validarNivel=()=>{
        switch (nivel){
            case '1':
                setChangeNivel("Super Admin");
                setChangeColor("#3acdab");
                break;
            case '2':
                setChangeNivel("Admin");
                setChangeColor("#ffad46");
                break;
            case '3':
                setChangeNivel("Picker");
                setChangeColor("#2128ff");
                break;
            default:
                setChangeNivel("No Asignado");
                setChangeColor("#6c6c6c");
                break;            
        }
    }
    return(
        <div><span style={{backgroundColor:changeColor,color:'#ffffff',borderRadius:'10px',padding:'5px'}}>{changeNivel}</span></div>
    );
}
 export default NivelUsuario;