//Declare global variables
var score = -1,
previousScore = score - 1,
localEasyGame = "http://localhost:8080/EasyGame.html",
localMediumGame = "http://localhost:8080/MediumGame.html",
localHardGame = "http://localhost:8080/HardGame.html",
localUltraGame = "http://localhost:8080/UltraGame.html",
easyGame = "https://aim-game.firebaseapp.com/EasyGame.html",
mediumGame = "https://aim-game.firebaseapp.com/MediumGame.html",
hardGame = "https://aim-game.firebaseapp.com/HardGame.html",
ultraGame = "https://aim-game.firebaseapp.com/UltraGame.html",
targetDifficulty,
difficultySize;

// Decide what game mode is being played depending on the URL
if (window.location == localEasyGame){
	targetDifficulty = 'easyTarget';
	difficultySize = 59;
} else if (window.location == localMediumGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
} else if (window.location == localHardGame){
	targetDifficulty = 'hardTarget';
	difficultySize = 19;
} else if (window.location == localUltraGame){
	targetDifficulty = 'ultraTarget';
	difficultySize = 9;
} else if (window.location == easyGame){
	targetDifficulty = 'easyTarget';
	difficultySize = 59;
} else if (window.location == mediumGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
} else if (window.location == hardGame){
	targetDifficulty = 'hardTarget';
	difficultySize = 19;
} else if (window.location == ultraGame){
	targetDifficulty = 'ultraTarget';
	difficultySize = 9;
}

// initialCountdown() function to run when the page is loaded
window.onload = function initialCountdown() {
	var iTimeLeft = 6; // Set the countdown timer to 6 seconds
	var timerId = setInterval(countdown, 1000); // Execute the following countdown function every second 
    
    // Hide the Menu and Play Again buttons when the page is loaded
	document.getElementById('menuBtn').style.display = 'none';
	document.getElementById('playAgainBtn').style.display = 'none';

	function countdown() {
		if (iTimeLeft == 0) {
			clearTimeout(timerId); // Prevent the previous setInterval function from executing
			countdownTimer(); // Execute the countdownTimer() function
			document.getElementById('initialTimer').style.display = 'none';
		} else {
            // Display how many seconds until the game starts
			document.getElementById('initialTimer').innerHTML = iTimeLeft - 1 + "</br>" + "Get Ready!" ;
			iTimeLeft--; // Reduce the iTimeLeft variable by 1
		}
	}
	document.getElementById(targetDifficulty).style.display = 'none'; // Hide the target
	targetHit(); // Execute the targetHit() function
}

function countdownTimer() {
	var timeLeft = 30; // Set the countdown timer to 30 seconds
	var timerId = setInterval(countdown, 1000); // Execute the following countdown function every second 

	function countdown() {
		if (timeLeft == 0) {
            // Used to prevent users from altering their score in the Developer tools console
			if (previousScore != score - 1){
				score = previousScore + 1;
		}
			clearTimeout(timerId); // Prevent the previous setInterval function from executing
			timeLeft = "0"; // Ensure timeLeft is set to 0
			document.getElementById('initialTimer').style.display = 'block'; // Display the initialTimer div
			document.getElementById(targetDifficulty).style.display = 'none'; // Hide the target
			document.getElementById('initialTimer').innerHTML = "Time's Up! </br>" + localStorage.getItem("usernamels") + ": " + score; // Display the user's name and final score
			document.getElementById('menuBtn').style.display = 'block'; // Display the menu button
			document.getElementById('playAgainBtn').style.display = 'block'; // Display the play again button
		} else {
			document.getElementById('timer').innerHTML = timeLeft - 1 + ' seconds remaining'; // Display how long is left in the game
			timeLeft--; // Reduce the timer by 1
			document.getElementById(targetDifficulty).style.display = 'block'; // Display the target
		}
	}
}

function targetHit() { // Function for when the user clicks on the target
	// Declaring variables to contain the user's screen width and height
    var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	t = document.getElementById(targetDifficulty),
        
    // Create a random x and y position for the target that is within the user's screen resolution
	x_pos = Math.floor((Math.random() * x) - difficultySize),
	y_pos = Math.floor((Math.random() * y) - difficultySize);

    // If the target is to be displayed off the screen, recalculate another position
	while (x_pos < 0)
	{
		x_pos = Math.floor((Math.random() * x) - difficultySize);
	}

	while (y_pos < 0)
	{
		y_pos = Math.floor((Math.random() * y) - difficultySize);
	}

    // Set the target position
	t.style.position = "absolute";
	t.style.left = x_pos + 'px';
	t.style.top = y_pos + 'px';

    // Increment the user's score
	score++;
	previousScore++;

    // Prevent the user from editing their score in the Developer tools console
	if (previousScore != score - 1){
		score = previousScore + 1;
	}
}

function menu() { // Function run when user clicks the menu button
	var menu = window.location.href='TypeSelect.html'; // Redirects to the Type Select page
	document.getElementById("menuBtn").onclick = menu;
}

function playAgain() { // Funtion run when the user clicks the play again button
	var again = location.reload(); // Refreshes the page
	document.getElementById("playAgainBtn").onclick = again;
}