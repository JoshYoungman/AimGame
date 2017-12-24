window.onload = function() {
	document.getElementById("usernameBtn").onclick = function storeUsername() {
		var username= document.getElementById("username").value
		
		localStorage.setItem("usernamels",username);
		
		if(username == null || username == ""){ 
			alert("Please enter a Username");
		} else {
			window.location.href='TypeSelect.htm';
		}
	}
}