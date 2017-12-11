<?php
/**
 * Created by PhpStorm.
 * User: Tijs De Belie
 * Date: 20/10/2017
 * Time: 15:11
 */

$username = $_POST["username"];
$hash = $_POST["hash"];


$link = mysqli_connect("localhost", "remote", "LXTNrdMSO75MvSl@xG2%58D!QaanY#", "DB_tickets");

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$sql = "SELECT * FROM `User_info` WHERE `USERNAME` = '$username'";
if($result = mysqli_query($link, $sql)){
    if (mysqli_num_rows($result)> 0) {
        echo "ERROR USERNAME ALREADY EXISTS";
        mysqli_free_result($result);

}else{
        $sql = "INSERT INTO `User_info` (`USERNAME`, `PASSWORD`) VALUES ('$username', '$hash')";
        if($result = mysqli_query($link, $sql)){
            mysqli_free_result($result);
        }

    }
}




mysqli_close($link);
// Close connection
