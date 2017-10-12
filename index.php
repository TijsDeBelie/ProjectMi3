<!DOCTYPE html>
<html>
    <head>
        <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
        <META HTTP-EQUIV="Expires" CONTENT="-1">
        <style type="text/css">
            body {
                background-color:#3686be;
                color:#FFF;
                border:0px;
                margin:0px;
                overflow:hidden;
            }
            .wrapper {
                position:absolute;
                top:15%;
                left:0px;
                right:0px;
                width:100%;
                height:auto;
            }
            .sammy {
                float:left;
                width:100%;
                height:auto;
                text-align:center;
            }
            .message {
                float:left;
                width:100%;
                height:auto;
                font-size:36px;
                text-align:center;
                font-family:Arial,Helvetica,sans-serif;
                margin-top:25px;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="sammy"><img src="https://assets.digitalocean.com/other_images/sammy.png"/></div>
            <div class="message">Select a month and a year to display your events</div>
            <form>
                month and year:
                <input type="month" name="month">
            </form>


            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "Tickets";

            $conn = mysqli_connect($servername, $username, $password, $dbname);

            $sql = "SELECT name FROM Tickets";
            $result = $conn->query($sql);



            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    echo  "Name: " . $row["name"]."<br>";
                }
            } else {
                echo "0 results";
            }
            $conn->close();



            ?>



        </div>
    </body>
</html>
