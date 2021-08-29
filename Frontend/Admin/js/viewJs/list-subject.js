var domain = "https://localhost:44304";
var token = localStorage.getItem("token");
var tempList = null;

$(document).ready(function(){
    getList();

    if (sessionStorage.getItem("createResponse") == "Success") {
      sessionStorage.removeItem("createResponse");
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger mr-3",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire("Create Success", "", "success");
    } 
  
    if (sessionStorage.getItem("editResponse") == "Success") {
      sessionStorage.removeItem("editResponse");
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger mr-3",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire("Edit Success", "", "success");
    }
})

function getList(){
    $.ajax({
        type: "GET",
        url: domain+"/api/Subject",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            tempList = response;
            showList(tempList);
        },
    });
}

function showList(list){
    $("#listSubjectTbody").html("");
    for(var i=0; i<list.length; i++){
      var No = i+1;
        $("#listSubjectTbody").append(
            '<tr>'
                +'<td>'+No+'</td>'
                +'<td>'+list[i].Subject+'</td>'
                +'<td>'
                    +'<a href="add-subject.html?subjectId='+list[i].Id+'" class="btn btn-block btn-warning"><i class=" ti-pencil"></i></a>  '
                    +'<button type="button" class="btn btn-block btn-danger text-white" id="delete'+list[i].Id+'"><i class="fa fa-trash"></i></button>'
                +'</td>'
            +'</tr>'
        )
    }
}

$(document).on("click", 'button[id^="delete"]', function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Delete Question",
        text: "Are you sure to delete this record?",
        icon: "warning",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.showLoading();
          Id = this.id.replace("delete", "");
          $.ajax({
            type: "DELETE",
            url: domain + "/api/Subject/" + Id,
            headers: {
              Authorization: "Bearer " + token,
            },
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (response) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger mr-3",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons.fire("Delete Success", "", "success");
              var subjectId = Number.parseInt(Id);
              for(var i=0; i<tempList.length; i++){
                if(tempList[i].Id === subjectId){
                    tempList.splice(i,1);
                }
              }
              showList(tempList);
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
                "Delete Failed",
                "Something went wrong please try again later",
                "error"
              );
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  });

  