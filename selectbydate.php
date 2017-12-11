
<?php 


sleep(1);

$start = $_POST["start"];
$end = $_POST["end"];



$link = mysqli_connect("localhost", "remote", "LXTNrdMSO75MvSl@xG2%58D!QaanY#", "Tickets");

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt select query execution
$sql = "SELECT `LOGO`,`NAAM`,`DATE` from `Events` where `date` BETWEEN '$start' and '$end' ORDER BY DATE ASC ";

if($result = mysqli_query($link, $sql)){
    if(mysqli_num_rows($result) > 0){
        
        echo "<div class='resultTable'>";
        echo "<table>";
        echo "<tr>";
        echo "<th>Logo</th>";
        echo "<th>Naam</th>";
        echo "<th>Datum</th>";


        echo "</tr>";

        while($row = mysqli_fetch_assoc($result)){
            echo "<tr>";

            echo "<td>" . '<img width="70" src="data:image/jpeg;base64,' . base64_encode($row['LOGO']) . '" />' . "</td>";
            echo "<td>" . $row['NAAM'] . "</td>";
            echo "<td>" . $row['DATE'] . "</td>";

            echo "</tr>";

        }
        echo "</table>";
        echo  "</div>";
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