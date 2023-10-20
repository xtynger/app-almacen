<?php
	require_once("config.php");
	$rs = mysqli_query($cn,
    "SELECT Usuario.username, COALESCE(cnt_ordenes, 0) AS ordenes
    FROM Usuario
    LEFT JOIN (
        SELECT asignadoA, COUNT(*) AS cnt_ordenes
        FROM Orden
        WHERE estado IN (2, 3, 4)
        GROUP BY asignadoA
    ) AS sub
    ON Usuario.idUsuario = sub.asignadoA
    WHERE Usuario.nivelUsuario = 3
    ORDER BY ordenes DESC"
    );
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>