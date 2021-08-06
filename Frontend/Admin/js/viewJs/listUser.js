var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
// get list seminar
function getList() {
  $.ajax({
    type: "GET",
    url: domain + "/api/User",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function (response) {
      response.forEach(function (user) {
        showUser(user);
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
function showUser(user) {
  $("#list-seminar tbody").append(
    "<tr>" +
      "<td>" +
      user.Username +
      "</td>" +
      "<td>" +
      user.FirstName  +
      "</td>" +
      "<td>" +
      user.LastName +
      "</td>" +
      "<td>" +
      user.Email +
      "</td>" +
      "<td>" +
      user.Role +
      "</td>" +
      '<td class="text-center">'+
      '<button type="button" class="btn btn-block btn-danger text-white" id="delete' +
      user.ID +
      '">Delete</button> ' +
      '</td>' +
      "</tr>"
  );
}
