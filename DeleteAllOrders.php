<?php

include('config.php');




$user = $_POST["user"];

$sql ="DELETE FROM `Tickets` WHERE `USER` = '$user'";
mysqli_query($db, $sql);



$post_data = json_encode($response);

echo $post_data;


?>



