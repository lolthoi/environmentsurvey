var domain = "https://localhost:44304";
var token = sessionStorage.getItem("token");

var tempList;
var data;
var currentPage = 0;
var totalPage;
var listFilterCheck;

$(document).ready(function(){
    getList();
    getAllSubject();

    $("#table_filter").keyup(function(){
      filterSearchKey();
    });

    $("#listSubject").on("change",".filterCheck",function(){
      listFilterCheck = [];
      var list = $(".filterCheck");
      for(var i=0; i<list.length;i++){
        if(list[i].checked){
          listFilterCheck.push(Number.parseInt(list[i].value));
        }
      }
      filterSearchKey();
    })
})

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
        title: "Delete Question",
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
            url: domain + "/api/Question/" + Id,
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
              var questionId = Number.parseInt(Id);
              for(var i=0; i<data.length; i++){
                if(data[i].Id === questionId){
                    data.splice(i,1);
                }
              }
              showList(data);
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

function getList(){
    currentPage = 0;
    $.ajax({
        type: "GET",
        url: domain+"/api/Question",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            data = response;
            tempList = response;
            totalPage = Math.ceil(data.length/6);
            showList(data,currentPage);
            pagination();
        },
    });
}

function getAllSubject(){
  $.ajax({
      type: "GET",
      url: domain+"/api/Subject",
      headers: {
          Authorization: "Bearer " + token,
      },
      contentType: "application/json; charset=utf-8",
      datatype:"json",
      async: true,
      success: function(response) {
        response.forEach(e => {
          $("#listSubject").append(
            '<li>'
                +'<input type="checkbox" class="filterCheck" name="filter" value="'+e.Id+'" ><label style="padding-left: 5%;">'+e.Subject+'</label>'
            +'</li>'
          )
        });
      },
  });
}

function showList(list, page){
    $("#listQuestionTbody").html("");
    var i = page*6;
    var maxPage;
    if(list.length <= (i+6)){
      maxPage = list.length;
    } else {
      maxPage = i +6;
    }
    for(i; i<maxPage; i++){
      var No = i+1;
        $("#listQuestionTbody").append(
          '<tr>'
              +'<td>'+No+'</td>'
              +'<td>'+list[i].Question+'</td>'
              +'<td>'
                  +'<a href="add-question.html?questionId='+list[i].Id+'" class="btn btn-block btn-warning"><i class=" ti-pencil"></i></a>  '
                  +'<button type="button" class="btn btn-block btn-danger text-white" id="delete'+list[i].Id+'"><i class="fa fa-trash"></i></button>'
              +'</td>'
          +'</tr>'
      )
    }
    $("#currentPage").html(currentPage+1);
}

$('#nextPage').click(function(){
  currentPage++;
  showList(tempList,currentPage);
  pagination();
  
});

$('#previousPage').click(function(){
  currentPage--;
  showList(tempList,currentPage);
  pagination();
});

function pagination(){
  $('#nextPage').removeClass('disableLink');
  $('#previousPage').removeClass('disableLink');
	if(currentPage == (totalPage-1)){
		$('#nextPage').addClass('disableLink');
	}
	if(currentPage == 0){
		$('#previousPage').addClass('disableLink');
	}

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

function filterSearchKey(){
  var key = $("#table_filter").val();
  var search = key.toLowerCase();
  tempList = data.filter(e => e.Question.toLowerCase().search(search) >= 0);
  
  if(listFilterCheck.length > 0){
    tempList = tempList.filter(filterSubject);
  }
  currentPage = 0;
  totalPage = Math.ceil(tempList.length/6);
  showList(tempList, currentPage);
}

function filterSubject(value){
  for(var i = 0; i<listFilterCheck.length;i++){
    if(listFilterCheck[i] == value.SubjectId){
      return value;
    }
  }
}