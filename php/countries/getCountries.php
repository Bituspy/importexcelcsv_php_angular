<?php
    header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    require '../db.php';
    
    $sql = "Select * from countries";
    $result = mysqli_query($conn,$sql);
    
    $data = array();

    while($row = mysqli_fetch_array($result)){
        $data[] = $row;
    }

    echo json_encode($data);
?>