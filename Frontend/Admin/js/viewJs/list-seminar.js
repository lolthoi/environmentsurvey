var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
// get list seminar
function getList() {
  $.ajax({
    type: "GET",
    url: domain + "/api/Seminar",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function (response) {
      response.forEach(function (seminar) {
        showSeminar(seminar);
      });
      $("#list-seminar")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: true,
          lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "All"],
          ],
          ordering: false,
        })
        .buttons()
        .container()
        .appendTo("#list-seminar_wrapper .col-md-6:eq(0)");
    },
  });
}
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
      title: "Delete Seminar",
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
          url: domain + "/api/Seminar/Delete/" + Id,
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
//show seminar
function showSeminar(seminar) {
  $("#list-seminar tbody").append(
    "<tr>" +
      "<td>" +
      seminar.Name +
      "</td>" +
      "<td>" +
      seminar.Location +
      "</td>" +
      "<td>" +
      seminar.Author +
      "</td>" +
      "<td>" +
      seminar.Subject +
      "</td>" +
      "<td>" +
      seminar.StartDate +
      "</td>" +
      "<td>" +
      seminar.EndDate +
      "</td>" +
      '<td><a href="edit-seminar.html?id=' +
      seminar.ID +
      '" class="btn btn-block btn-warning">Edit</a> ' +
      '<button type="button" class="btn btn-block btn-danger text-white" id="delete' +
      seminar.ID +
      '">Delete</button> ' +
      '<a href="../Client/seminar-single.html?id=' +
      seminar.ID +
      '&status=2" class="btn btn-block btn-info text-white" target="_blank">Detail</a></td>' +
      "</tr>"
  );
}
