var domen = "https://localhost:44304";
var tempList = null;

$(document).ready(function(){
    var url_string = window.location + "";
    var url = new URL(url_string);
    var seminarId = url.searchParams.get("seminarId");

    $.ajax({
        type: "GET",
        url: domen+"/api/Seminar/"+seminarId,
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
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            console.log(response);
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
                +'<a href="sesfdf" style="text-decoration:none;" data-toggle="tooltip" data-placement="top" title="Edit"><i class="far fa-edit"></i></a>'
                +'<a href="#" onclick="deleteEvent('+Id+'); return false;" style="text-decoration:none; margin-left:10px;" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fas fa-trash-alt"></i></a>'
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

function deleteEvent(surveyId){
    $.ajax({
        type: "DELETE",
        url: domen+"/api/Survey/"+surveyId,
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            if(response == true){
                for(var i=0; i<tempList.length; i++){
                    if(tempList[i].Id === surveyId){
                        tempList.splice(i,1);
                    }
                }
                showListPending(tempList);
            }
        },
    });
}

