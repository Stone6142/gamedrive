require('dotenv').config();
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
  var username = document.getElementById("username").value;
  var password1 = document.getElementById("password").value;
  var password = btoa(password1);
  if (username == "Skyler" && password == "MTgzNjA=") {
    alert("Login successfully");
    window.location = "../dashhboard/"; // Redirecting to other page.
    return false;
  } else if (username == "Corbyn" && password == "MjUzNQ==") {
    alert("Login successfully");
    window.location = "../dashhboard/"; // Redirecting to other page.
    return false;
  } else if (username == "Cale" && password == "MjUwOA==") {
    alert("Login successfully");
    window.location = "../dashhboard/"; // Redirecting to other page.
    return false;
  } else if (username == "bp" && password == "cG9vcGVhdGVyMzMx") {
    alert("Login successfully");
    window.location = "../dashhboard/"; // Redirecting to other page.
    return false;
  } //else if (username == "aj" && password == "Sd4.life") {
    //alert("Login successfully");
    //window.location = "../logins1/ajc367d0c8-fb4d-4c92-aa08-93e3ee1087d21"; // Redirecting to other page.
    //return false;
  //}
  else {
    attempt--;// Decrementing by one.
    alert("You have left " + attempt + " attempt;");
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("submit").disabled = true;
      window.location = "../"; // Redirecting to other page.
      return false;
    }
  }
}
