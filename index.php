<!DOCTYPE html>
<html>

<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    <style type="text/css">
        body {
            background-color: #3686be;
            color: #FFF;
            border: 0px;
            margin: 0px;
            overflow: hidden;
        }

        .wrapper {
            position: absolute;
            top: 15%;
            left: 0px;
            right: 0px;
            width: 100%;
            height: auto;
        }

        .sammy {
            float: left;
            width: 100%;
            height: auto;
            text-align: center;
        }

        .message {
            float: left;
            width: 100%;
            height: auto;
            font-size: 36px;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            margin-top: 25px;
        }
    </style>
</head>

<body>
<div class="wrapper">
    <div class="sammy"><img src="https://assets.digitalocean.com/other_images/sammy.png" /></div>
    <div class="message">Select a month and a year to display your events</div>
    <form> month and year:
        <input type="month" id="myMonth" value="1997-11"> </form>
    <button type="submit" name="submit" class="submit" onclick="submit()">Submit</button>
    <script>
        function submit() {
            var x = document.getElementById("myMonth").value;
            console.log(x);
        }
    </script>


    <?php
    /* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
    $link = mysqli_connect("localhost", "root", "", "Tickets");

    // Check connection
    if($link === false){
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }

    // Attempt select query execution
    $sql = "SELECT * from `events` where extract(year from `date`) = '2017' && extract(month from `date`) = '10'";
    if($result = mysqli_query($link, $sql)){
        if(mysqli_num_rows($result) > 0){
            echo "<table>";
            echo "<tr>";
            echo "<th>id</th>";
            echo "<th>name</th>";
            echo "<th>date</th>";

            echo "</tr>";
            while($row = mysqli_fetch_array($result)){
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['name'] . "</td>";
                echo "<td>" . $row['date'] . "</td>";

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
</div>
</body>

</html>