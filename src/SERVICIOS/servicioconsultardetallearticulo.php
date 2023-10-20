<?php
	require_once("config.php");

	$idArticulo = $_REQUEST["idArticulo"];
	$rs = mysqli_query($cn,
		"select * from Detalle_Orden where idArticulo=".$idArticulo);
		
		//contamos si existe un producto en la categoria
	if($rs->num_rows > 0){
		while($row = mysqli_fetch_assoc($rs)){		
			$res = $row;
			//De esta manera los datos de cda fila
			//se colocan en un arreglo
		}
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
	}else{
		// no exite se envia vacio
		echo json_encode($res,JSON_UNESCAPED_UNICODE);
	}

	
	//Se genera del arreglo un conjunto de resultados
	//en formato JSON
	mysqli_close($cn);
	
	
?>