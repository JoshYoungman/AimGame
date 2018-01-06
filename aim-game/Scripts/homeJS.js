window.onload = function() { // Function used to store the user's name via localStorage
	document.getElementById("usernameBtn").onclick = function storeUsername() {
		var username= document.getElementById("username").value
		
		localStorage.setItem("usernamels",username); // Sets the localStorage variable "usernamels" as the user's name
		
		if(username == null || username == ""){ 
			alert("Please enter a Username"); // Displays alert when the user does not enter a username
		} else {
			window.location.href='TypeSelect.html'; // Redirects to the Type Select page
		}
	}
}