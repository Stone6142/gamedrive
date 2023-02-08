var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "Skyler" && password == attempt) {
    alert("Login successfully");
    window.location = "../dashboard/"; // Redirecting to other page.
    return false;
  } else if (username == "Corbyn" && password == "2535") {
    alert("Login successfully");
    window.location = "../dashboard/"; // Redirecting to other page.
    return false;
  } else if (username == "Cale" && password == "2508") {
    alert("Login successfully");
    window.location = "../dashboard/"; // Redirecting to other page.
    return false;
  } else if (username == "bp" && password == "poopeater331") {
    alert("Login successfully");
    window.location = "../dashboard/"; // Redirecting to other page.
    return false;
  } else if (username == "aj" && password == "Sd4.life") {
    alert("Login successfully");
    window.location = "../dashboard/"; // Redirecting to other page.
    return false;
  }
  else {
    attempt--;// Decrementing by one.
    alert("You have left " + attempt + " attempt;");
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      window.location = "https:/gamedrive.live/chat/"; // Redirecting to other page.
      return false;
    }
  }
}
