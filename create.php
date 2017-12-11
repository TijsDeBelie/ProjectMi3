<?php

include('config.php');

    $myusername = mysqli_real_escape_string($db,$_POST['usernameCreate']);
    $mypassword1 = mysqli_real_escape_string($db,$_POST['password1']);
    $mypassword2 = mysqli_real_escape_string($db,$_POST['password2']);

    if (strlen($myusername) >= 6) {
        if ($mypassword1 != "") {
            if (strlen($mypassword1) >= 6) {
                if($mypassword1 === $mypassword2) {


                    $sql = "SELECT USERNAME FROM `User_info` WHERE `USERNAME` LIKE '$myusername'";

                    $result = mysqli_query($db, $sql);
                    $count = mysqli_num_rows($result);
                    if ($count >= 1) {


                        $response['error'] =  "Error username already exists, please choose another one";

                    } else {


                        $hashed = hash('ripemd160', "$mypassword1");
                        $sql = "INSERT INTO `User_info` (`USERNAME`, `PASSWORD`) VALUES ('$myusername', '$hashed')";

                        if (mysqli_query($db, $sql)) {

                            $response['created'] = "created";
                        }
                    }
                } else {
                    $response['error'] = "Your passwords are not the same";
                }
            } else {
                $response['error'] = "Your password must contain at least 6 characters!";
            }

        } else {

            $response['error'] = "Your password cannot be empty!!";
        }
    } else {

        $response['error'] = "Your username must contain at least 6 characters!";

    }

$post_data = json_encode($response);

echo $post_data;
mysqli_close($db);