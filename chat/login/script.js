var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "Skyler" && password == ${{ secrets.PASS }}) {
    alert("Login successfully");
    window.location = "../logins1/me75f1f49c-0211-4337-a364-b7602ec38ea3/"; // Redirecting to other page.
    return false;
  } else if (username == "Corbyn" && password == "2535") {
    alert("Login successfully");
    window.location = "../logins1/cp08d8420f-0eb5-4caf-b841-ce3b5fe68ce4"; // Redirecting to other page.
    return false;
  } else if (username == "Cale" && password == "2508") {
    alert("Login successfully");
    window.location = "../logins1/cj8e84061b-83d5-4c33-a499-c2118f22686c"; // Redirecting to other page.
    return false;
  } else if (username == "bp" && password == "poopeater331") {
    alert("Login successfully");
    window.location = "../logins1/bp8e84061b-83d5-4c33-a499-c2118f22686c"; // Redirecting to other page.
    return false;
  } else if (username == "aj" && password == "Sd4.life") {
    alert("Login successfully");
    window.location = "../logins1/ajc367d0c8-fb4d-4c92-aa08-93e3ee1087d21"; // Redirecting to other page.
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
