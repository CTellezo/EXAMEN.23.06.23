<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$sql="SELECT * FROM cliente";
$resultado=$cx->query($sql);

$salida=array('data'=>array());

if($resultado->num_rows>0){
    while($row=$resultado->fetch_array()){
        $salida['data'][]=array($row[0],$row[1],$row[2],$row[3],);
    }
}
$cx->close();
echo json_encode($salida);

?>