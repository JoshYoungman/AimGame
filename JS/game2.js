var score = -1;
var previousScore = score - 1;

window.onload = function game() {
	
	var easyGame = "file:///C:/Users/thejo/Documents/BAE%20Plymouth/SOFT352/Coursework/EasyGame.htm";
	var mediumGame = "file:///C:/Users/thejo/Documents/BAE%20Plymouth/SOFT352/Coursework/MediumGame.htm";
	var hardGame = "file:///C:/Users/thejo/Documents/BAE%20Plymouth/SOFT352/Coursework/HardGame.htm";
	
	var targetDifficulty;
	var difficultySize;
	
	if (window.location == easyGame){
		targetDifficulty = document.getElementById('easyTarget');
		difficultySize = 59;
	} else if (window.location == mediumGame){
		targetDifficulty = document.getElementById('mediumTarget');
		difficultySize = 39;
	} else if (window.location == hardGame){
		targetDifficulty = document.getElementById('hardTarget');
		difficultySize = 19;
	}

	function initialCountdown() {
		var iTimeLeft = 6;
		var timerId = setInterval(countdown, 1000);
		document.getElementById('menuBtn').style.display = 'none';

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

		difficulty.style.display = 'none';
		
		easyTargetHit();
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
				document.getElementById('initialTimer').innerHTML = "Time's Up! </br>" + localStorage.getItem("usernamels") + ": " + score;
				difficulty.style.display = 'none';
				document.getElementById('menuBtn').style.display = 'block';
			} else {
				difficulty.style.display = 'block';
				document.getElementById('timer').innerHTML = timeLeft - 1 + ' seconds remaining';
				timeLeft--;
			}
		}
	}

	function targetHit() {
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		
		var x_pos = Math.floor((Math.random() * x) - difficultySize);
		var y_pos = Math.floor((Math.random() * y) - difficultySize);
		
		while (x_pos < 0)
		{
			x_pos = Math.floor((Math.random() * x) - difficultySize);
		}
		
		while (y_pos < 0)
		{
			y_pos = Math.floor((Math.random() * y) - difficultySize);
		}
		
		targetDifficulty.style.position = "absolute";
		targetDifficulty.style.left = x_pos + 'px';
		targetDifficulty.style.top = y_pos + 'px';
		
		score++;
		previousScore++;
		
		if (previousScore != score - 1){
			score = previousScore + 1;
		}
	}
}

function targetMissed() {
	
	score--;
}

function menu() {
	var menu = window.location.href='TypeSelect.htm';
	
	document.getElementById("menuBtn").onclick = menu;
}