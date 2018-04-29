// Declare the global variables.
var theForm, x, digitalUnitType, y, timeUnitType, total, totalUnitType, answer;
//var reset = false;

// Retrieves the information from the html document.
function getFormInfo() {
    // Get the form.
    theForm = document.forms["inputform"];

    // Get the rate information.
    x = theForm.elements["digital-number"].value;
    digitalUnitType = theForm.elements["digital-unit"].value;

    y = theForm.elements["time-number"].value;
    timeUnitType = theForm.elements["time-unit"].value;

    // Get the total amount needed to download.
    total = theForm.elements["total-number"].value;
    totalUnitType = theForm.elements["total-unit"].value;
    alert("Rate: " + x + digitalUnitType + " / " + y + timeUnitType + "\nTotal: " + total + totalUnitType);
}

// Converts the time into seconds from minutes or hours.
function convertToSec(unitType, num) {
    var result = num;
    if (unitType == "minuite") {
        result = num * 60;
    } else if (unitType == "hour") {
        result = num * 120;
    }
    return result;
}

// Converts the the digital units into megabytes from kilobytes or gigabytes.
function convertToMB(unitType, num) {
    var result = num;
    if (unitType == "kilobyte") {
        result = num / 1024;
    } else if (unitType == "gigabyte") {
        result = num * 1024;
    }
    return result;
}

/*
// Converts the total units into gigabytes.
function convertToGB(unitType, num) {
    var result = num;
    if (unitType == "kilobyte") {
        result = num / 1024 / 1024;
    } else if (unitType == "megabyte") {
        result = num / 1024;
    }
    return result;
}
*/

// Helper function for the setTimeout. Plays the ding sound.
function playAudio() {
    document.getElementById("output").innerHTML = "Your expected download time is " + answer + "SEC";
    document.getElementById("ding-sound").play();
}

/*------------------------------------------------------------------
Calculate the downloading time based on the total to be downnloaded
and the rate at which it is being downloaded.
-------------------------------------------------------------------- */
function calculate() {
    var result = 0;
    getFormInfo();
    x = convertToMB(digitalUnitType, x);
    y = convertToSec(timeUnitType, y);
    total = convertToMB(totalUnitType, total);

    result = (y * total) / x;
    return result;
}

function timer() {
    // Gets the future date when the DL is finished.
    var d = new Date().getTime() + (answer * 1000);

    // Update the timer every second
    var a = setInterval(function() {
        // Get the current date
        var now = new Date().getTime();
        // Amount of time between both times.
        var distance = d - now;

        // Calculate the time
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // output
        document.getElementById("countdown").innerHTML = days + ":" + hours + ":" +
            minutes + ":" + seconds;

        if (distance < 0) {
            clearInterval(a);
            document.getElementById("countdown").innerHTML = "Your download should be finished by now.";
            document.getElementById("alarm-sound").play();
        }
    }, 1000);
}

function begin() {
    answer = calculate();
    document.getElementById("output").innerHTML = "";
    document.getElementById("typing-sound").play();
    setTimeout(playAudio, 7000);
    setTimeout(timer, 6000);
}