var domain = "https://localhost:44304";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
$(document).ready(function () {
    $.ajax({
        type : "GET",
        url: domain+"/api/FAQs/"+id,
        contentType: "application/json; charset=utf-8",
        async:true,
        headers: {
            Authorization: "Bearer " + token,
          },
        success : function(faq){
            $("#Id").val(id);
            $("#Issue").val(faq.Issue);
            $("#Solution").val(faq.Solution);
        },      
        error: function (response) {
          console.log(response);
        } 
    })
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
            ID: $("#Id").val(),
            Issue: $("#Issue").val(),
            Solution: $("#Solution").val(),
          };
          $.ajax({
            type: "PUT",
            url: domain + "/api/FAQs",
            headers: {
                Authorization: "Bearer " + token,
              },
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(data),
              datatype: "json",
              async: true,
            success: function (response) {
              sessionStorage.setItem('editResponse', response);
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
                "Edit Failed",
                "Something went wrong please try again",
                "error"
              );
            },
          });
        }
      });
});