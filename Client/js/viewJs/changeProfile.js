
var domen = "https://localhost:44304";

var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
//Get data to edit
$(document).ready(function() {
    
    var data = {
        Username : username       
    }
    $.ajax({
        type : "POST",
        url: domen+"/api/User/searchByUsername",
        headers: {
            Authorization: 'Bearer '+token
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        datatype:"json",
        async:true,
        success : function(response){
            $('#userEmail').val(response.Email);
            $("#userLastname").val(response.LastName);
            $("#userFirstname").val(response.FirstName);
            $('#userTel').val(response.Tel);
            $('#userAddress').val(response.Address);
            $('#userId').val(response.ID);
            console.log(JSON.stringify(response))
            var gender = response.Gender;
            if(gender == 0){
                $("#userGender").val(gender).find("option[value=" + gender +"]").attr('selected', true);
            }else if(gender == 1){              
                $("#userGender").val(gender).find("option[value=" + gender +"]").attr('selected', true);
            }
            $('#output').attr("src", domen+'/'+response.Image);
        },       
    })

  });






var loadFile = function (event) {
		var image = document.getElementById('output');
		image.src = URL.createObjectURL(event.target.files[0]);
	};

//Check email exists
function checkEmailExists() {
  var email = $("#userEmail").val();
  $.ajax({
    type: "POST",
    url: domen+"/api/User/checkEmailExists?email=" + email,
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
    url: domen+"/api/User/checkTelExists?tel=" + tel,
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function(response) {
      $("#message_tel").html(response);
    },
  });
}
$(document).ready(function() {
  $("#userEmail").keyup(function() {
    checkEmailExists()
  });
  $("#userTel").keyup(function() {
    checkTelExists()
  });
});

//validation
function validateForm() {

  var userEmail = $("#userEmail").val();
  var userFirstname = $("#userFirstname").val();
  var userLastname = $("#userLastname").val();
  var userTel = $("#userTel").val();
  var responseEmail = $('#message_email').text();
  var responseTel = $('#message_tel').text();

  var flag = true;
  
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
  if(responseEmail != ""){
    flag = false;
  }else{
    flag = true;
  }
  if(responseTel != ""){
    flag = false;
  }else{
    flag = true;
  }
  return flag;
}

var fname = document.querySelector("#userFirstname");
var lname = document.querySelector("#userLastname");
var tel = document.querySelector("#userTel");
var email = document.querySelector("#userEmail");

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


//update profile
$(document).ready(function() {
  $("#update").click(function() {
    console.log("click update")
    var check = validateForm();
    if (check){
      var form = new FormData($("#updateProfileForm")[0]);
      $.ajax({
        type: "PUT",
        url: domen+"/api/User/changeProfile",
        headers: {
            Authorization: 'Bearer '+token
        },
        dataType: 'text',
        data: form,
        processData: false,
        contentType: false,
        async: true,
        success: function(response) {
            console.log(response)
          if (response == "Update Success") {
            window.location.href = "response.html";
          }
        },
      });
    }
    
  });
  
});
