function selectSingleplayer() {
	var singleplayer = window.location.href='DifficultySelect.html';
	document.getElementById("singleplayerBtn").onclick = singleplayer;
}

function selectMultiplayer() {
	var multiplayer = window.location.href='Lobbies.html';
	document.getElementById("multiplayerBtn").onclick = multiplayer;
}