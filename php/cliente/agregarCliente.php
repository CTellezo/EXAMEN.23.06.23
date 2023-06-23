<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $nombre=$_POST['nombre'];
    $municipio=$_POST['municipio'];
    $telefono=$_POST['telefono'];
    
    
    $sqlInsertar="INSERT INTO cliente VALUES(null,'$nombre','$municipio','$telefono')";
    if($cx->query($sqlInsertar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE GUARDO CORRECTAMENTE";
    }else{
        $valido['success']=false;
        $valido['mensaje']="ERROR: NO SE GUARDO";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);



?>