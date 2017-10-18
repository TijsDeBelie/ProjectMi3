
console.log("Net voor de knop");
$(document).ready(function(){
    console.log("document is ready");
    $("#bevestig").click(function(){
        var x = $("#myMonth").val();
        console.log(x);
        console.log("Klik op de knop");
        var userinput = x;
        var year = userinput.substring(0, 4);
        var month = userinput.substring(5);

        $.post({
            url:"select.php",
            data: {year: year, month: month},
            success:function(result,e){
                console.log(result + e);
                $("#adiv").html(result);

            }
        });
    });
});