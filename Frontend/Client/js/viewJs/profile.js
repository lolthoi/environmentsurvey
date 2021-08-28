var domain = "https://localhost:44304";
var token = localStorage.getItem("token");
var username = localStorage.getItem("username");
var allowed = [".jpg", ".png", ".gif", ".jpeg", ".jfif"];
var regexImage = new RegExp(
  "([a-zA-Z0-9s_\\.-:()])+(" + allowed.join("|") + ")$"
);
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhy6m4jwi/upload";
var CLOUDINARY_UPLOAD_PRESET = "qoyyunmj"
//Get Profile
$(document).ready(function () {
  var data = {
    Username: username,
  };
  $.ajax({
    type: "POST",
    url: domain + "/api/User/searchByUsername",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    datatype: "json",
    async: true,
    success: function (response) {
      $("#user-img").attr("src", response.Image.split("-")[0]);
      $("#old-img").text(response.Image.split("-")[0]);
      $("#user-name").text(response.FirstName + " " + response.LastName);
      $("#NumberId").text(response.NumberId);
      $("#Email").text(response.Email);
      $("#LastName").val(response.LastName);
      $("#FirstName").val(response.FirstName);
      $("#Tel").text(response.Tel);
      $("#Address").val(response.Address);
      $("#ID1").val(response.ID);
      $("#ID2").val(response.ID);
      $("#ID3").val(response.ID);
      var gender = response.Gender;
      if (gender == 0) {
        $("#Gender")
          .val(gender)
          .find("option[value=" + gender + "]")
          .attr("selected", true);
      } else if (gender == 1) {
        $("#Gender")
          .val(gender)
          .find("option[value=" + gender + "]")
          .attr("selected", true);
      }
    },
  });
});
//Preview Avatar
var loadFile = function (event) {
  var flag = true;
  var image = document.getElementById("user-img");
  if ($("#File").val() == "") {
    flag = false;
  } else {
    var imageUpload = $("#File")[0];
    if (!regexImage.test(imageUpload.value.toLowerCase())) flag = false;
  }
  if (flag) {
    $("#registerModal").modal("show");
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET );
    axios({
      url:CLOUDINARY_URL,
      method: 'POST',
      headers :{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(function(res){
      $("#registerModal").modal("hide");
      $('#ImagePath').val(res.data.secure_url+ "-"+res.data.public_id);
      image.src = URL.createObjectURL(event.target.files[0]);
    }).catch(function(err){
      $("#invalid-file").text("Choose Image error, try again");
    });

  } else {
    image.src = $("#old-img").text();
  }
};
//Prevent Submit Function
function validateProfileForm() {
  if (
    $("#FirstName").val().trim() != "" &&
    $("#LastName").val().trim() != "" &&
    $("#Address").val().trim() != "" &&
    $("#Gender").val() != ""
  )
    return true;
  return false;
}
function validateAvatarForm() {
  if (
    $("#File").val() != "" &&
    regexImage.test($("#File")[0].value.toLowerCase())
  )
    return true;
  return false;
}
function validatePasswordForm() {
  if (
    $("#OldPassword").val().trim() != "" &&
    $("#NewPassword").val().trim() != "" &&
    passRegex.test($("#NewPassword").val().trim()) &&
    $("#ConfirmPassword").val().trim() != "" &&
    $("#ConfirmPassword").val().trim() == $("#NewPassword").val().trim()
  )
    return true;
  return false;
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
  $("#Address").keyup(function () {
    if ($("#Address").val().trim() == "")
      $("#invalid-address").text("Please enter your address");
    else {
      $("#invalid-address").text("");
    }
  });
  $("#Address").keydown(function () {
    if ($("#Address").val().trim() == "")
      $("#invalid-address").text("Please enter your address");
    else {
      $("#invalid-address").text("");
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
  $("#File").change(function () {
    if ($("#File").val() == "") {
      $("#invalid-file").text("Please select image");
    } else {
      var imageUpload = $("#File")[0];
      if (!regexImage.test(imageUpload.value.toLowerCase()))
        $("#invalid-file").text("Invalid image type");
      else $("#invalid-file").text("");
    }
  });
  $("#OldPassword").keyup(function () {
    if ($("#OldPassword").val().trim() == "")
      $("#invalid-old-password").text("Please input old password");
    else {
      $("#invalid-old-password").text("");
    }
  });
  $("#OldPassword").keydown(function () {
    if ($("#OldPassword").val().trim() == "")
      $("#invalid-old-password").text("Please input old password");
    else {
      $("#invalid-old-password").text("");
    }
  });
  $("#NewPassword").keyup(function () {
    if ($("#NewPassword").val().trim() == "")
      $("#invalid-new-password").text("Please input new password");
    else {
      if(!passRegex.test($("#NewPassword").val().trim())){
        $("#invalid-new-password").text("Minimum eight characters, at least one letter and one number");
      }else{
        $("#invalid-new-password").text("");
      }
    }
  });
  $("#NewPassword").keydown(function () {
    if ($("#NewPassword").val().trim() == "")
      $("#invalid-new-password").text("Please input new password");
    else {
      if(!passRegex.test($("#NewPassword").val().trim())){
        $("#invalid-new-password").text("Minimum eight characters, at least one letter and one number");
      }else{
        $("#invalid-new-password").text("");
      }
    }
  });
  $("#ConfirmPassword").keyup(function () {
    if ($("#ConfirmPassword").val().trim() == "")
      $("#invalid-confirm-password").text("Please input confirm password");
    else {
      if ($("#ConfirmPassword").val().trim() !== $("#NewPassword").val().trim())
        $("#invalid-confirm-password").text(
          "The password confirmation does not match"
        );
      else $("#invalid-confirm-password").text("");
    }
  });
  $("#ConfirmPassword").keydown(function () {
    if ($("#ConfirmPassword").val().trim() == "")
      $("#invalid-confirm-password").text("Please input confirm password");
    else {
      if ($("#ConfirmPassword").val().trim() !== $("#NewPassword").val().trim())
        $("#invalid-confirm-password").text(
          "The password confirmation does not match"
        );
      else $("#invalid-confirm-password").text("");
    }
  });
});
//Submit Change
$("#profileButton").click(function () {
  if (validateProfileForm()) {
    var data = {
      ID: $("#ID1").val(),
      FirstName: $("#FirstName").val(),
      LastName: $("#LastName").val(),
      Address: $("#Address").val(),
      Gender: $("#Gender").val()
    };
    $.ajax({
      type: "PUT",
      url: domain + "/api/User/changeProfile",
      headers: {
        Authorization: "Bearer " + token,
      },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      datatype: "json",
      async: true,
      success: function (response) {
        if (response == "Success") {
          showPopup("Change profile success");
          $("#profile-error").text("");
          $("#user-name").text($("#FirstName").val().trim() + " " + $("#LastName").val().trim());
        } else {
          $("#profile-error").text("Change profile failed. Please try again!");
        }
      },
    });
  }
});
$("#avatarButton").click(function () {
  if (validateAvatarForm()) {
    var form = new FormData($("#avatarForm")[0]);
    $.ajax({
      type: "PUT",
      url: domain + "/api/User/changeAvatar",
      headers: {
        Authorization: "Bearer " + token,
      },
      dataType: "text",
      data: form,
      processData: false,
      contentType: false,
      async: true,
      success: function (response) {
        if (response == "Success") {
          showPopup("Change avatar success");
          $("#avatar-error").text("");
        } else {
          $("#avatar-error").text("Change avatar failed. Please try again!");
        }
      },
    });
  }
});
$("#passwordButton").click(function () {
    if(validatePasswordForm()){
        var data = {
            Username: username,
            OldPassword: $('#OldPassword').val(),
            NewPassword: $('#NewPassword').val()
          };
          $.ajax({
            type : "POST",
            url: domain+"/api/Account/ChangePassword",
            headers: {Authorization: 'Bearer '+ token},
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success : function(response){
                if (response == "Success") {
                    showPopup("Change password success");
                    $("#password-error").text("");
                    $('#passwordForm').trigger("reset");
                  } else {
                    $("#password-error").text("The old password you have entered is incorrect");
                  }
            }
        })
    }
});
//Pop up
function showPopup(text) {
  $("#popupname").text(text);
  $("#myForm").addClass("d-block");
  setTimeout(function () {
    $("#myForm").removeClass("d-block").addClass("d-none");
  }, 1000);
}
