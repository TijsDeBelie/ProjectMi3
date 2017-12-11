<?php
include("config.php");
session_start();


    $myusername = mysqli_real_escape_string($db,$_POST['username']);
    $mypassword = mysqli_real_escape_string($db,$_POST['password']);


    $hashed = hash('ripemd160',"$mypassword");






    $sql = "SELECT `ID`,`Admin`,`Foto`, `Thema` FROM `User_info` WHERE `USERNAME` = '$myusername' and `PASSWORD` = '$hashed'";

    $result = mysqli_query($db,$sql);
    $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    $type = $row['Admin'];
    $themaKleur = $row['Thema'];
    $count = mysqli_num_rows($result);



    if($count == 1) {

        $_SESSION['thema'] = $themaKleur;
        $_SESSION['login_user'] = $myusername;

        if($type == 1){

            $_SESSION['admin_user'] = $myusername;

        }

        $response['Thema'] = $themaKleur;
        $response['loggedin'] = "true";
        $response['foto'] = $row['Foto'];


    }else {

        $response['error'] = "Your Login Name or Password is invalid";

    }

$post_data = json_encode($response);

echo $post_data;


mysqli_close($db);
