function selectSingleplayer() { // Function run when the user clicks the singleplayer button
	var singleplayer = window.location.href='DifficultySelect.html';
	document.getElementById("singleplayerBtn").onclick = singleplayer; // Redirect to the singleplayer game page
}

function selectMultiplayer() { // Function run when the user clicks the multiplayer button
	var multiplayer = window.location.href='MultiplayerGame.html';
	document.getElementById("multiplayerBtn").onclick = multiplayer; // Redirect to the multiplayer game page
}