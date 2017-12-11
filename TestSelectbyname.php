<?php


$link = mysqli_connect("localhost", "remote", "LXTNrdMSO75MvSl@xG2%58D!QaanY#", "Tickets");
$name = mysqli_real_escape_string($link,$_POST['name']);
$name = "TESTEVENT";
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt select query execution
$sql = "SELECT `LOGO`, `NAAM`,`DATE` FROM `Events` WHERE `NAAM`='$name' ORDER BY `NAAM`";

$result = mysqli_query($link, $sql);

$emparray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}


//$emparray = "test";
echo json_encode($emparray);


//mysqli_free_result($result);
//mysqli_free_result($emparray);

/*if(mysqli_num_rows($result) > 0){
    echo "<table>";
    echo "<tr>";
    echo "<th>Logo</th>";
    echo "<th>Naam</th>";
    echo "<th>Datum</th>";


    echo "</tr>";
    while($row = mysqli_fetch_array($result)){
        echo "<tr>";
        echo "<td>" . '<img width="70" src="data:image/jpeg;base64,' . base64_encode($row['LOGO']) . '" />' . "</td>";
        echo "<td>" . $row['NAAM'] . "</td>";
        echo "<td>" . $row['DATE'] . "</td>";

        echo "</tr>";
    }
    echo "</table>";
    // Free result set
    mysqli_free_result($result);
} else{
    echo "No records matching your query were found.";
}
} else{
echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}*/


// Close connection
mysqli_close($link);
?>