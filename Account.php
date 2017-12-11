<?php

include('config.php');



$Voornaam = $_POST["Voornaam"];
$Familienaam = $_POST["Familienaam"];
$Geboortedatum = $_POST["Geboortedatum"];
$Email = $_POST["Email"];
$user = $_POST["User"];

//$sql = "INSERT INTO `User_info` (Voornaam, Familienaam, Email, Geboortedatum) VALUES ($Voornaam, $Familienaam, $Email, $Geboortedatum) WHERE username = '$user' ON DUPLICATE KEY UPDATE Voornaam = $Voornaam, Familienaam = $Familienaam, Email = $Email, Geboortedatum = $Geboortedatum WHERE username = '$user'";
$sql ="UPDATE `User_info` SET `Voornaam` = '$Voornaam', `Familienaam` = '$Familienaam',`Email` = '$Email', `Geboortedatum` = '$Geboortedatum'  WHERE username = '$user'";
mysqli_query($db, $sql);

?>

