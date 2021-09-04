var domain = "https://localhost:44304";
const regexTel = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
$(document).ready(function () {
    $.ajax({
        type : "GET",
        url: domain+"/api/SupportInfo/",
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(si){
            $("#Id").val(si.Id);
            $("#Company").val(si.Company);
            $("#CompanyTel").val(si.CompanyTel);
            $("#Address").val(si.Address);
            $("#Supporter").val(si.Supporter);
            $("#SupporterTel").val(si.SupporterTel);
        },      
        error: function (response) {
          console.log(response);
        } 
    })
    function validateForm() {
      var flag = true;
      if ($("#Company").val().trim() == "") {
        flag = false;
        $("#company-valid").text("Company name can not be empty");
      } else {
        $("#company-valid").text("");
      }
      if ($("#CompanyTel").val().trim() == "") {
        flag = false;
        $("#companytel-valid").text("Company Tel can not be empty");
      } else {
          if(!regexTel.test($('#CompanyTel').val().trim())){
              flag = false;
            $("#companytel-valid").text("Wrong phone format");
          }else{
            $("#companytel-valid").text("");
          }
      }
      if ($("#Address").val().trim() == "") {
        flag = false;
        $("#address-valid").text("Company Address can not be empty");
      } else {
        $("#address-valid").text("");
      }
      if ($("#Supporter").val().trim() == "") {
        flag = false;
        $("#supporter-valid").text("Supporter Name can not be empty");
      } else {
        $("#supporter-valid").text("");
      }
      if ($("#SupporterTel").val().trim() == "") {
        flag = false;
        $("#supportertel-valid").text("Supporter Tel can not be empty");
      } else {
        if(!regexTel.test($('#SupporterTel').val().trim())){
            flag = false;
          $("#supportertel-valid").text("Wrong phone format");
        }else{
          $("#supportertel-valid").text("");
        }
      }
      return flag;
    }
    $("#submit").click(function () {
        var check = validateForm();
        if (check) {
          swal.showLoading();
          var data = {
            Id: $("#Id").val(),
            Company: $("#Company").val(),
            CompanyTel: $("#CompanyTel").val(),
            Address: $("#Address").val(),
            Supporter: $("#Supporter").val(),
            SupporterTel: $("#SupporterTel").val(),
          };
          $.ajax({
            type: "PUT",
            url: domain + "/api/SupportInfo",
            headers: {
                Authorization: "Bearer " + token,
              },
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(data),
              datatype: "json",
              async: true,
            success: function (response) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "btn btn-success",
                      cancelButton: "btn btn-danger mr-3",
                    },
                    buttonsStyling: false,
                  });
                  swalWithBootstrapButtons.fire("Edit Success", "", "success");
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