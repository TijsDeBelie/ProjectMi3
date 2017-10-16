function bevestig() {
    var x = document.getElementById("myMonth").value;
    console.log(x);
    //var promise = $.getJSON("http://95.85.35.29/select.php");

    //promise.done(function(data) {
        //console.log(data);
        // this will return back "text that needs to be in javascript"
    //})
}


$(document).ready(function(){
    $(".submit").click(function(){
        var userinput = $("#myMonth").val();
        var year = userinput.substring(0, 4);
        var month = userinput.substring(5);

        $.post({
            url:"select.php",
            data: {year: year, month: month},
            success:function(result,e){
                alert(result + e);
                $("#adiv").html(result);

            }
        });
    });
});