var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
// get list faqs
function getList() {
  $.ajax({
    type: "GET",
    url: domain + "/api/FAQs",
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function (response) {
      response.forEach(function (faq) {
        showFAQs(faq);
      });
      $("#list-faqs")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          columnDefs: [
            { targets: [0, 1], width: "44%"}
          ],
          lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "All"],
          ],
          ordering: false,
        })
        .buttons()
        .container()
        .appendTo("#list-faqs_wrapper .col-md-6:eq(0)");
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
        title: "Delete FAQS",
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
            url: domain + "/api/FAQs/" + Id,
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
              $("#list-faqs").DataTable().clear().destroy();
              $("#list-faqs tbody").empty();
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
//show faqs
function showFAQs(faq) {
  $("#list-faqs tbody").append(
    "<tr>" +
      "<td>" +
      faq.Issue +
      "</td>" +
      "<td>" +
      faq.Solution +
      "</td>" +
      '<td><a href="edit-faqs.html?id=' +
      faq.ID +
      '" class="btn btn-block btn-warning">Edit</a> ' +
      '<button type="button" class="btn btn-block btn-danger text-white" id="delete' +
      faq.ID +
      '">Delete</button> ' +
      "</td>" +
      "</tr>"
  );
}
