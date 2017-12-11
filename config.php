<?php
   define('DB_SERVER', 'localhost');
   define('DB_USERNAME', 'remote');
   define('DB_PASSWORD', 'LXTNrdMSO75MvSl@xG2%58D!QaanY#');
   define('DB_DATABASE', 'DB_tickets');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

if($db === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}