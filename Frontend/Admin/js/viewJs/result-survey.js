var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const surveyId = urlParams.get('id');

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
//   var dataSearch = {
//     Search_key: $('#Search_key').val(),
//     FromDate : $('#FromDate').val(),
//     ToDate : $('#ToDate').val(),
//     Role : "",
//     Status : $('#status').val()
//   }
  $.ajax({
    type: "GET",
    url: domain + "/api/Result/getResultBySurveyId?PageNumber="+pageNumber+"&PageSize=6&surveyId="+surveyId,
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    // data: JSON.stringify(dataSearch),
	// 	datatype:"json",
    async: false,
    success: function (response) {
      getTotalPage(response.TotalPage);
      if(response.listResult.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="7" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.listResult.forEach(function (model) {
        showSeminar(model);
      });
      $('#currentPage').html(response.PageNumber);
      $('#surveyName').html(response.listResult[0].surveyName);
    },
  });
}
//show seminar
function showSeminar(model) {
    $("#list-seminar tbody").append(
      "<tr>" +
        "<td>" +
        model.FullName +
        "</td>" +
        '<td class="text-center">' +
        model.SubmitTime +
        "</td>" +
        '<td class="text-center">' +
        model.point +
        "</td>" +
        '<td class="text-center">' +
        model.Ranked+
        "</td>" +
        "</tr>"
    )   
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
