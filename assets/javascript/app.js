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

  // 7. variables to pull user's input data, 
  var trainName = $("#trainInput").val().trim();
  var goingTo = $("#destinationInput").val().trim();
  var earliestTime = $("#timeInput").val().trim();
  // testing purpose
  // console.log(earliestTime);
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

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

   var newTrainName = childSnapshot.val().train;
   var trainDestiny = childSnapshot.val().destination;
   var freqLeaving = childSnapshot.val().frequency;
   var firstDepart = moment(childSnapshot.val().time, "HH:mm");      
   var currentTime = moment().format("HH:mm");
   var nextArrivala = firstDepart.add(freqLeaving, 'm');
   var nextArrivalb = firstDepart.add(freqLeaving, 'm').format("HH:mm");
   var minutesAway = nextArrivala.diff(moment(), "minutes");
   // testing purpose
   // console.log(minutesAway);

 $("#currentSchedule > tbody").append("<tr><td>" + newTrainName + "</td><td>" + trainDestiny + "</td><td>" +
  freqLeaving + "</td><td>" + nextArrivalb + "</td><td>" + minutesAway + "</td></tr>");
});











