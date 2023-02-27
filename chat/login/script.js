require('dotenv').config();
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
  var username1 = document.getElementById("username").value;
  var password1 = document.getElementById("password").value;
  var username = btoa(username1);
  var password = btoa(password1);
  if (username == "U2t5bGVy" && password == "MTgzNjA=") {
    alert("Login successfully");
    window.location(atob("Li9sb2dpbnMxL21lNzVmMWY0OWMtMDIxMS00MzM3LWEzNjQtYjc2MDJlYzM4ZWEzLw==")); // Redirecting to other page.
    return false;
  } else if (username == "Q29yYnlu" && password == "MjUzNQ==") {
    alert("Login successfully");
    window.location(atob("Li4vbG9naW5zMS9jcDA4ZDg0MjBmLTBlYjUtNGNhZi1iODQxLWNlM2I1ZmU2OGNlNA==")); // Redirecting to other page.
    return false;
  } else if (username == "Q2FsZQ==" && password == "MjUwOA==") {
    alert("Login successfully");
    window.location(atob("Li4vbG9naW5zMS9jajhlODQwNjFiLTgzZDUtNGMzMy1hNDk5LWMyMTE4ZjIyNjg2Yw==")); // Redirecting to other page.
    return false;
  } else if (username == "YnA=" && password == "cG9vcGVhdGVyMzMx") {
    alert("Login successfully");
    window.location(atob("Li4vbG9naW5zMS9icDhlODQwNjFiLTgzZDUtNGMzMy1hNDk5LWMyMTE4ZjIyNjg2Yw==")); // Redirecting to other page.
    return false;
  } else if (username == "YWo=" && password == "U2Q0LmxpZmU=") {
    alert("Login successfully");
    window.location(atob("Li4vbG9naW5zMS9hamMzNjdkMGM4LWZiNGQtNGM5Mi1hYTA4LTkzZTNlZTEwODdkMjE=")); // Redirecting to other page.
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
      window.location = "../"; // Redirecting to other page.
      return false;
    }
  }
}
