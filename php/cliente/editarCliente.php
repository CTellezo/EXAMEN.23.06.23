<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $id=$_POST['clienteid'];
    $nombre=$_POST['nombre'];
   
   
    
    $sqlEditar="UPDATE cliente SET  
                nombre='$nombre'
                
                WHERE clienteid=$id";
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