var loadFile = function (event) {
		var image = document.getElementById('output');
		image.src = URL.createObjectURL(event.target.files[0]);
	};
//Check username exists
function checkUserExists() {
  var username = $("#username").val();
  $.ajax({
    type: "POST",
    url: "https://localhost:44304/api/User/checkUserExists?username=" + username,
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function(response) {
      $("#message_user").html(response);
    },
  });
}
//Check email exists
function checkEmailExists() {
  var email = $("#userEmail").val();
  $.ajax({
    type: "POST",
    url: "https://localhost:44304/api/User/checkEmailExists?email=" + email,
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function(response) {
      $("#message_email").html(response);
    },
  });
}
//Check tel exists
function checkTelExists() {
  var tel = $("#userTel").val();
  $.ajax({
    type: "POST",
    url: "https://localhost:44304/api/User/checkTelExists?tel=" + tel,
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function(response) {
      $("#message_tel").html(response);
    },
  });
}

//Check IDnumber exists
function checkIdNumberExists() {
  var idNum = $("#idNumber").val();
  $.ajax({
    type: "POST",
    url: "https://localhost:44304/api/User/checkIdNumberExists?idnum=" + idNum,
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function(response) {
      $("#message_number").html(response);
    },
  });
}
$(document).ready(function() {
  $("#username").keyup(function() {
    checkUserExists();
  });
  $("#userEmail").keyup(function() {
    checkEmailExists()
  });
  $("#idNumber").keyup(function() {
    checkIdNumberExists()
  });
  $("#userTel").keyup(function() {
    checkTelExists()
  });
});

//validation
function validateForm() {
  var username = $("#username").val();
  var userrepass = $("#retypePass").val();
  var userpass = $("#userPass").val();
  var userEmail = $("#userEmail").val();
  var userFirstname = $("#userFirstname").val();
  var userLastname = $("#userLastname").val();
  var userTel = $("#userTel").val();
  var message_number = $("#idNumber").val();
  var response = $("#message_user").text();
  var responseEmail = $('#message_email').text();
  var responseTel = $('#message_tel').text();
  var responseIdnumber = $('#message_number').text();
  var flag = true;
  if (username == "") {
    $("#message_user").html("User name can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (userpass == "") {
    $("#message_pass").html("Password can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (userrepass == "") {
    $("#message_repass").html("Confirm Password can not be empty");
    flag = false;
  }else{flag = true;return true;
  }
  if (userrepass != userpass) {
    $("#message_repass").html("Confirm Password not correct");
    flag = false;
  }else{
    flag = true;
  }
  if (userEmail == "") {
    $("#message_email").html("Email can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (userFirstname == "") {
    $("#message_fname").html("First name can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (userLastname == "") {
    $("#message_lname").html("Last name can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (userTel == "") {
    $("#message_tel").html("Tel can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (message_number == "") {
    $("#message_number").html("IDStudent can not be empty");
    flag = false;
  }else{
    flag = true;
  }
  if (response != null) {
    flag = false;
  }else{
    flag = true;
  }
  if(responseEmail != null){
    flag = flase;
  }else{
    flag = true;
  }
  if(responseTel != null){
    flag = flase;
  }else{
    flag = true;
  }
  if(responseIdnumber != null){
    flag = flase;
  }else{
    flag = true;
  }
  return flag;
}
var name1 = document.querySelector("#username");
var pass = document.querySelector("#userPass");
var repass = document.querySelector("#retypePass");
var fname = document.querySelector("#userFirstname");
var lname = document.querySelector("#userLastname");
var tel = document.querySelector("#userTel");
var number = document.querySelector("#idNumber");
var email = document.querySelector("#userEmail");
name1.oninput = function() {
  $("#message_user").html("");
};
pass.oninput = function() {
  $("#message_pass").html("");
};
repass.oninput = function() {
  $("#message_repass").html("");
};
email.oninput = function() {
  $("#message_email").html("");
};
fname.oninput = function() {
  $("#message_fname").html("");
};
lname.oninput = function() {
  $("#message_lname").html("");
};
tel.oninput = function() {
  $("#message_tel").html("");
};
number.oninput = function() {
  $("#message_number").html("");
};

//Create new account
$(document).ready(function() {
  $("#register").click(function() {
    var check = validateForm();
    console.log(check);
    var data = {
      Username: $("#username").val(),
      Password: $("#userPass").val(),
      NumberId: $("#idNumber").val(),
      Role: $("#userRole").val(),
      LastName: $("#userLastname").val(),
      FirstName: $("#userFirstname").val(),
      Email: $("#userEmail").val(),
      Tel: $("#userTel").val(),
      Address: $("#userAddress").val(),
      Gender: $("#userGender").val(),
      Status: 0,
    };
    if (check) {
      $.ajax({
        type: "POST",
        url: "https://localhost:44304/api/Account/Register",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        async: true,
        success: function(response) {
          if (response.succeeded == "Success") {
            window.location.href = "response.html";
          }
        },
      });
    }
  });
});
