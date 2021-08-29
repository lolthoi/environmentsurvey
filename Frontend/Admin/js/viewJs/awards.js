var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");

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
    var key = 0
    if($('#Search_key').val() != ""){
        key = $('#Search_key').val();
    }
    var dataSearch = {
        TimeOrPoint: key,
    }
	$.ajax({
		type : "POST",
		url: domain+"/api/Result/top3Result?PageNumber="+pageNumber+"&PageSize=6",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(dataSearch),
		datatype:"json",
		async:false,
		success : function(response){	
            getTotalPage(response.TotalPage);
			response.listResult.forEach(function(result){
				showTopStudent(result)
			});
		},       
	})
}


//show seminar
function showTopStudent(result) {
    $("#list-seminar tbody").append(
      "<tr>" +
        "<td>" +
        result.surveyName +
        "</td>" +
        "<td>" +
        result.FullName +
        "</td>" +
        '<td class="text-center">' +
        result.SubmitTime +
        "</td>" +
        '<td class="text-center">' +
        result.point+
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
