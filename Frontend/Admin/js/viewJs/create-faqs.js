var domain = "https://localhost:44304";
$(document).ready(function () {
  function validateForm() {
    var flag = true;
    if ($("#Issue").val().trim() == "") {
      flag = false;
      $("#issue-valid").text("Issue can not be empty");
    } else {
      $("#issue-valid").text("");
    }
    if ($("#Solution").val().trim() == "") {
      flag = false;
      $("#solution-valid").text("Solution can not be empty");
    } else {
      $("#solution-valid").text("");
    }
    return flag;
  }
  $("#submit").click(function () {
    var check = validateForm();
    if (check) {
      swal.showLoading();
      var data = {
        Issue: $("#Issue").val(),
        Solution: $("#Solution").val(),
      };
      $.ajax({
        type: "POST",
        url: domain + "/api/FAQs",
        headers: {
          Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        datatype: "json",
        async: true,
        success: function (response) {
          sessionStorage.setItem("createResponse", response);
          window.location.replace("list-faqs.html");
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
            "Create Failed",
            "Something went wrong please try again",
            "error"
          );
        },
      });
    }
  });
});
