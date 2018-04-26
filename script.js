// Declare the global variables.
var theForm, x, digitalUnitType, y, timeUnitType, total, totalUnitType;

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
}

// Converts the time into seconds from minutes or hours.
function convertToSec(unitType) {
    var result = y;
    if (unitType == "minuite") {
        result = y * 60;
    } else if (unitType == "hour") {
        result = y * 120;
    }
    return result;
}

// Converts the the digital units into megabytes from kilobytes or gigabytes.
function convertToMB(unitType) {
    var result = x;
    if (unitType == "kilobyte") {
        result = x / 1024;
    } else if (unitType == "gigabyte") {
        result = x * 1024;
    }
    return result;
}

// Converts the total units into gigabytes.
function convertToGB(unitType) {
    var result = total;
    if (unitType == "kilobyte") {
        result = total / 1024 / 1024;
    } else if (unitType == "megabyte") {
        result = total / 1024;
    }
    return result;
}

function playAudio() {
    document.getElementById("ding-sound").play();
}

function display() {
    var answer = calculate()
    document.getElementById("output").innerHTML = "Your expected download time is " + answer + "SEC";
}

/*------------------------------------------------------------------
Calculate the downloading time based on the total to be downnloaded
and the rate at which it is being downloaded.
-------------------------------------------------------------------- */
function calculate() {
    var result = 0;
    getFormInfo();
    x = convertToMB(digitalUnitType);
    y = convertToSec(timeUnitType);
    total = convertToGB(totalUnitType);

    result = (y * total) / x;
    return result;
}

function begin() {
    document.getElementById("typing-sound").play();
    setTimeout(playAudio, 7000);
    setTimeout(display, 7000);
}