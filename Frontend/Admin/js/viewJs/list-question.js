var domen = "https://localhost:44304";
var token = localStorage.getItem("token");

$(document).ready(function(){
    getList();
})

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
            url: domain + "/api/Question/" + Id,
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
              $("#list-seminar").DataTable().clear().destroy();
              $("#list-seminar tbody").empty();
              getList();
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

function getList(){
    $.ajax({
        type: "GET",
        url: domen+"/api/Question",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            console.log(response);
            showList(response);
        },
    });
}

function addRowData(Id, No, Question){
    $("#listQuestionTbody").append(
        '<tr>'
            +'<td>'+No+'</td>'
            +'<td>'+Question+'</td>'
            +'<td>'
                +'<a href="add-question.html?questionId='+Id+'" class="btn btn-block btn-warning"><i class=" ti-pencil"></i></a>  '
                +'<button type="button" class="btn btn-block btn-danger text-white" id="delete'+Id+'"><i class="fa fa-trash"></i></button>'
            +'</td>'
        +'</tr>'
    )
}

function showList(list){
    $("#listQuestionTbody").html("");
    for(var i=0; i<list.length; i++){
        addRowData(list[i].Id, i+1, list[i].Question);
    }
}