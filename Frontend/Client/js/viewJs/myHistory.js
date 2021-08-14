var domen = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");

var totalPage = '';

$(document).ready(function(){
  getList(pageNumber = 1);
  pagination(pageNumber = 1, totalPage );
})

// $('#submit').click(function(){
//   ClearData();
//   getList(pageNumber = 1);
//   pagination(pageNumber = 1, totalPage );
// })

// $('#reset').click(function(){
//   $('#Search_key').val('');
//   $('#FromDate').val('');
//   $('#ToDate').val('');
//   Status : $('#status').val(0)
//   ClearData();
//   getList(pageNumber = 1);
//   pagination(pageNumber = 1, totalPage );
// })

function getTotalPage(response){
  totalPage = response;
}
// get list seminar
function getList(pageNumber) {
  $.ajax({
    type: "GET",
    url: domen + "/api/Result/getUserResult?PageNumber="+pageNumber+"&PageSize=6&userId="+userId,
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    async: false,
    success: function (response) {
      getTotalPage(response.TotalPage);
      if(response.listResult.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="7" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.listResult.forEach(function (result) {
        showHistory(result);
      });
      $('#currentPage').html(response.PageNumber);
    },
  });
}

//show seminar
function showHistory(result) {
  $("#list-seminar tbody").append(
    "<tr>" +
      "<td>" +
      result.surveyName +
      "</td>" +
      "<td>" +
      result.SubmitTime +
      "</td>" +
      "<td>" +
      result.point+
      "</td>" +
      "<td>" +
      result.Ranked +
      "</td>" +
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