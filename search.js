/**
 * @file searching for concerts, and most of the control of the website
 */

$(document).ready(function(){
    /**
     * A main variable that can be used to put all sorts of userinput in
     */
    var userinput;
    /**
     * The control of the site, when clicking on the different buttons
     */
    $("#cancel").click(function(){

        window.location.href = "login.html";
    });

    $("#logout").click(function(){

        /**
         * @ajax
         * ajax function called when a user wants to logout
         * Destroys the current session
         * Timeout of 3 seconds
         */

        $.post({
            url: "https://concerttracker.aenterprise.info/logout.php",
            statusCode: {
                503: function() {
                    alert( "No internet connection" );
                }
            },
            timeout:3000,
            success: function (result, e) {
                result = JSON.parse(result);
                console.log(result);
                if (result.loggedout == "true"){
                    window.location.href = "login.html";
                } else {
                    alert("Error, you are not logged out, please try again");
                }
            },
            error: function(xhr, status, err) {
                alert("error " + xhr + " " + status + " " + err);
            }
        });
    });

    $("#create").click(function(){
        window.location.href = "create.html";
    });
    $("#create").click(function(){
        window.location.href = "create.html";
    });

});

/**
 * @login
 * When user clicks on the login button this function gets called
 * @param {string} username - the username of the person
 * @param {integer} password - the password of the person
 * The username is edited, by default all special chars are removed
 */
$("#loginform").submit(function(e){
    e.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    username = username.replace(/[^\w\s]/gi, '')
    Loading();
    $.post({
        url: "https://concerttracker.aenterprise.info/login.php",
        data: {
            username: username,
            password: password},
        statusCode: {
            500: function() {
                alert( "No internet connection" );
            },
            501: function() {
                alert( "No internet connection" );
            },
            502: function() {
                alert( "No internet connection" );
            },
            503: function() {
                alert( "No internet connection" );
            },
            400: function() {
                alert( "bad request" );
            }
        },
        timeout:3000,
        success: function (result, e) {
            result = JSON.parse(result);
            console.log(result);
            if (result.loggedin){

                localStorage.setItem("profilepicture", result.foto);
                $(document.body).css('visibility','visible');
                VerbergLoading();
                window.location.href = "index.html";
            } else {
                $("#error").html(result.error);
                VerbergLoading();
            }
        },
        error: function(xhr, status, err) {
            xhr = JSON.stringify(xhr, null, 4);
            console.log("xhr" + xhr)
            console.log("status" + status)
            console.log("err" + err)
            if(err = "timeout"){
                $("#error").html("You are currently unable to load the page reason : " + err);
            }
        }

    });
});








var imagesrc;
/**
 * @Create
 * When user clicks on the create button this function gets called
 * @param {string} username - the username of the person
 * @param {integer} password - the password of the person
 * The username is edited, by default all special chars are removed, the edited username is also given to the user with a confirm box
 */
$("#createform").submit(function(e){
    e.preventDefault();
    var re =  new RegExp(/[^\w\s]/gi);
    var usernameCreate = $("#usernameCreate").val();
    if(re.test(usernameCreate)){
        usernameCreate = usernameCreate.replace(/[^\w\s]/gi, '')
        var r = confirm("Your username contained forbidden characters and has been modified to: " + usernameCreate)
    }

    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    Loading();
    $.post({
        url: "https://concerttracker.aenterprise.info/create.php",
        data: {usernameCreate: usernameCreate, password1: password1, password2: password2},
        statusCode: {
            500: function() {
                alert( "No internet connection" );
            },
            501: function() {
                alert( "No internet connection" );
            },
            502: function() {
                alert( "No internet connection" );
            },
            503: function() {
                alert( "No internet connection" );
            },
            400: function() {
                alert( "bad request" );
            }
        },
        timeout:3000,
        success: function (result, e) {

            result = JSON.parse(result)
            if(result.created) {
                console.log(usernameCreate);
                console.log(result);
                window.location.href = "login.html";

            }else{

                $("#error").html(result.error);

            }
            VerbergLoading();
        }
    });
});



function Loading() {
    $("#loading").show();

}

function VerbergLoading() {
    $("#loading").hide();
}





