window.onload = function lobbies() {
	document.getElementById("displayUsername").innerHTML = "Username: " + localStorage.getItem("usernamels");
    document.getElementById('roomCodeInput').style.display = 'none';
    document.getElementById('joinGameBtn2').style.display = 'none';
}

function hostGame() {
    document.getElementById('hostGameBtn').style.display = 'none';
    document.getElementById('joinGameBtn').style.display = 'none';
    
	var roomCode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 4; i++)
    roomCode += possible.charAt(Math.floor(Math.random() * possible.length));

    document.getElementById("roomCode").innerHTML = "Room Code: " + roomCode;
    
    document.getElementById('username').innerHTML = localStorage.getItem("usernamels");
}

function joinGame() {
    document.getElementById('hostGameBtn').style.display = 'none';
    document.getElementById('joinGameBtn').style.display = 'none';
    document.getElementById('roomCodeInput').style.display = 'block';
    document.getElementById('joinGameBtn2').style.display = 'block';
    
}