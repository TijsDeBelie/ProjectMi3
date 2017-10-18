"use strict";
/*global navigator, document, Framework7, Dom7 */
// opgelet: app = cordova initialisatie
//          myApp : F7 initialisatie

// ----------- Cordova basis initialisatie ---------------- //
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

// ----------- Framework7 basis initialisatie ---------------- //
// Initialize your app
var myApp = new Framework7({
    material: true,
    animatePages: false,
    swipeout: false
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false,
    noAnimate: true,
    domCache: true // enable inline pages
});

$$(document).on('page:init', function (e) {
    console.log(page.name);

    if (page.name === 'index') {

        console.log("test");


    }
});