//OM DE LINKEN IN DE ONDERSTAANDE URL KORTER TE HOUDEN WORDT HIER AL DE BASEURL EN APIKEY GEZET
var apikey = "&apikey=91266liFMYink0pu2zFqYCT9yQ3zOYHT";
var baseurl = "https://app.ticketmaster.com/discovery/v2/events.json?&classificationName=music&sort=date,asc";
var url = baseurl + apikey + "&classificationName=music";
var page = 0;

/**
 * @pages
 * When user clicks on the prev button this function gets called
 * @param {integer} page - the current page
 * @param {string} url - the url of the json source
 * The new page is loaded with the function search
 */
$('#prev').click(function() {


    Search(--page, url);
});
/**
 * @pages
 * When user clicks on the next button this function gets called
 * @param {integer} page - the current page
 * @param {string} url - the url of the json source
 * The new page is loaded with the function search
 */
$('#next').click(function() {
    Search(++page, url);
});




/**
 * @search
 * When user clicks on the confirm button this function gets called
 * this function checks what fields are filled in and edits the url to match the requirements the user has filled in
 * pagenumber gets reset to 0
 */
$("#bevestig").click(function(){
    page = 0;

    $("#adiv").html("");

    var month = $("#myMonth").val();
    if(month !== ""){

        month += "T00:00:00Z"
    }
    var Text = $("#myText").val();
    var Place = $("#myPlace").val();

    url = baseurl + apikey + "&startDateTime=" + month + "&keyword=" + Text + "&countryCode=" + Place;
/*
    if ($("#myMonth").val() !== "" && $("#myText").val() !== "" && $("#myPlace").val() !== "") {
        //DATUM + TEKST + PLAATS
        userinput = $("#myMonth").val();
        var userinput1 = $("#myText").val();
        var userinput2 = $("#myPlace").val();
        url =  baseurl + apikey + "&startDateTime=" + userinput +"T00:00:00Z&keyword=" + userinput1 + "&countryCode=" + userinput2

    } else if ($("#myMonth").val() !== "" && $("#myText").val() !== "") {
        //DATUM + TEKST
        userinput = $("#myMonth").val();
        var userinput1 = $("#myText").val();
        url = baseurl + apikey + "&startDateTime=" + userinput + "T00:00:00Z&keyword=" + userinput1

    } else if ($("#myMonth").val() !== "" && $("#myPlace").val() !== "") {
        //DATUM + PLAATS
        userinput = $("#myMonth").val();
        var userinput1 = $("#myPlace").val();
        url = baseurl + apikey + "&startDateTime=" + userinput + "T00:00:00Z&radius=100&countryCode=" + userinput1

    } else if ($("#myText").val() !== "" && $("#myPlace").val() !== "") {
        //TEKST + PLAATS
        userinput = $("#myText").val();
        var userinput1 = $("#myPlace").val();
        url = baseurl + apikey + "&keyword=" + userinput + "&radius=100&&countryCode=" + userinput1

    }else if ($("#myMonth").val() !== ""){
        //DATUM
        userinput = $("#myMonth").val();
        url = baseurl + apikey + "&startDateTime=" + userinput +"T00:00:00Z";

    } else if ($("#myText").val() !== ""){
        //TEKST
        userinput = $("#myText").val();
        url = baseurl + apikey +  "&keyword=" + userinput

    }
    else if ($("#myPlace").val() !== ""){
        //PLAATS
        userinput = $("#myPlace").val();
        url = baseurl + apikey + "&radius=100&countryCode=" + userinput

    }else {
        $('#next').prop("disabled", false);
    

            url = baseurl + apikey;


    }
*/
    Search(page, url);
});

/**
 * @order
 * When user clicks on the order button this function gets called
 * @param {string} user - the name of the user ordering the ticket(s)
 * @param {string} EventName - the name of the event
 * @param {date} EventDate - the date the event is held
 * @param {string} EventPlace - the location the event is held
 * @param {double} Price - the price of  the event, in case no price is supplied by ticketmaster the price is set to 50$
 * @param {integer} Amount - How many tickets the user has selected to order
 * this function adds the selected ticket and amount to the list of orders to be reviewed later
 */

