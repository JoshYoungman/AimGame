window.onload = function lobbies() {
	document.getElementById("displayUsername").innerHTML = "Username: " + localStorage.getItem("usernamels");
}

function joinGame() {
	var game = window.location.href='EasyGame.html';
	document.getElementById("joinGameBtn").onclick = game;
}