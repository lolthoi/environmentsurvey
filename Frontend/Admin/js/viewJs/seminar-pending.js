// var domen = "https://localhost:44304";
// var tempList = null;

// $(document).ready(function(){
//     $.ajax({
//         type: "GET",
//         url: domen+"/api/UserSeminar/getAllSeminarPending",
//         contentType: "application/json; charset=utf-8",
//         datatype:"json",
//         async: true,
//         success: function(response) {
//             tempList = response;
//             showListPending(response);
//         },
//     });

//     $("#listSeminarTbody").on("change",".actionSelect", function(){
        
//         var selectId = event.target.id;
//         var userSeminarIdString = selectId.substring(selectId.indexOf("select")+6);
//         var optionString = $(this).val();
//         var userSeminarId = Number.parseInt(userSeminarIdString);
//         var option = Number.parseInt(optionString);

//         changeStatus(userSeminarId, option);
        
//     });
// })

// function addRowData(No, Id, SeminarName, UserName, NumberId){
//     $("#listSeminarTbody").append(
//         '<tr>'
//             +'<td>'+No+'</td>'
//             +'<td>'+SeminarName+'</td>'
//             +'<td>'+UserName+'</td>'
//             +'<td>'+NumberId+'</td>'
//             +'<td>'
//                 +'<select id="select'+Id+'" class="form-select actionSelect">'
//                     +'<option selected>Option</option>'
//                     +'<option value="1">Accept</option>'
//                     +'<option value="2">Denided</option>'
//                 +'</select>'
//             +'</td>'
//         +'</tr>'
//     )
// }

// function removeObject(userSeminarId){
//     for(var i=0; i<tempList.length; i++){
//         if(tempList[i].UserSeminarId === userSeminarId){
//             tempList.splice(i,1);
//         }
//     }
// }

// function showListPending(list){
//     $("#listSeminarTbody").html("");
//     for(var i=0; i<list.length; i++){
//         addRowData(i+1, list[i].UserSeminarId, list[i].seminarName, list[i].UserName, list[i].UserNumberId);
//     }
// }

//  function changeStatus(usId, op){
//     $('#registerModal').modal('show');
//     var data = {
//         userSeminarId : usId,
//         option : op
//     }

//     $.ajax({
//         type: "POST",
//         url: domen+"/api/UserSeminar/changeUserSeminarStatus",
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(data),
//         async: true,
//         success: function(response) {
//             if(response === "success"){
//                 removeObject(usId);
//                 console.log(tempList);
//                 showListPending(tempList);
//                 $('#registerModal').modal('hide');
//             } else {
//                 $('#registerModal').modal('hide');
//             }
//         },
//     });
//  }




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
  var dataSearch = {
    Search_key: $('#Search_key').val(),
  }
  $.ajax({
    type: "POST",
    url: domain + "/api/UserSeminar/getAllSeminarPending?PageNumber="+pageNumber+"&PageSize=6",
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
    },
  });
}

$(document).on("click", 'button[id^="decline"]', function () {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Decline Request Register Seminar",
      text: "Are you sure to decline this person?",
      icon: "warning",
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $('#registerModal').modal('show');
        Id = this.id.replace("decline", "");
        var data = {
          UserSeminarId : Id,
          Option : 3
        }
        $.ajax({
          type: "POST",
          url: domain + "/api/UserSeminar/changeUserSeminarStatus",
          headers: {
            Authorization: "Bearer " + token,
          },
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
			    datatype:"json",
          async: true,
          success: function (response) {
            $('#registerModal').modal('hide');
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger mr-3",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons.fire("Decline Success", "", "success");
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
              "Decline Failed",
              "Something went wrong please try again later",
              "error"
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
});

$(document).on("click", 'button[id^="accept"]', function () {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Accept Request Register Seminar",
      text: "Are you sure to accept this person?",
      icon: "warning",
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $('#registerModal').modal('show');
        Id = this.id.replace("accept", "");
        var data = {
          UserSeminarId : Id,
          Option : 1
        }
        $.ajax({
          type: "POST",
          url: domain + "/api/UserSeminar/changeUserSeminarStatus",
          headers: {
            Authorization: "Bearer " + token,
          },
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
			    datatype:"json",
          async: true,
          success: function (response) {
            $('#registerModal').modal('hide');
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger mr-3",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons.fire("Accept Success", "", "success");
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
              "Accept Failed",
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
function showUserSeminar(userSeminar) {
  $("#list-seminar tbody").append(
    "<tr>" +
      "<td>" +
      userSeminar.seminarName +
      "</td>" +
      "<td>" +
      userSeminar.UserName +
      "</td>" +
      "<td>" +
      userSeminar.FullName +
      "</td>" +
      "<td>" +
      userSeminar.UserNumberId +
      "</td>"+
      '<td>' +
      '<button type="button" class="btn btn-block btn-primary text-white" id="accept' +
      userSeminar.UserSeminarId +
      '"><i class="ti-plus"></i></button> ' +
      '<button type="button" class="btn btn-block btn-danger text-white" id="decline' +
      userSeminar.UserSeminarId +
      '"><i class="ti-minus"></i></button> ' +
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