var domain = "https://localhost:44304";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const telRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
//Prevent Submit Function
function validateForm() {
  if (
    $("#FirstName").val().trim() != "" &&
    $("#LastName").val().trim() != "" &&
    $("#Username").val().trim() != "" &&
    $("#Email").val().trim() != "" &&
    $("#Password").val().trim() != "" &&
    $("#ConfirmPassword").val().trim() != "" &&
    $("#Tel").val().trim() != "" &&
    $("#NumberId").val().trim() != "" &&
    $("#Role").val() != "" &&
    $("#Gender").val() != "" &&
    $("#invalid-first-name").text() == "" &&
    $("#invalid-last-name").text() == "" &&
    $("#invalid-username").text() == "" &&
    $("#invalid-email").text() == "" &&
    $("#invalid-password").text() == "" &&
    $("#invalid-confirm-password").text() == "" &&
    $("#invalid-tel").text() == "" &&
    $("#invalid-id").text() == "" &&
    $("#invalid-gender").text() == "" &&
    $("#invalid-role").text() == ""
  ) {
    return true;
  }
  return false;
}
//Validate Function
function checkUserExists() {
  return $.ajax({
    type: "POST",
    url:
      domain +
      "/api/User/checkUserExists?username=" +
      $("#Username").val().trim(),
    contentType: "application/json; charset=utf-8",
    success: function (response) {},
  });
}
function checkEmailExists() {
  return $.ajax({
    type: "POST",
    url:
      domain + "/api/User/checkEmailExists?email=" + $("#Email").val().trim(),
    contentType: "application/json; charset=utf-8",
    success: function (response) {},
  });
}
function checkTelExists() {
  return $.ajax({
    type: "POST",
    url: domain + "/api/User/checkTelExists?tel=" + $("#Tel").val().trim(),
    contentType: "application/json; charset=utf-8",
    success: function (response) {},
  });
}
function checkIdNumberExists() {
  return $.ajax({
    type: "POST",
    url:
      domain +
      "/api/User/checkIdNumberExists?idnum=" +
      $("#NumberId").val().trim(),
    contentType: "application/json; charset=utf-8",
    success: function (response) {},
  });
}
//Validate Message
$(document).ready(function () {
  $("#FirstName").keyup(function () {
    if ($("#FirstName").val().trim() == "")
      $("#invalid-first-name").text("Please enter your first name");
    else {
      $("#invalid-first-name").text("");
    }
  });
  $("#FirstName").keydown(function () {
    if ($("#FirstName").val().trim() == "")
      $("#invalid-first-name").text("Please enter your first name");
    else {
      $("#invalid-first-name").text("");
    }
  });
  $("#LastName").keyup(function () {
    if ($("#LastName").val().trim() == "")
      $("#invalid-last-name").text("Please enter your last name");
    else {
      $("#invalid-last-name").text("");
    }
  });
  $("#LastName").keydown(function () {
    if ($("#LastName").val().trim() == "")
      $("#invalid-last-name").text("Please enter your last name");
    else {
      $("#invalid-last-name").text("");
    }
  });
  $("#Username").keyup(function () {
    if ($("#Username").val().trim() == "")
      $("#invalid-username").text("Please enter your username");
    else {
      checkUserExists().done(function (data) {
        if (data == "") {
          $("#invalid-username").text("");
        } else {
          $("#invalid-username").text("Username is available");
        }
      });
    }
  });
  $("#Username").keydown(function () {
    if ($("#Username").val().trim() == "")
      $("#invalid-username").text("Please enter your username");
    else {
      checkUserExists().done(function (data) {
        if (data == "") {
          $("#invalid-username").text("");
        } else {
          $("#invalid-username").text("Username is available");
        }
      });
    }
  });
  $("#Email").keyup(function () {
    if ($("#Email").val().trim() == "")
      $("#invalid-email").text("Please enter your email");
    else {
      if (!emailRegex.test($("#Email").val().trim()))
        $("#invalid-email").text("Email not valid");
      else {
        checkEmailExists().done(function (data) {
          if (data == "") {
            $("#invalid-email").text("");
          } else {
            $("#invalid-email").text("Email is already in use");
          }
        });
      }
    }
  });
  $("#Email").keydown(function () {
    if ($("#Email").val().trim() == "")
      $("#invalid-email").text("Please enter your email");
    else {
      if (!emailRegex.test($("#Email").val().trim()))
        $("#invalid-email").text("Email not valid");
      else {
        checkEmailExists().done(function (data) {
          if (data == "") {
            $("#invalid-email").text("");
          } else {
            $("#invalid-email").text("Email is already in use");
          }
        });
      }
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
      $("#invalid-password").text("Please enter password");
    else {
      $("#invalid-password").text("");
    }
  });
  $("#ConfirmPassword").keyup(function () {
    if ($("#ConfirmPassword").val().trim() == "")
      $("#invalid-confirm-password").text("Please enter confirm password");
    else {
      if ($("#ConfirmPassword").val().trim() !== $("#Password").val().trim())
        $("#invalid-confirm-password").text(
          "The password confirmation does not match."
        );
      else $("#invalid-confirm-password").text("");
    }
  });
  $("#ConfirmPassword").keydown(function () {
    if ($("#ConfirmPassword").val().trim() == "")
      $("#invalid-confirm-password").text("Please enter confirm password");
    else {
      if ($("#ConfirmPassword").val().trim() !== $("#Password").val().trim())
        $("#invalid-confirm-password").text(
          "The password confirmation does not match."
        );
      else $("#invalid-confirm-password").text("");
    }
  });
  $("#Tel").keyup(function () {
    if ($("#Tel").val().trim() == "")
      $("#invalid-tel").text("Please enter your phone number");
    else {
      if (!telRegex.test($("#Tel").val().trim()))
        $("#invalid-tel").text("Phone number not valid");
      else {
        checkTelExists().done(function (data) {
          if (data == "") {
            $("#invalid-tel").text("");
          } else {
            $("#invalid-tel").text("Phone number is already in use");
          }
        });
      }
    }
  });
  $("#Tel").keydown(function () {
    if ($("#Tel").val().trim() == "")
      $("#invalid-tel").text("Please enter your phone number");
    else {
      if (!telRegex.test($("#Tel").val().trim()))
        $("#invalid-tel").text("Phone number not valid");
      else {
        checkTelExists().done(function (data) {
          if (data == "") {
            $("#invalid-tel").text("");
          } else {
            $("#invalid-tel").text("Phone number is already in use");
          }
        });
      }
    }
  });
  $("#NumberId").keyup(function () {
    if ($("#NumberId").val().trim() == "")
      $("#invalid-id").text("Please enter your ID");
    else {
      checkIdNumberExists().done(function (data) {
        if (data == "") {
          $("#invalid-id").text("");
        } else {
          $("#invalid-id").text("This ID is already in use");
        }
      });
    }
  });
  $("#NumberId").keydown(function () {
    if ($("#NumberId").val().trim() == "")
      $("#invalid-id").text("Please enter your ID");
    else {
      checkIdNumberExists().done(function (data) {
        if (data == "") {
          $("#invalid-id").text("");
        } else {
          $("#invalid-id").text("This ID is already in use");
        }
      });
    }
  });
  $("#Gender").keydown(function () {
    if ($("#Gender").val() == "")
      $("#invalid-gender").text("Please choose your gender");
    else $("#invalid-gender").text("");
  });
  $("#Gender").change(function () {
    if ($("#Gender").val() == "")
      $("#invalid-gender").text("Please choose your gender");
    else $("#invalid-gender").text("");
  });
  $("#Role").keydown(function () {
    if ($("#Role").val() == "")
      $("#invalid-role").text("Please choose your role");
    else $("#invalid-role").text("");
  });
  $("#Role").change(function () {
    if ($("#Role").val() == "")
      $("#invalid-role").text("Please choose your role");
    else $("#invalid-role").text("");
  });
});
//Submit Register
$(document).ready(function () {
  $("#registerButton").click(function () {
    if (validateForm()) {
      $("#registerModal").modal("show");
      var data = {
        FirstName: $("#FirstName").val().trim(),
        LastName: $("#LastName").val().trim(),
        Username: $("#Username").val().trim(),
        Email: $("#Email").val().trim(),
        Password: $("#Password").val().trim(),
        Tel: $("#Tel").val().trim(),
        NumberId: $("#NumberId").val().trim(),
        Gender: $("#Gender").val(),
        Role: $("#Role").val(),
      };
    }
    $.ajax({
      type: "POST",
      url: domain + "/api/Account/Register",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      datatype: "json",
      async: true,
      success: function (response) {
        if (response == "Success") {
          localStorage.setItem("registerUser", $("#Username").val().trim());
          $("#registerModal").modal("hide");
          $("#successModal").modal("show");
          setInterval(function () {
            if ($("#successModal").attr("aria-hidden")) {
              window.location.href = "index.html";
            }
          }, 500);
        }
      },
    });
  });
});
