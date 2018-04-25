// Get the form from the html document.
var theForm = document.forms["inputform"];
// Get the rate information.
var x = theForm.elements["digital-number"];
var digitalUnitType = theForm.elements["digital-unit"];

var y = theForm.elements["time-number"];
var timeUnitType = theForm.elements["time-unit"];

// Get the total amount needed to download.
var total = theForm.elements["total-number"];
var totalUnitType = theForm.elements["total-unit"]

function calculate() {
    var result = 0;

    convertToSec(timeUnitType);

    return result;
}

function convertToSec(unit) {
    var result = 0;
    if (unitType == "minuite") {
        result = y * 60;
    } else if () {

    }
    return result;
}