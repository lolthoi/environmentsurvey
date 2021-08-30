
var domain = "https://localhost:44304";
var role = sessionStorage.getItem("role");
var username = sessionStorage.getItem("username");
var token = sessionStorage.getItem("token");

var token = sessionStorage.getItem("token");
var url_string = window.location + "";
var url = new URL(url_string);
var seminarId = url.searchParams.get("id");

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
  }
  $.ajax({
    type: "POST",
    url: domain + "/api/UserSeminar/getUserSeminarRegistered?PageNumber="+pageNumber+"&PageSize=6&SeminarId="+seminarId+"",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(dataSearch),
		datatype:"json",
    async: false,
    success: function (response) {
      getTotalPage(response.TotalPage);
      if(response.ListUserSeminar.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="7" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.ListUserSeminar.forEach(function (seminar) {
        showUserSeminar(seminar);
      });
      $('#currentPage').html(response.PageNumber);
      $('#title').html(response.ListUserSeminar[0].seminarName);
    },
  });
}





//show seminar
function showUserSeminar(userSeminar) {
  $("#list-seminar tbody").append(
    "<tr>" +
      "<td>" +
      userSeminar.UserName +
      "</td>" +
      "<td>" +
      userSeminar.FirstName +
      "</td>" +
      "<td>" +
      userSeminar.LastName +
      "</td>" +
      "<td>" +
      userSeminar.UserNumberId +
      "</td>"+
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