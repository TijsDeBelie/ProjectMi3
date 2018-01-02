<?php
   include('config.php');
   session_start();

   $user_check = $_SESSION['login_user'];


   $ses_sql = mysqli_query($db,"select username, Thema, Voornaam, Familienaam, Geboortedatum, Email, Discount from User_info where username = '$user_check' ");

   $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);



    $response = array('username' => $user_check);
    $response["Thema"] = $row['Thema'];
    $response["Voornaam"] = $row['Voornaam'];
    $response["Familienaam"] = $row['Familienaam'];
    $response["Email"] = $row['Email'];
    $response["Geboortedatum"] = $row['Geboortedatum'];
    $response["Discount"] = $row["Discount"];
    $login_session = $row['username'];




    if(isset($_SESSION['admin_user'])){

        $response['admin'] = true;
       //echo $true = "admin";

   }else if(isset($_SESSION['login_user']))
   {



   }else{

       //echo $true = "false";
   }

$post_data = json_encode($response);

echo $post_data;

?>