var domen = "https://localhost:44304";

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

    $("#name").focusout(function(){
        validateName();
    })

    $("#saveForm").click(function(){
        validateDate();
        var data = {
            SeminarId : seminarId,
            Name: $("#name").val(),
            Description: $("#des").val(),
            StartDate: $("#startTime").val(),
            EndDate: $("#endTime").val()
        }
        $.ajax({
            type: "POST",
            url: domen+"/api/Survey",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data),
            datatype:"json",
            async: true,
            success: function(response) {
                if(response == true){
                    window.location.href = "/Admin/list-survey.html?seminarId="+seminarId;
                }
            },
        });
    })
})

function validateName(){
    if($("#name").val() == ""){
        $("#issue-name").text("Please insert survey name.");
        $("#saveForm").attr("disabled", true);
    } else {
        $("#issue-name").text("");
        $("#saveForm").removeAttr("disabled");
    }
}

function validateDate(){
    if($("#startTime").val() == ""){
        $("#issue-datetime").text("Please select time for survey.");
        $("#saveForm").attr("disabled", true);
    } else {
        $("#issue-datetime").text("");
        $("#saveForm").removeAttr("disabled");
    }
}