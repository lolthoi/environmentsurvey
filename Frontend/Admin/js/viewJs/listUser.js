var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
// get list seminar

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
  $('#role').val('')
  ClearData();
  getList(pageNumber = 1);
  pagination(pageNumber = 1, totalPage );
})

function getTotalPage(response){
  totalPage = response;
}


function getList(pageNumber) {
  var dataSearch = {
    Search_key: $('#Search_key').val(),
    FromDate : $('#FromDate').val(),
    ToDate : $('#ToDate').val(),
    Role : $('#role :selected').val()
  }
  $.ajax({
    type: "POST",
    url: domain + "/api/User?PageNumber="+pageNumber+"&PageSize=6",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dataSearch),
		datatype:"json",
    async: false,
    success: function (response) {
      getTotalPage(response.TotalPage);
      if(response.ListUser.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="6" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.ListUser.forEach(function (user) {
        showUser(user);
      });
      $('#currentPage').html(response.PageNumber);
    },
  });
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
      title: "Delete User",
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
          url: domain + "/api/User/Delete/" + Id,
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
            getList(pageNumber = 1);
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
      '"><i class="fa fa-trash"></i></button> ' +
      '</td>' +
      "</tr>"
  );
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