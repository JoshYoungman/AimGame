// Declare global variables
var score = 0,
opponentScore = 0,
previousScore = score - 1,
targetSize = 40,
targetDifficulty = 'mediumTarget',
difficultySize = 39;

var ready = document.getElementById('ready'),
    yId = document.getElementById('yId'),
    yIdLabel = document.getElementById('yIdLabel'),
    oId = document.getElementById('oId'),
    oIdLabel = document.getElementById('oIdLabel'),
    connect = document.getElementById('connect'),
    menu = document.getElementById('menuBtn'),
    playAgain = document.getElementById('playAgainBtn'),
    host = document.getElementById('hostBtn'),
    join = document.getElementById('joinBtn');

window.onload = function() { // Run function when the page is loaded
    // Hide various HTML elements
    menu.style.display = 'none';
	playAgain.style.display = 'none';
    document.getElementById(targetDifficulty).style.display = 'none';
    yIdLabel.style.display = 'none';
    oIdLabel.style.display = 'none';
    yId.style.display = 'none';
    oId.style.display = 'none';
    connect.style.display = 'none';
    ready.style.display = 'none';
    
    // Declaring variables to contain the user's screen width and height
    var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	t = d.getElementById(targetDifficulty),
        
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


    host.onclick = function hostGame() { // Run function when the user clicks the host button
        
        // Add '#init' to the end of the URL
        window.location.hash = '#init';

        // Hide and display various HTML elements
        host.style.display = 'none';
        join.style.display = 'none';
        yId.style.display = 'block';
        oId.style.display = 'block';
        yIdLabel.style.display = 'block';
        oIdLabel.style.display = 'block';
        connect.style.display = 'block';

        peerJS(); // Execute the peerJS() function
    }

    join.onclick = function joinGame() { // Run function whe the user clicks the join button
        
        // Hide and display various HTML elements
        host.style.display = 'none';
        join.style.display = 'none';
        yId.style.display = 'block';
        oId.style.display = 'block';
        yIdLabel.style.display = 'block';
        oIdLabel.style.display = 'block';
        connect.style.display = 'block';

        peerJS(); // Execute the peerJS() function
    }
}

function peerJS() {    
    var Peer = require('simple-peer'); // Load the 'simple-peer' module
    var peer = new Peer({ // Create a new peer
        initiator: location.hash === '#init', // Peer with '#init' in the URL is the initiator (first to send ID)
        trickle: false
    });
    
    peer.on('signal', function (data) {
        yId.value = JSON.stringify(data) // Initiator receives JSON string to send to the other peer
      
    })

    connect.addEventListener('click', function () {
        var otherId = JSON.parse(oId.value) // Non initiating peer enteres initiating peer's id, clicks connect and receives own id
        peer.signal(otherId)

        // Display and hide various HTML elements
        ready.style.display = 'block';
        oIdLabel.style.display = 'none';
        oId.style.display = 'none';
        connect.style.display = 'none';
        
    })
        
    ready.addEventListener('click', function () {
        // Hide various HTML elements when ready button is clicked
        yIdLabel.style.display = 'none';
        yId.style.display = 'none';
        ready.style.display = 'none';

        ready.onclick = iCountdown(); // Execute the iCountdown function when the ready button is clicked
        peer.send() // Send 'data'
    })

    peer.on('data', function (data) { // When the user receives 'data'
        // Hide various HTML elements
        yIdLabel.style.display = 'none';
        yId.style.display = 'none';
        ready.style.display = 'none';
        
        iCountdownPeer(); // Execute the iCountdownPeer() function
    })
    
    document.getElementById(targetDifficulty).addEventListener('click', function () {
        var scoreSend = score;
        peer.send(scoreSend) // Send 'data' (score value) when the user clicks the target
    })
    
    peer.on('data', function (data) { // When the user receives data
        var w = window,
            d = document,
	        e = d.documentElement,
	        g = d.getElementsByTagName('body')[0],
	        x = w.innerWidth || e.clientWidth || g.clientWidth,
	        y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	        t = d.getElementById(targetDifficulty),
        
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
        
        opponentScore = data; // Set opponentScore to 'data' received
        if (opponentScore == 'undefined'){
            opponentScore = 0; // To prevent oppenents score displaying as undefined if they don't score anything
        }
    })
    
}

var iCountdown = (function() {
    // Execute the function only once
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            
            var iTimeLeft = 6; // Set the timer to 6 seconds
            var timerId = setInterval(countdown, 1000); // Execute the following countdown function every second 

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
        }
    };
})();

var iCountdownPeer = (function() {
    // Execute the function only once
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            
            var iTimeLeft = 6; // Set the timer to 6 seconds
            var timerId = setInterval(countdown, 1000); // Execute the following countdown function every second 

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
        }
    };
})();

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
            // Displayed and hide various HTML elements
			document.getElementById('initialTimer').style.display = 'block';
			document.getElementById(targetDifficulty).style.display = 'none';
			menu.style.display = 'block';
			playAgain.style.display = 'block';
            document.getElementById('initialTimer').innerHTML = "Time's Up! </br>" + localStorage.getItem("usernamels") + ": " + score + "</br>Opponent: " + opponentScore; // Display the user's and opponent's final scores
		} else {
			document.getElementById('timer').innerHTML = timeLeft - 1 + ' seconds remaining'; // Display how long is left in the game
			timeLeft--; // Reduce the timer by 1
			document.getElementById(targetDifficulty).style.display = 'block'; // Display the target
		}
	}
}

document.getElementById(targetDifficulty).onclick = function targetHit() { // Function for when the user clicks on the target
	// Declaring variables to contain the user's screen width and height
    var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	t = d.getElementById(targetDifficulty),
        
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

menu.onclick = function menu() { // Function run when user clicks the menu button
	var menuSelect = window.location.href='TypeSelect.html'; // Redirects to the Type Select page
	menu.onclick = menuSelect;
}

playAgain.onclick = function playAgain() {
	var again = location.reload(); // Refreshes the page
	playAgain.onclick = again;
}