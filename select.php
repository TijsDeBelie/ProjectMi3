<?php

$year = $_POST["year"];
$month = $_POST["month"];

echo "$year";
//echo "userinput: $month, $year";

$link = mysqli_connect("localhost", "remote", "LXTNrdMSO75MvSl@xG2%58D!QaanY#", "Tickets");

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt select query execution
$sql = "SELECT * from `Events` where extract(year from `DATE`) = $year AND extract(month from `DATE`) = $month";
if($result = mysqli_query($link, $sql)){
    if(mysqli_num_rows($result) > 0){
        echo "<table>";
        echo "<tr>";
        echo "<th>id</th>";
        echo "<th>naam</th>";
        echo "<th>datum</th>";


        echo "</tr>";
        while($row = mysqli_fetch_array($result)){
            echo "<tr>";
            echo "<td>" . $row['ID'] . "</td>";
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
}

// Close connection
mysqli_close($link);
?>