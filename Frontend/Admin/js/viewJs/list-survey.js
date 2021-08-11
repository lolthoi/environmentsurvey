var domen = "https://localhost:44304";
var tempList = null;

var token = localStorage.getItem("token");
var url_string = window.location + "";
var url = new URL(url_string);
var seminarId = url.searchParams.get("seminarId");

$(document).ready(function(){
    $("#addNewSurvey").attr("href","add-survey.html?seminarId="+seminarId);
    
    $.ajax({
        type: "GET",
        url: domen+"/api/Seminar/"+seminarId,
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            $("#title").text(response.Name);
        },
    });

    $.ajax({
        type: "GET",
        url: domen+"/api/Seminar/"+seminarId+"/Survey",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
          tempList = response;
          showListPending(response);
        },
    });

})

function addRowData(Id, No, Survey, StartTime, EndTime, Des, Status){
    var statusStr = null;
    if(Status == 1){statusStr = "Closed";}
    else if(Status == 2){statusStr = "Happening";}
    else {statusStr = "Planed";}

    $("#listSurveyTbody").append(
        '<tr>'
            +'<td>'+No+'</td>'
            +'<td>'+Survey+'</td>'
            +'<td>'+ StartTime +' / '+ EndTime +'</td>'
            +'<td>'+Des+'</td>'
            +'<td>'+statusStr+'</td>'
            +'<td>'
                +'<a href="add-survey.html?seminarId='+seminarId+'&surveyId='+Id+'" class="btn btn-block btn-warning" data-toggle="tooltip" data-placement="top" title="Edit Survey"><i class=" ti-pencil"></i></a>  '
                +'<a href="addQuestion-survey.html?seminarId='+seminarId+'&surveyId='+Id+'" class="btn btn-block btn-info text-white" data-toggle="tooltip" data-placement="top" title="List Question"><i class="fas fa-list"></i></a> '
                +'<button type="button" class="btn btn-block btn-danger text-white" id="delete'+Id+'" data-toggle="tooltip" data-placement="top" title="Delete Survey"><i class="fa fa-trash"></i></button>'
            +'</td>'
        +'</tr>'
    )
}

function showListPending(list){
    $("#listSurveyTbody").html("");
    for(var i=0; i<list.length; i++){
        var startDate = convertDate(list[i].StartDate);
        var endDate = convertDate(list[i].EndDate);
        addRowData(list[i].Id, i+1, list[i].Name, startDate, endDate, list[i].Description, list[i].Status);
    }
}

function convertDate(string){
    var indexOfTime = string.indexOf("T");
    var converted = string.substring(0, indexOfTime);
    return converted;
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
        title: "Delete Question",
        text: "Are you sure to delete this record?",
        icon: "warning",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.showLoading();
          surveyId = this.id.replace("delete", "");
          $.ajax({
            type: "DELETE",
            url: domen+"/api/Survey/"+surveyId,
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
              var surveyIdNum = Number.parseInt(surveyId);
              for(var i=0; i<tempList.length; i++){
                    if(tempList[i].Id === surveyIdNum){
                        tempList.splice(i,1);
                    }
              }
              showListPending(tempList);
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
