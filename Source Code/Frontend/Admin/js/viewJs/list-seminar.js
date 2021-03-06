var domain = "https://localhost:44304";
var role = sessionStorage.getItem("role");
var username = sessionStorage.getItem("username");
var token = sessionStorage.getItem("token");

var totalPage = '';

$(document).ready(function(){
  getList(pageNumber = 1);
  pagination(pageNumber = 1, totalPage );
})

$('#submit').click(function(){
  ClearData();
  getList(pageNumber = 1);
  pagination(pageNumber = 1, totalPage );
})

$('#reset').click(function(){
  $('#Search_key').val('');
  $('#FromDate').val('');
  $('#ToDate').val('');
  $('#status').val(0);
  $('#forUser').val(""),
  ClearData();
  getList(pageNumber = 1);
  pagination(pageNumber = 1, totalPage );
})

function getTotalPage(response){
  totalPage = response;
}

// get list seminar
function getList(pageNumber) {
  var dataSearch = {
    Search_key: $('#Search_key').val(),
    FromDate : $('#FromDate').val(),
    ToDate : $('#ToDate').val(),
    Role : $('#forUser').val(),
    Status : $('#status').val()
  }
  $.ajax({
    type: "POST",
    url: domain + "/api/Seminar?PageNumber="+pageNumber+"&PageSize=6",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dataSearch),
		datatype:"json",
    async: false,
    success: function (response) {
      getTotalPage(response.TotalPage);
      if(response.ListData.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="7" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.ListData.forEach(function (seminar) {
        showSeminar(seminar);
      });
      $('#currentPage').html(response.PageNumber);
    },
  });
}
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
            getList(pageNumber=1);
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
  var dtnow =  new Date();
  var endDate =  new Date(seminar.EndDate);
  if(dtnow >= endDate){
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
        seminar.Subject.Subject+
        "</td>" +
        "<td>" +
        seminar.StartDate +
        "</td>" +
        "<td>" +
        seminar.EndDate +
        "</td>" +
        '<td class="text-center">' +
        '<a href="user_seminar.html?id='+seminar.ID+'" title="View List Registered">'+seminar.TotalRequestAccept+'</a>'+
        "</td>" +
        '<td>'+
        '<button title="Delete Seminar" type="button" class="btn btn-block btn-danger text-white" id="delete' +
        seminar.ID +
        '"><i class="fa fa-trash"></i></button> ' +
        '<a href="InforSeminar.html?id=' +
        seminar.ID +
        '" class="btn btn-block btn-info text-white" title="View detail"><i class=" ti-book"></i></a></td>' +
        "</tr>"
    );
  }else{
    
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
        seminar.Subject.Subject+
        "</td>" +
        "<td>" +
        seminar.StartDate +
        "</td>" +
        "<td>" +
        seminar.EndDate +
        "</td>" +
        '<td class="text-center">' +
        '<a href="user_seminar.html?id='+seminar.ID+'" title="View List Registered">'+seminar.TotalRequestAccept+'</a>'+
        "</td>" +
        '<td><a href="edit-seminar.html?id=' +
        seminar.ID +
        '" class="btn btn-block btn-warning" title="Edit Seminar"><i class=" ti-pencil"></i></a> ' +
        '<button title="Delete Seminar" type="button" class="btn btn-block btn-danger text-white" id="delete' +
        seminar.ID +
        '"><i class="fa fa-trash"></i></button> ' +
        '<a href="list-survey.html?seminarId='+seminar.ID +
        '" class="btn btn-block btn-info text-white" title="List Surveys"><i class="fas fa-list"></i></a> ' +
        '<a href="InforSeminar.html?id=' +
        seminar.ID +
        '&status=" class="btn btn-block btn-info text-white" title="View detail" ><i class=" ti-book"></i></a></td>' +
        "</tr>"
    );
  }
}

function ClearData(){
  $("#list-seminar tbody").empty();
}

//pagination
function pagination(pageNumber = 1, totalPage){
	$('#currentPage').html(pageNumber);
	if(pageNumber == totalPage){
		$('#nextPage').addClass('disableLink');
	}
	if(pageNumber == 1){
		$('#previousPage').addClass('disableLink');
	}	
	$('#nextPage').click(function(){
		pageNumber++
		ClearData()
		if(pageNumber <= totalPage){
			getList(pageNumber);	
			if(pageNumber == totalPage){
				$(this).addClass('disableLink');
				$('#previousPage').removeClass('disableLink');
			}
		}			
	});
	$('#previousPage').click(function(){
		pageNumber--;
		ClearData();
		if(pageNumber >= 1){
			getList(pageNumber);	
			if(pageNumber <= 1){
				$(this).addClass('disableLink');
				$('#nextPage').removeClass('disableLink');
			}
		}
	})
}
