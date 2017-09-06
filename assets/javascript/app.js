//Global var declarations
//an array to hold 4 questions
var intervalId;
var clockRunning = false;
var firstQuestion;
var userGuess;
var guessed = false;
var computerGuess;
var end;
var correctGuesses = 0;
var wrongGuesses = 0;
var alreadyAnswered = false;
//an object for each question with a key:value pairing aka question/answer pairing; need 3 dummy pairings for each (aka possible wrong answers)

	var question1 = {
	question: "What is the distance from the Earth to the Moon?",
	
	a1: "51, 006 miles",
	a2: "332,236 miles",
	a3: "157,200 miles",
	a4: "238,900 miles"
	};

	var question2 = {
	question: "What is the distance from Austin to Houston?",
	
	a1: "165 miles",
	a2: "202 miles",
	a3: "176 miles",
	a4: "133 miles"
	};

	var question4 = {
	question: "What is the distance from point A to point B",

	a1: "100",
	a2: "200",
	a3: "300",
	a4: "400"
	};

	var question3 = {
		question: "end",

		a1: "end",
		a2: "end",
		a3: "end",
		a4: "end"

	}


var wordAtPlay = [question1, question2, question3, question4];


//when the user presses play start the clock
window.onload = function() {
	$("#play").click(clock.start)
	$("#play").click(displayQuestion);
	

};

	//record what the user guesses and calls the validation function
$(".list-group-item").on("click", function recordVote(){
	
	if (clockRunning === true && firstQuestion != wordAtPlay.length){ //Need to add an && that prevents the user from selecting more than one answer
		userGuess = $(this).html()
		console.log(userGuess)
		clock.loadNext();
		clock.reset();
		
	}
	else if (firstQuestion === wordAtPlay.length){
		clock.endGame();
	}


	validate();

});


//validate answers; still cannot get it to track correct v. incorrect answers; trying to assign it to a specific object value

function validate (){

	if (userGuess === computerGuess.a1){

		correctGuesses++
		console.log("Right: " + correctGuesses);

	}
	else {
		wrongGuesses++
		console.log("Wrong: " + wrongGuesses);
	}
}



function displayQuestion () {

if (clockRunning = true){
	computerGuess = wordAtPlay[0];
	firstQuestion = wordAtPlay.indexOf(computerGuess);
	
	$("#question").html(computerGuess.question);
	$("#answerA").html(computerGuess.a1);
	$("#answerB").html(computerGuess.a2);
	$("#answerC").html(computerGuess.a3);
	$("#answerD").html(computerGuess.a4);
}
else {
	alert();
}

}


var clock = {

	time: 5,

	reset: function() {
    clock.time = 5;
    $("#currentTime").html("00:05");
  	},

	start: function() {
		if (!clockRunning) {
			clockRunning = true;
			intervalId = setInterval(clock.count, 1000);
		}
	},

	count: function() {
		if (clock.time != 0){
			clock.time--
			//console.log(clock.time)
			$("#currentTime").html(clock.timeConverter(clock.time));
		}
		else if (clock.time === 0 && firstQuestion != wordAtPlay.length){
			

			clock.reset();
			clock.loadNext();
		}
		else if (computerGuess === wordAtPlay[4]) {
			clockRunning = false;
			clock.endGame();
			//clock.start();
		}
	},

	timeConverter: function(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
    	seconds = "0" + seconds;
    }
    if (minutes === 0) {
    	minutes = "00";
    }
    else if (minutes < 10) {
    	minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
	},

	loadNext: function() {

		

		firstQuestion++;

		if(firstQuestion === wordAtPlay.length){
			alert()
		}
		else {
		computerGuess = wordAtPlay[firstQuestion++];
		
		$("#question").html(computerGuess.question);
		$("#answerA").html(computerGuess.a1);
		$("#answerB").html(computerGuess.a2);
		$("#answerC").html(computerGuess.a3);
		$("#answerD").html(computerGuess.a4);
		}
	
	},

	//temporarily using an alert to end the game and show # of right/wrong guesses
	endGame: function (){

		alert("Wrong: " + wrongGuesses + " Right: " + correctGuesses);

	}
};

//Still Need to:
//1) have a restart function that doesn't just use an alert to break the game


//2) fix validation of answers so that it can check the userGuess against the correct object value

//3) fix answer button click event so the user can only select one answer













