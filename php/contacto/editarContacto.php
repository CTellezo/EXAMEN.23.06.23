<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $id=$_POST['contactoid'];
    $nombre=$_POST['nombre'];
    $ap=$_POST['ap'];
    $am=$_POST['am'];
    $categoria=$_POST['categoria'];
    
    
    $sqlEditar="UPDATE contacto SET 
                nombre='$nombre',
                ap='$ap',
                am='$am',
                categoria='$categoria'
                WHERE contactoid=$id";
    if($cx->query($sqlEditar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
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