var Amount;
function Ordertickets(User, EventName, EventDate, EventPlace, Price, Amount) {

                $.post({
                    url: "https://concerttracker.aenterprise.info/buy.php",
                    statusCode: {
                        503: function() {
                            $("#boughtinfo").html("No internet connection" );
                        }
                    },
                    data: {User: User, EventName: EventName, EventDate: EventDate,EventPlace: EventPlace, Amount: Amount, Price: Price},
                    timeout:3000,
                    success: function (result, e) {
                        result = JSON.parse(result);
                        console.log(result);


                        $("#boughtinfo").html("You have added " + Amount + " Ticket(s) for " + EventName + " to your orderlist");


                    },
                    error: function(xhr, status, err) {
                        xhr = JSON.stringify(xhr);
                        $("#boughtinfo").html("error " + xhr + " " + status + " " + err);

                    }
                });
}

var Totalpage;

$('#prev').hide();
$('#next').hide();

function Search(pageNumber, Link){
    Loading();
    page = pageNumber;
        var table = document.createElement("table");

        var tr = table.insertRow(-1);
        $.ajax({
            type: "GET",
            url: Link + "&page=" + pageNumber,
            statusCode: {
                401: function () {
                    $("#adiv").html("Error, server denied the search.");
                },
                504: function () {
                    $("#adiv").html("You are currently unable to load the page reason : NO INTERNET CONNECTION");
                },
                0: function () {
                    $("#adiv").html("You are currently unable to load the page reason : NO INTERNET CONNECTION");
                }
            },
            cache: true,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                Totalpage = json.page.totalPages
                var currentPage = json.page.number


                if (json.page.totalElements === 0) {
                    var tr = table.insertRow(-1);
                    var tabCell1 = tr.insertCell(-1);
                    tabCell1.innerHTML = "No events found, we do not yet know of any events that you requested";
                    $('#prev').hide();
                    $('#next').hide();
                } else {
                    var events = json._embedded.events;
                    var tr = table.insertRow(-1);
                    var tabCell1 = tr.insertCell(-1);
                    tabCell1.innerHTML = "Foto";
                    var tabCell2 = tr.insertCell(-1);
                    tabCell2.innerHTML = "Naam";
                    var tabCell3 = tr.insertCell(-1);
                    tabCell3.innerHTML = "Datum";


                    for (var j = 0; j < events.length; j++) {
                        var tr = table.insertRow(-1);
                        var tabCell4 = tr.insertCell(-1);

                        var image = document.createElement("IMG");
                        image.src = events[j].images[0].url;
                        image.width = "100"
                        tabCell4.appendChild(image);
                        var tabCell5 = tr.insertCell(-1);
                        tabCell5.className = "EventName";
                        tabCell5.innerHTML = events[j].name;
                        console.log(events[j].dates.start.localDate)
                        var tabCell6 = tr.insertCell(-1);
                        var date = new Date(events[j].dates.start.localDate);
                        tabCell6.innerHTML = $.format.date(date, "dd/MM/yyyy");
                    }


                }


                VerbergLoading()
                var divContainer = document.getElementById("adiv");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);


                var link;
                var i;
                var list = document.createElement("ul");

                list.style.listStyleType = "none";
                list.style.margin = 0;
                list.style.padding = 0;
                list.style.position = "relative"



                console.log(Totalpage);
                if(Totalpage >= 10) {
                    console.log(Totalpage);
                    if (Totalpage > 50){
                        Totalpage = 48;
                        makePagelist(10)

                    }else{

                        makePagelist(Totalpage);

                    }
                    console.log(Totalpage);
                } else {
                    console.log(Totalpage);
                    makePagelist(Totalpage);

                }
                function makePagelist(number){

                    for (i = 0; i < number; i++) {
                        var point = document.createElement("li");
                        point.style.display = "inline";
                        point.style.padding = "5px"
                        tn = document.createTextNode(i);
                        link = document.createElement("a")
                        link.href = "#"
                        link.id = i
                        link.appendChild(tn);
                        link.setAttribute('href', 'javascript:Search(' + i + ',"' + url + '")');
                        point.appendChild(link)



                        list.appendChild(point)
                    }
                    if(currentPage >= number){

                        var extrapage = document.createElement("a")
                        tn = document.createTextNode(currentPage);

                        extrapage.href = "#"
                        extrapage.id = currentPage
                        extrapage.appendChild(tn);
                        extrapage.style.padding = "20px"
                        extrapage.setAttribute('href', 'javascript:Search(' + currentPage + ',"' + url + '")');
                        point.appendChild(extrapage)

                    }

                    var lastpage = document.createElement("a")
                    tn = document.createTextNode(Totalpage);

                    lastpage.href = "#"
                    lastpage.id = Totalpage
                    lastpage.appendChild(tn);
                    lastpage.style.padding = "20px"
                    lastpage.setAttribute('href', 'javascript:Search(' + Totalpage + ',"' + url + '")');
                    point.appendChild(lastpage)

                }

                divContainer.appendChild(list);
                if(document.getElementById(currentPage) !== null) {
                    document.getElementById(currentPage).style.color = "white"
                }
                $('#prev').show();
                $('#next').show();

                $('#next').prop("disabled", false);

                $('#prev').prop("disabled", false);

                if (currentPage + 1 >= Totalpage){

                    $('#next').prop("disabled", true);
                }
                if (currentPage - 1 < 0){

                    $('#prev').prop("disabled", true);
                }

                var eventname;
                var eventdate;
                var eventplace;
                var eventprice;

                $("#adiv tr td").click(function () {
                    if ($(this).index() == 1) {
                        for (var j = 0; j < events.length; j++) {
                            if (events[j].name === $(this).text()) {
                                eventname = events[j].name;

                                if(json.hasOwnProperty('priceRanges["0"].max')){
                                    eventprice = events[j].priceRanges["0"].max
                                }else {

                                    eventprice = 50;
                                }

                                $("#eventName").html(events[j].name);


                                var image = document.createElement("IMG");
                                image.src = events[j].images[0].url;
                                if ($(window).width() < 500){
                                    console.log("innerwidth: " + window.innerWidth)
                                    image.style.width = 100 + '%'

                                } else
                                {

                                    console.log("innerwidth: " + window.innerWidth)
                                    image.style.width = 50 + '%'
                                }
                                $("#eventPicture").html("")
                                document.getElementById('eventPicture').appendChild(image);

                                eventdate = new Date(events[j].dates.start.localDate);

                                $("#eventDate").html($.format.date(eventdate, "dd/MM/yyyy"))
                                eventplace = events[j]._embedded.venues[0].address.line1
                                $("#eventPlace").html(events[j]._embedded.venues[0].name + " in " + events[j]._embedded.venues[0].city.name)
                                $("#eventAddress").html(events[j]._embedded.venues[0].address)

                                var image = document.createElement("IMG");

                                var eventLocation = events[j]._embedded.venues[0].location
                                image.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + eventLocation.latitude + "," + eventLocation.longitude + "&zoom=13&size=500x200&maptype=roadmap&markers=color:red%7Clabel:A%7C" + eventLocation.latitude + "," + eventLocation.longitude + "&key=AIzaSyCF_y2ndka9dlzm9HeRhuJi-4Uv1Rm_4j4"
                                $("#eventAddressMap").html("")
                                if ($(window).width() < 500){
                                    console.log("innerwidth: " + window.innerWidth)
                                    image.style.width = 100 + '%'

                                } else
                                {

                                    console.log("innerwidth: " + window.innerWidth)
                                    image.style.width = 50 + '%'
                                }

                                document.getElementById('eventAddressMap').appendChild(image);



                                myApp.popup('.tablet-fullscreen');

                                $("#buy").unbind().on("click", function() {
                                    console.log("place" + eventplace);
                                    console.log("name" + eventname);
                                    console.log("price" + eventprice)

                                    var amount = $("#amount").val();

                                    //myApp.popup('.popup-pay');
                                    Ordertickets(user, eventname, eventdate, eventplace, eventprice, amount)
                                });


                            }
                        }
                    }
                });
            },
            error: function (xhr, status, err) {
                if (err !== "") {

                    $("#adiv").html("You are currently unable to load the page reason : " + err);
                } else
                {
                    $("#adiv").html("You are currently unable to load the page reason : NO INTERNET CONNECTION");

                }
                VerbergLoading()
            }
        });
}


