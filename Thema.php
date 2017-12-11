<?php

include('config.php');



    $value = $_POST["value"];
    $user = $_POST["user"];

        $sql ="UPDATE `User_info` SET `Thema` = '$value' WHERE username = '$user'";
            mysqli_query($db, $sql);
            $response['Thema'] = $value;


$post_data = json_encode($response);

echo $post_data;


?>














