function selectSingleplayer() {
	var singleplayer = window.location.href='DifficultySelect.htm';
	document.getElementById("singleplayerBtn").onclick = singleplayer;
}

function selectMultiplayer() {
	var multiplayer = window.location.href='Lobbies.htm';
	document.getElementById("multiplayerBtn").onclick = multiplayer;
}