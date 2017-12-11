<?php
   session_start();

   if(session_destroy()) {
       $response['loggedout'] = "true";
   }else{
       $response['loggedout'] = "false";
   }

$post_data = json_encode($response);

echo $post_data;

mysqli_close($db);