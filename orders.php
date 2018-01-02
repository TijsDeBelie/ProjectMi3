<?php

include('config.php');




$user = $_POST["User"];

$sql ="Select `EVENTNAME`,`AMOUNT`,`PRICE`, `DATE`, `Event_Foto`  from `Tickets` WHERE `USER` = '$user'";


$result = mysqli_query($db,$sql);


$sum = 0;

$d = array();
while ($row = $result->fetch_assoc()) {
    $d[] = $row;

}
$json = json_encode($d);


echo $json;
