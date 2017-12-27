var score = -1,
previousScore = score - 1,
localEasyGame = "http://localhost:8080/EasyGame.htm",
localMediumGame = "http://localhost:8080/MediumGame.htm",
localHardGame = "http://localhost:8080/HardGame.htm",
localRandomGame = "http://localhost:8080/RandomGame.htm",
easyGame = "https://aim-game.firebaseapp.com/EasyGame.htm",
mediumGame = "https://aim-game.firebaseapp.com/MediumGame.htm",
hardGame = "https://aim-game.firebaseapp.com/HardGame.htm",
randomGame = "https://aim-game.firebaseapp.com/RandomGame.htm",
targetSize = 40,
targetDifficulty,
difficultySize;

if (window.location == localEasyGame){
	targetDifficulty = 'easyTarget';
	difficultySize = 59;
} else if (window.location == localMediumGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
} else if (window.location == localHardGame){
	targetDifficulty = 'hardTarget';
	difficultySize = 19;
} else if (window.location == localRandomGame){
	targetDifficulty = 'randomTarget';
	difficultySize = targetSize - 1;
} else if (window.location == easyGame){
	targetDifficulty = 'easyTarget';
	difficultySize = 59;
} else if (window.location == mediumGame){
	targetDifficulty = 'mediumTarget';
	difficultySize = 39;
} else if (window.location == hardGame){
	targetDifficulty = 'hardTarget';
	difficultySize = 19;
} else if (window.location == randomGame){
	targetDifficulty = 'randomTarget';
	difficultySize = targetSize - 1;
}

window.onload = function initialCountdown() {

	var iTimeLeft = 6;
	var timerId = setInterval(countdown, 1000);
	document.getElementById('menuBtn').style.display = 'none';
	document.getElementById('playAgainBtn').style.display = 'none';

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

	if (targetDifficulty == randomGame){
		targetSize =  Math.floor(Math.random() * 100);
		while (targetSize < 10)
		{
			targetSize =  Math.floor(Math.random() * 100);
		}

		t.style.height = targetSize + "px";
		t.style.width = targetSize + "px";
	}

	score++;
	previousScore++;

	if (previousScore != score - 1){
		score = previousScore + 1;
	}
}

function menu() {
	var menu = window.location.href='TypeSelect.htm';

	document.getElementById("menuBtn").onclick = menu;
}

function playAgain() {
	var again = location.reload();

	document.getElementById("playAgainBtn").onclick = again;
}