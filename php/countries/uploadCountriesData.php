<?php
    header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    

require '../db.php';

error_reporting(E_ERROR);
// print_r($_FILES);
// die();


define('CSV_PATH','../uploadedDATA/');

$uploadfile = CSV_PATH . basename($_FILES['fileToUpload']['name']);

$fileName = basename($_FILES['fileToUpload']['name']);

// path where your CSV file is located
    $csv_file = CSV_PATH.$fileName;// Name of your CSV file
    $csvfile = fopen($csv_file,'r');
    $theData = fgets($csvfile);
    $i=0;
    while(!feof($csvfile)){
        $csv_data[] = fgets($csvfile,1024);
        $csv_array = explode(",", $csv_data[$i]);

       
        $insert_csv = array();
   $insert_csv['name'] = trim($csv_array[0]);
   $insert_csv['code'] = trim($csv_array[1]);
   

        
        if ($insert_csv['name'] !='' && $insert_csv['code'] != ''){
                $query = "INSERT INTO countries VALUES
                ('".$insert_csv['name']."',
                '".$insert_csv['code']."'
                )";
                $n=mysqli_query($conn,$query);
       
        }
         $i++;

    }
    
    fclose($csvfile);



mysqli_close($conn);
   ?>