var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");

$(document).ready(function () {
  // get list seminar
  $.ajax({
    type: "GET",
    url: domain + "/api/Smn",
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
});
//show seminar
function showSeminar(seminar){
	$("#list-seminar tbody").append(
        '<tr>'
            + '<td>' + seminar.Name + '</td>'
            + '<td>' + seminar.Location + '</td>'
            + '<td>' + seminar.Author + '</td>'
            + '<td>' + seminar.Subject + '</td>'
            + '<td>' + seminar.StartDate + '</td>'
            + '<td>' + seminar.EndDate + '</td>'
            + '<td><button type="button" class="btn btn-block btn-warning">Edit</button> <button type="button" class="btn btn-block btn-danger text-white">Delete</button> <button type="button" class="btn btn-block btn-info text-white">Detail</button></td>'
        +'</tr>'
    );
}