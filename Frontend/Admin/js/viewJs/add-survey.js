var domen = "https://localhost:44304";
var token = localStorage.getItem("token");

$(document).ready(function(){
    var url_string = window.location + "";
    var url = new URL(url_string);
    var seminarId = url.searchParams.get("seminarId");
    var surveyId = url.searchParams.get("surveyId");

    if(surveyId != null){
        $.ajax({
            type: "GET",
            url: domen+"/api/Survey/"+surveyId,
            headers: {
                Authorization: "Bearer " + token,
            },
            contentType: "application/json; charset=utf-8",
            datatype:"json",
            async: true,
            success: function(response) {
                $("#surveyName").val(response.Name);
                $("#des").text(response.Description);
                var startTime = convertDatetime(response.StartDate);
                var endTime = convertDatetime(response.EndDate);
                $("#date").val(startTime+" - "+endTime);
                formatDatePicker();
            },
        });
    } else {
        formatDatePicker();
    }

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

    $("#surveyName").focusout(function(){
        validateName();
    })

    $("#saveForm").click(function(){
        validateDate();
        if(surveyId == null){
            var data = {
                SeminarId : seminarId,
                Name: $("#surveyName").val(),
                Description: $("#des").val(),
                StartDate: $("#startTime").val(),
                EndDate: $("#endTime").val()
            }
            $.ajax({
                type: "POST",
                url: domen+"/api/Survey",
                headers: {
                    Authorization: "Bearer " + token,
                },
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
        } else {
            var data = {
                Id : surveyId,
                SeminarId : seminarId,
                Name: $("#surveyName").val(),
                Description: $("#des").val(),
                StartDate: $("#startTime").val(),
                EndDate: $("#endTime").val()
            }
            $.ajax({
                type: "PUT",
                url: domen+"/api/Survey",
                headers: {
                    Authorization: "Bearer " + token,
                },
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
        }
    });

    

})

function validateName(){
    if($("#surveyName").val() == ""){
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

function convertDatetime(string){
    var date = string.split('T')[0];
    var time = string.split('T')[1];

    var dates = date.split('-');
    var year = dates[0];
    var month = dates[1];
    var day = dates[2];

    var times = time.split(':');
    var hour = times[0];
    var minute = times[1];

    var tt = null;
    if(hour <= 12 && minute <= 59){
        tt = "AM";
    } else {
        hour = hour - 12;
        tt = "PM";
    }

    var dateTimeConverted = month+"/"+day+"/"+year+" "+hour+":"+minute+":00 "+tt;
    return dateTimeConverted;
}

function formatDatePicker(){
    var today = new Date().toLocaleString();

    $(function() {
        $('input[name="datetimes"]').daterangepicker({
        opens : 'center',
        "minDate" : today,
        timePicker: true,
        locale: {
            format: 'M/DD hh:mm A'
        }
        }, function(start, end, label) {
        $("#startTime").val(start.format('DD/MM/YYYY hh:mm:ss A'));
        $("#endTime").val(end.format('DD/MM/YYYY hh:mm:ss A'));
        });;
    });
}