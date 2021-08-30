var domain = "https://localhost:44304";

//Prevent Submit Function
function validateForm() {
  if ($("#Username").val().trim() != "" && $("#Password").val().trim() != "")
    return true;
  else return false;
}
//Validate Message
$(document).ready(function () {
  $("#Username").keyup(function () {
    if ($("#Username").val().trim() == "")
      $("#invalid-username").text("Please enter your username");
    else {
      $("#invalid-username").text("");
    }
  });
  $("#Username").keydown(function () {
    if ($("#Username").val().trim() == "")
      $("#invalid-username").text("Please enter your username");
    else {
      $("#invalid-username").text("");
    }
  });
  $("#Password").keyup(function () {
    if ($("#Password").val().trim() == "")
      $("#invalid-password").text("Please enter your password");
    else {
      $("#invalid-password").text("");
    }
  });
  $("#Password").keydown(function () {
    if ($("#Password").val().trim() == "")
      $("#invalid-password").text("Please enter your password");
    else {
      $("#invalid-password").text("");
    }
  });
});
//Submit Login
$(document).ready(function () {
  $("#loginButton").click(function () {
    if (validateForm()) {
      var data = {
        Username: $("#Username").val(),
        Password: $("#Password").val(),
      };

      $.ajax({
        type: "POST",
        url: domain + "/api/Account/Login",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        datatype: "json",
        async: true,
        success: function (response) {
          sessionStorage.setItem("username", response.authenModel.Username);
          sessionStorage.setItem("role", response.authenModel.Role);
          sessionStorage.setItem("token", response.authenModel.Token);
          sessionStorage.setItem("userId", response.authenModel.UserId);

          window.location.href = "index.html";
          //   if (response.authenModel.Role == "ADMIN") {
          //     window.location.href = "/Admin/dashboard.html";
          //   } else {
          //   location.reload();
          //   }
        },
        error: function (response) {
          $("#error-message").text("Username or password is incorrect!");
          $("#error-message").removeClass("d-none");
        },
      });
    }
  });
});
