
<?php

include('config.php');




$user = mysqli_real_escape_string($db,$_POST['User']);
$order = mysqli_real_escape_string($db,$_POST['Order']);


$sql ="DELETE FROM `Tickets`
WHERE `EVENTNAME` = '$order' and `USER` = '$user' LIMIT 1";

$query = mysqli_query($db,$sql);


if ($query){





$sql ="Select `EVENTNAME` ,`AMOUNT`,`PRICE` from `Tickets` WHERE `USER` = '$user'";


$result = mysqli_query($db,$sql);



$d = array();
while ($row = $result->fetch_assoc()) {
    $d[] = $row;
}





} else {

    $d[] = "error";

}

$json = json_encode($d);


echo $json;
