var score = 0,
opponentScore = 0,
opponentName ='';
previousScore = score - 1,
targetSize = 40,
targetDifficulty = 'mediumTarget',
difficultySize = 39;

window.onload = function() {
    document.getElementById('menuBtn').style.display = 'none';
	document.getElementById('playAgainBtn').style.display = 'none';
    document.getElementById(targetDifficulty).style.display = 'none';
    document.getElementById('yIdLabel').style.display = 'none';
    document.getElementById('oIdLabel').style.display = 'none';
    document.getElementById('yId').style.display = 'none';
    document.getElementById('oId').style.display = 'none';
    document.getElementById('connect').style.display = 'none';
    document.getElementById('ready').style.display = 'none';
    
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


    document.getElementById('hostBtn').onclick = function hostGame() {
        window.location.hash = '#init';

        document.getElementById('hostBtn').style.display = 'none';
        document.getElementById('joinBtn').style.display = 'none';
        document.getElementById('yId').style.display = 'block';
        document.getElementById('oId').style.display = 'block';
        document.getElementById('yIdLabel').style.display = 'block';
        document.getElementById('oIdLabel').style.display = 'block';
        document.getElementById('connect').style.display = 'block';

        var roomCode = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 4; i++)
        roomCode += possible.charAt(Math.floor(Math.random() * possible.length));

        //document.getElementById("roomCode").innerHTML = "Room Code: " + roomCode;

        peerJS();
    }

    document.getElementById('joinBtn').onclick = function joinGame() {
        document.getElementById('hostBtn').style.display = 'none';
        document.getElementById('joinBtn').style.display = 'none';
        document.getElementById('yId').style.display = 'block';
        document.getElementById('oId').style.display = 'block';
        document.getElementById('yIdLabel').style.display = 'block';
        document.getElementById('oIdLabel').style.display = 'block';
        document.getElementById('connect').style.display = 'block';

        var roomCode = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 4; i++)
        roomCode += possible.charAt(Math.floor(Math.random() * possible.length));

        //document.getElementById("roomCode").innerHTML = "Room Code: " + roomCode;

        peerJS();
    }
}

function peerJS() {
    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false
    });
    
    peer.on('signal', function (data) {
    document.getElementById('yId').value = JSON.stringify(data)
      
    })

    document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('oId').value)
    peer.signal(otherId)
        
    document.getElementById('ready').style.display = 'block';
    
    document.getElementById('oIdLabel').style.display = 'none';
    document.getElementById('oId').style.display = 'none';
    document.getElementById('connect').style.display = 'none';
        
    })
        
    document.getElementById('ready').addEventListener('click', function () {
    document.getElementById('yIdLabel').style.display = 'none';
    document.getElementById('yId').style.display = 'none';
    document.getElementById('ready').style.display = 'none';
    document.getElementById('ready').onclick = iCountdown();
    peer.send()
    })

    peer.on('data', function (data) {
    document.getElementById('yIdLabel').style.display = 'none';
    document.getElementById('yId').style.display = 'none';
    document.getElementById('ready').style.display = 'none';
    iCountdownPeer();
    })
    
    document.getElementById('mediumTarget').addEventListener('click', function () {
    var scoreSend = score;
    peer.send(scoreSend)
    })
    
    peer.on('data', function (data) {
    opponentScore = data;
    })
    
}

var iCountdown = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
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

        }
    };
})();

var iCountdownPeer = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
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

        }
    };
})();

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
			document.getElementById('menuBtn').style.display = 'block';
			document.getElementById('playAgainBtn').style.display = 'block';
            document.getElementById('initialTimer').innerHTML = "Time's Up! </br>" + localStorage.getItem("usernamels") + ": " + score + "</br>Opponent: " + opponentScore;
		} else {
			document.getElementById('timer').innerHTML = timeLeft - 1 + ' seconds remaining';
			timeLeft--;
			document.getElementById(targetDifficulty).style.display = 'block';
		}
	}
}

document.getElementById('mediumTarget').onclick = function targetHit() {   
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

document.getElementById('menuBtn').onclick = function menu() {
	var menu = window.location.href='TypeSelect.html';

	document.getElementById("menuBtn").onclick = menu;
}

document.getElementById('playAgainBtn').onclick = function playAgain() {
	var again = location.reload();

	document.getElementById("playAgainBtn").onclick = again;
}