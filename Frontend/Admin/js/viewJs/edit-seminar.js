var domain = "https://localhost:44304";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const regexDateTime = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;

var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhy6m4jwi/upload";
var CLOUDINARY_UPLOAD_PRESET = "qoyyunmj"
var loadFile = function (event) {
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
      var image = document.getElementById("preview");
      image.src = URL.createObjectURL(event.target.files[0]);
      $('#ImagePath').val(res.data.secure_url+ "-"+res.data.public_id);
    }).catch(function(err){
      $("#image-valid").text("Choose Image error, try again");
    });
};
$(document).ready(function () {
    loadSubject();
    $.ajax({
        type : "GET",
        url: domain+"/api/Seminar/Manage/"+id,
        contentType: "application/json; charset=utf-8",
        async:true,
        headers: {
          Authorization: "Bearer " + token,
        },
        success : function(seminar){
            $("#Id").val(id);
            $("#Name").val(seminar.Name);
            $("#Author").val(seminar.Author);
            $("#Location").val(seminar.Location);
            $("#StartTime").val(seminar.StartDate);
            $("#EndTime").val(seminar.EndDate);
            $("#preview").attr("src",seminar.Image.split("-")[0]);
            $("#Description").val(seminar.Description);
            $("input[name=forUser][value="+seminar.forUser+"]").prop("checked",true);
            $("#SubjectId option[value="+seminar.SubjectId+"]").prop("selected",true);
            loadSubject(seminar.Subject);
        },      
        error: function (response) {
          window.location.replace("list-seminar.html");
        } 
    })
    $("#StartTime").datetimepicker({
      format: "Y-m-d H:m:s",
      changeMonth: true,
      changeYear: true,
      minDate: 0,
    });
    $("#EndTime").datetimepicker({
      format: "Y-m-d H:m:s",
      changeMonth: true,
      changeYear: true,
      minDate: 0,
    });
    function validateForm() {
      var flag = true;
      if ($("#Name").val().trim() == "") {
        flag = false;
        $("#name-valid").text("Seminar Name can not be empty");
      } else {
        $("#name-valid").text("");
      }
      if ($("#Author").val().trim() == "") {
        flag = false;
        $("#author-valid").text("Author name can not be empty");
      } else {
        $("#author-valid").text("");
      }
      if ($("#SubjectId").val().trim() == "") {
        flag = false;
        $("#subject-valid").text("Subject can not be empty");
      } else {
        $("#subject-valid").text("");
      }
      if ($("#Location").val().trim() == "") {
        flag = false;
        $("#location-valid").text("Location can not be empty");
      } else {
        $("#location-valid").text("");
      }
      if ($("#StartTime").val().trim() == "") {
        flag = false;
        $("#st-valid").text("Start Time can not be empty");
      } else {
        if (!regexDateTime.test($("#StartTime").val().trim())) {
          flag = false;
          $("#st-valid").text("Wrong date time format");
        } else {
          $("#st-valid").text("");
        }
      }
      if ($("#EndTime").val().trim() == "") {
        flag = false;
        $("#et-valid").html("End Time can not be empty");
      } else {
        if (!regexDateTime.test($("#EndTime").val().trim())) {
          flag = false;
          $("#et-valid").text("Wrong date time format");
        } else {
          $("#et-valid").text("");
        }
      }
      if (
        $("#StartTime").val().trim() != "" &&
        $("#EndTime").val().trim() != ""
      ) {
        if (
          new Date($("#StartTime").val().trim()) >
          new Date($("#EndTime").val().trim())
        ) {
          flag = false;
          $("#st-valid").text("Start time must be earlier than end time");
          $("#et-valid").text("End time must be later than start time");
        } else {
          $("#st-valid").text("");
          $("#et-valid").text("");
        }
      }
      if ($('input[type=radio][name=forUser]:checked').length == 0) {
        flag = false;
        $("#forUser-valid").text("For User can not be empty");
      } else {
        if (
          $('input[type=radio][name=forUser]:checked').val() != "1" &&
          $('input[type=radio][name=forUser]:checked').val() != "2"
        ) {
          flag = false;
          $("#forUser-valid").text("Wrong value format");
        } else {
          $("#forUser-valid").text("");
        }
      }
      if ($("#Image").val() != "") {
        var allowed = [".jpg", ".png", ".gif", ".jpeg"];
        var imageUpload = $("#Image")[0];
        var regexImage = new RegExp(
          "([a-zA-Z0-9s_\\.-:])+(" + allowed.join("|") + ")$"
        );
        if (!regexImage.test(imageUpload.value.toLowerCase())) {
          $("#image-valid").text("Wrong image format");
          flag = false;
        } else {
          $("#image-valid").text("");
        }
      }
      if ($("#Description").val().trim() == "") {
        flag = false;
        $("#description-valid").text("Description can not be empty");
      } else {
        $("#description-valid").text("");
      }
      return flag;
    }
    $("#submit").click(function () {
        var check = validateForm();
        if (check) {
          swal.showLoading();
          var form = new FormData($("#editForm")[0]);
          $.ajax({
            type: "PUT",
            url: domain + "/api/Seminar/Update",
            headers: {
              Authorization: "Bearer " + token,
            },
            dataType: "text",
            data: form,
            processData: false,
            contentType: false,
            async: true,
            success: function (response) {
              sessionStorage.setItem('editResponse', response);
              window.location.replace("list-seminar.html");
            },
            error: function (response) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger mr-3",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons.fire(
                "Edit Failed",
                "Something went wrong please try again",
                "error"
              );
            },
          });
        }
      });
});

function loadSubject(name){
  $.ajax({
    type: "GET",
    url: domain + "/api/Subject",
    headers: {
      Authorization: "Bearer " + token,
    },
    async: true,
    success: function (response) {
      response.forEach(function(subject) {
        if(subject.Subject == name){
          $('#SubjectId').append(`<option selected value="${subject.Id}">
                                       ${subject.Subject}
                                  </option>`);
        } else {
          $('#SubjectId').append(`<option value="${subject.Id}">
                                       ${subject.Subject}
                                  </option>`);
        }
        
      });
    },
  });
}