<?php
	require_once("config.php");
	$username = $_POST["username"];
    $password = $_POST["password"];


    $rs = mysqli_query($cn, "select * from Usuario where username = '".$username."' and password = '".$password."'");
    //$query =  "select * from Usuario where username = '".$username."' and password = '".$password."'";
    //echo $query;

    if($rs->num_rows == 1){
        $row = $rs->fetch_assoc();
        if(password_verify($password, $row["passwordHash"]))
        {
           // echo $row["passwordHash"];
            
            $res = $row;
            echo json_encode($res,JSON_UNESCAPED_UNICODE);
        }
        else{
            echo "-1";
        }
    }
    else{
        echo "-2";
    } 
    //echo mysqli_insert_id($cn); 
	mysqli_close($cn);
