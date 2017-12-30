var score = -1,
previousScore = score - 1,
localMultiplayerGame = "http://localhost:8080/MultiplayerGame.html",
multiplayerGame = "https://aim-game.firebaseapp.com/MultiplayerGame.html",
targetSize = 40,
targetDifficulty,
difficultySize;

if (window.location == localMultiplayerGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
} else if (window.location == multiplayerGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
}

window.onload = function() {
    document.getElementById('menuBtn').style.display = 'none';
	document.getElementById('playAgainBtn').style.display = 'none';
    document.getElementById('otherID').style.display = 'none';
	document.getElementById('connectBtn').style.display = 'none';
}

function hostGame() {
    window.location.hash = '#init';
    
    document.getElementById('hostBtn').style.display = 'none';
    document.getElementById('joinBtn').style.display = 'none';
    document.getElementById('otherID').style.display = 'block';
	document.getElementById('connectBtn').style.display = 'block';
    
	var roomCode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 4; i++)
    roomCode += possible.charAt(Math.floor(Math.random() * possible.length));

    document.getElementById("roomCode").innerHTML = "Room Code: " + roomCode;
    
    peerJS(roomCode);
}

function joinGame() {
    document.getElementById('hostBtn').style.display = 'none';
    document.getElementById('joinBtn').style.display = 'none';
    document.getElementById('otherID').style.display = 'block';
	document.getElementById('connectBtn').style.display = 'block';
    
	var roomCode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 4; i++)
    roomCode += possible.charAt(Math.floor(Math.random() * possible.length));

    document.getElementById("roomCode").innerHTML = "Room Code: " + roomCode;
    
    peerJS(roomCode);
}

function peerJS(roomCode) {
    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false
    });
    
    peer.on('signal', function(data) {
        document.getElementById('roomCode').value = roomCode;
    })
    
    document.getElementById('connectBtn').addEventListener('click', function() {
        var otherID = document.getElementById('otherID').value;
        peer.signal(otherID);
    })
}

function initialCountdown() {

	var iTimeLeft = 6;
	var timerId = setInterval(countdown, 1000);

	function countdown() {
		if (iTimeLeft == 0) {
			clearTimeout(timerId);
			countdownTimer();
			document.getElementById('initialTimer').style.display = 'none';
			document.getElementById('vs').style.display = 'none';
		} else {
			document.getElementById('initialTimer').innerHTML = iTimeLeft - 1 + "</br>" + "Get Ready!" ;
			iTimeLeft--;
		}
	}

	document.getElementById(targetDifficulty).style.display = 'none';
	targetHit();

}

function countdownTimer() {
	var timeLeft = 30;
	var timerId = setInterval(countdown, 1000);

	function countdown() {
		if (timeLeft == 0) {
			if (previousScore != score - 1){
				score = previousScore + 1;
		}

			clearTimeout(timerId);
			timeLeft = "0";
			document.getElementById('initialTimer').style.display = 'block';
			document.getElementById(targetDifficulty).style.display = 'none';
			document.getElementById('initialTimer').innerHTML = "Time's Up! </br>" + localStorage.getItem("usernamels") + ": " + score;
			document.getElementById('menuBtn').style.display = 'block';
			document.getElementById('playAgainBtn').style.display = 'block';
		} else {
			document.getElementById('timer').innerHTML = timeLeft - 1 + ' seconds remaining';
			timeLeft--;
			document.getElementById(targetDifficulty).style.display = 'block';
		}
	}
}

function targetHit() {   
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	t = document.getElementById(targetDifficulty),
	x_pos = Math.floor((Math.random() * x) - difficultySize),
	y_pos = Math.floor((Math.random() * y) - difficultySize);

	while (x_pos < 0)
	{
		x_pos = Math.floor((Math.random() * x) - difficultySize);
	}

	while (y_pos < 0)
	{
		y_pos = Math.floor((Math.random() * y) - difficultySize);
	}

	t.style.position = "absolute";
	t.style.left = x_pos + 'px';
	t.style.top = y_pos + 'px';

	score++;
	previousScore++;

	if (previousScore != score - 1){
		score = previousScore + 1;
	}
}

function menu() {
	var menu = window.location.href='TypeSelect.html';

	document.getElementById("menuBtn").onclick = menu;
}

function playAgain() {
	var again = location.reload();

	document.getElementById("playAgainBtn").onclick = again;
}