$('#btnOrders').click(function() {
        $.post({
        url: "https://concerttracker.aenterprise.info/orders.php",
        data: {User: user},
        success: function (result, e) {
            result = JSON.parse(result)
            if(result !== null){
            fillorders(result)
            }
        }
    });
});

$('.list').on('click','tr button',function() {
    var order = $(this).parents().eq(1).children(".firstchild").text()
    console.log($(this).parents().eq(1).children(".firstchild").text());
    $.post({
        url: "https://concerttracker.aenterprise.info/DeleteOrder.php",
        data: {User: user, Order:order},
        success: function (result, e) {
            result = JSON.parse(result)
            fillorders(result)
        }
    });
        $(this).parents().eq(1).remove();
});

function fillorders(result) {
    var name = "Ticketname"
    var amount = "Amount"
    var price = "Price"
    console.log(result);
    var Tprice = 0;
    var Tamount = 0;
    $(".list").html("");

    $('<tr><td style="padding: 2%;">'+ name  + ' </td><td style="padding: 2%;">'+ amount + '</td><td style="padding: 2%;">'+ price + '</td></tr></div>').appendTo('.list');

    for (i = 0; i < result.length; i++) {
        name = result[i].EVENTNAME
        amount = result[i].AMOUNT
        price = result[i].PRICE
        Tprice += parseInt(result[i].AMOUNT * result[i].PRICE);
        Tamount += parseInt(result[i].AMOUNT);
        $('<tr id="ticket' + i + '"><td class="firstchild" style="padding: 2%">'+ name  + ' </td><td>'+ amount + '</td><td>'+ price + '</td><td><button class="button button-fill color-blue">Delete</button></td></tr></div>').appendTo('.list');

        if(i + 1 === result.length){
            name = "Total:"
            $('<tr><td style="padding: 2%; border-top: solid; border-top-width: 1px ">'+ name  + ' </td><td style="border-top: solid; border-top-width: 1px ">'+ Tamount + '</td><td style="border-top: solid; border-top-width: 1px " >'+ Tprice + '</td></tr></div>').appendTo('.list');
            console.log("i is length")
            $("#buyButton").unbind().on("click", function() {

                newpayment(Tprice);

            });
        }
    }


}

