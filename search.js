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
        var userinput = $("#userinput").value;

        $.ajax({
            url:"http://95.85.35.29/select.php",
            data: {status: userinput},
            success:function(result){
                $("#adiv").html(result);
            }
        });
    });
});