var domain = "https://localhost:44304";
var token = localStorage.getItem("token");

var url_string = window.location + "";
var url = new URL(url_string);
var seminarId = url.searchParams.get("seminarId");
var surveyId = url.searchParams.get("surveyId");
var subjectId = url.searchParams.get("subjectId");
var maxNumQuestion;

$(document).ready(function(){

    if(surveyId != null){
        $("#page-title").text("Edit Survey");
        $("#questionNumber").remove();

        $.ajax({
            type: "GET",
            url: domain+"/api/Survey/"+surveyId,
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
                console.log(response.EndDate);
                console.log(endTime);
                formatDatePicker(startTime,endTime);
            },
        });
        $("#saveForm").removeAttr("disabled");
    } else {
        formatDatePicker(null, null);
        loadNumberOfQuestion();
    }


    $.ajax({
        type: "GET",
        url: domain+"/api/Seminar/"+seminarId,
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

    $("#saveForm").click(function(){
        if(validateName() && validateDate() && validateNumsQuestion()){
            if(surveyId == null){
                var data = {
                    SeminarId : seminarId,
                    Name: $("#surveyName").val(),
                    Description: $("#des").val(),
                    StartDate: $("#startTime").val(),
                    EndDate: $("#endTime").val(),
                    NumberOfQuestion: $("#numQuestion").val(),
                }
                $.ajax({
                    type: "POST",
                    url: domain+"/api/Survey",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    contentType: "application/json; charset=utf-8",
                    data : JSON.stringify(data),
                    async: true,
                    success: function(response) {
                        if(response == true){
                            sessionStorage.setItem('createResponse', "Success");
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
                    url: domain+"/api/Survey",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    contentType: "application/json; charset=utf-8",
                    data : JSON.stringify(data),
                    datatype:"json",
                    async: true,
                    success: function(response) {
                        if(response == true){
                            sessionStorage.setItem('editResponse', "Success");
                            window.location.href = "/Admin/list-survey.html?seminarId="+seminarId;
                        }
                    },
                });
            }
        }
        
    });
})

function validateName(){
    if($("#surveyName").val() == ""){
        $("#issue-name").text("Please insert survey name.");
        return false;
    } else {
        $("#issue-name").text("");
        return true;
    }
}

function validateDate(){
    if($("#startTime").val() == ""){
        $("#issue-datetime").text("Please select time for survey.");
        return false;
    } else {
        $("#issue-datetime").text("");
        return true;
    }
}

function validateNumsQuestion(){
    if($("#numQuestion").val() > maxNumQuestion){
        $("#issue-number").text("Your input greater than maximum question. Please re-insert.");
        return false;
    } else {
        $("#issue-number").text("");
        return true;
    }
}

function convertDatetime(string){
    var date = string.split(' ')[0];
    var time = string.split(' ')[1];

    var dates = date.split('/');
    var year = dates[2];
    var month = dates[0];
    var day = dates[1];

    var times = time.split(':');
    var hour = times[0];
    var minute = times[1];

    var tt = string.split(' ')[2];

    var dateTimeConverted = month+"/"+day+"/"+year+" "+hour+":"+minute+" "+tt;
    return dateTimeConverted;
}

function formatDatePicker(startdate, enddate){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    if(startdate == null){
        $(function() {
            $('input[name="datetimes"]').daterangepicker({
            opens : 'center',
            "minDate" : today,
            timePicker: true,
            locale: {
                format: 'M/DD hh:mm A'
            }
            }, function(start, end, label) {
            $("#startTime").val(start.format('MM/DD/YYYY HH:mm'));
            $("#endTime").val(end.format('MM/DD/YYYY HH:mm'));
            });;
        });
    } else {
        $("#startTime").val(startdate);
        $("#endTime").val(enddate);
        $(function() {
            $('input[name="datetimes"]').daterangepicker({
            opens : 'center',
            "minDate" : today,
            startDate : startdate,
            endDate : enddate,
            timePicker: true,
            locale: {
                format: 'MM/DD/YYYY HH:mm A'
            }
            }, function(start, end, label) {
            $("#startTime").val(start.format('MM/DD/YYYY HH:mm'));
            $("#endTime").val(end.format('MM/DD/YYYY HH:mm'));
            });;
        });
    }
    
}

function loadNumberOfQuestion(){
    $.ajax({
        type: "GET",
        url: domain+"/api/Subject/"+subjectId+"/Question",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            maxNumQuestion = response;
        }
    });
}