function newpayment(price){

    if(!window.PaymentRequest) {
        $("#errorbuy").html("Payment did not succeed, please make sure you have added a creditcard to your browser!")

    } else if (window.PaymentRequest) {
        const paymentDetails = {
            total: {
                label: 'Tickets bought on concerttracker',
                amount: {
                    currency: 'USD',
                    value: price,
                },
            },
            shippingOptions: [
                {
                    id: 'Online',
                    label: 'Direct order online',
                    selected: true,
                    amount: {
                        currency: 'USD',
                        value: '0',
                    },
                },
            ],
        };



        const paymentrequest = new PaymentRequest(
            supportedPaymentMethods,
            paymentDetails,
            options
        );

        paymentrequest.show()
            .then((paymentResponse) => {
            console.log(paymentResponse)
        return paymentResponse.complete();
    })
    .catch((err) => {
        console.error('PaymentRequest error: ', err);
    });


    }
}


const creditCardPaymentMethod = {
    supportedMethods: 'basic-card',
    data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        supportedTypes: ['credit', 'debit'],
    },
};






const payWithGooglePaymentMethod = {
    supportedMethods: 'https://google.com/pay',
    data: {
        'environment': 'TEST',
        'apiVersion': 1,
        'allowedPaymentMethods': ['CARD', 'TOKENIZED_CARD'],
        'paymentMethodTokenizationParameters': {
            'tokenizationType': 'PAYMENT_GATEWAY',
            // Check with your payment gateway on the parameters to pass.
            'parameters': {}
        },
        'cardRequirements': {
            'allowedCardNetworks': ['MASTERCARD', 'VISA'],
            'billingAddressRequired': true,
            'billingAddressFormat': 'MIN'
        },
        'phoneNumberRequired': true,
        'emailRequired': true
    },
};


const supportedPaymentMethods = [
    creditCardPaymentMethod,
    payWithGooglePaymentMethod
];

// Options isn't required.
const options = {

    requestPayerName: true,
    requestPayerPhone: true,
    requestPayerEmail: true,
};


$("#btnDiscount").click(function (){

    makeCode();

})


if(document.getElementById("qrcode")){



var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 200,
    height : 200
});

function makeCode () {

    qrcode.clear();
    qrcode.makeCode("U53994654Su");
}



$("#text").
on("blur", function () {
    makeCode();
}).
on("keydown", function (e) {
    if (e.keyCode == 13) {
        makeCode();
    }
});

}

