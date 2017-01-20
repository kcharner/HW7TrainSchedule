// 1. hiding train schedule on page-load
$(".train").hide();

// 2. setting up functions to be called later
function hideJumbo() {
	$(".jumbotron").hide();
	$(".train").show();
}

function home() {
	$(".jumbotron").show();
	$(".train").hide();
}

// 3. hiding jumbotron on-click of view schedule button
$("#viewSchedule").on("click", hideJumbo);

// 4. resetting page on-click of header
$("#header").on("click", home);

// 5. initializing Firebase w/ my key
var config = {
    apiKey: "AIzaSyCVGthAOKfHOwZV8Mv2HUHEIwSj3vIPt9A",
    authDomain: "train-schedule-781ea.firebaseapp.com",
    databaseURL: "https://train-schedule-781ea.firebaseio.com",
    storageBucket: "train-schedule-781ea.appspot.com",
    messagingSenderId: "157309656156"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 6. on-click event for adding a new train
$("#addBtn").on("click", function() {

  // 7. variables to pull user's input data
  var trainName = $("#trainInput").val().trim();
  var goingTo = $("#destinationInput").val().trim();
  var earliestTime = moment($("#timeInput").val().trim(), "DD/MM/YY").format("X");
  var howOften = $("#freqInput").val().trim();

  // 8. creating object to contain user's input data
  var addingNewTrain = {
    train: trainName,
    destination: goingTo,
    time: earliestTime,
    frequency: howOften
  };

  // 9. push new train data to Firebase and remove existing data from input fields
  database.ref().push(addingNewTrain);

  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#freqInput").val("");

  return false;
});














