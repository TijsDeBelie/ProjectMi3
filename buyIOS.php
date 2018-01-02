<?php

require_once "config.php";

$eventname = mysqli_real_escape_string($db,$_POST['EventName']);
$user = mysqli_real_escape_string($db,$_POST['User']);
$eventplace = mysqli_real_escape_string($db,$_POST['EventPlace']);
$price = mysqli_real_escape_string($db,$_POST['Price']);

$eventdate = mysqli_real_escape_string($db,$_POST['EventDate']);
$foto = mysqli_real_escape_string($db,$_POST['Foto']);


$amount = mysqli_real_escape_string($db,$_POST['Amount']);



try {                                                                                                                      
    $stmt = $db->prepare("INSERT INTO `Tickets` (`EVENTNAME`, `USER`, `EVENTPLACE`, `PRICE`, `AMOUNT`, `DATE`, `Event_Foto`) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("sssiiss", $eventname, $user, $eventplace, $price, $amount, $eventdate, $foto); //$foto



    $stmt->execute();


    $response['eventname'] = $eventname;
    $response['eventname'] = $eventname;
    $response['eventdate'] = $eventdate;
    $response['user'] = $user;


}
catch(PDOException $e)
{
    $response['error'] =  "Error: " . $e->getMessage();
}


$stmt->close();
$db->close();

/*
$sql = "INSERT INTO `Tickets` (`EVENTNAME`, `EVENTPLACE`, `USER`, `PRICE`,`AMOUNT`) VALUES ('$eventname', '$eventplace', '$user','$price','$amount')";


if (mysqli_query($db, $sql)) {

    $response['eventname'] = $eventname;
    $response['eventname'] = $eventname;
    $response['eventdate'] = $eventdate;
    $response['user'] = $user;
}else {

    $response['error'] = mysqli_error($db);

}

*/
$post_data = json_encode($response);

echo $post_data;

