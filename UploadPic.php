<?php

include('config.php');



$value = $_POST["value"];
$user = $_POST["user"];

//$sql = "INSERT into `User_Info` SET `ProfielFoto` = '$value' WHERE username = '$user'";
$sql ="UPDATE `User_info` SET `ProfielFoto` = '$value' WHERE username = '$user'";
mysqli_query($db, $sql);
$response['ProfielFoto'] = $value;


$post_data = json_encode($response);

echo $post_data;


?>




