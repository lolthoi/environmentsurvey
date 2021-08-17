$(document).ready(function(){
    var domain = "https://localhost:44304";
    var url_string = window.location + "";
    var url = new URL(url_string);
    var surveyId = url.searchParams.get("surveyId");
    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');

    var data = {
        surveyId : surveyId,
        userName : username
    }

    $.ajax({
        type: "POST",
        url: domain+"/api/Result/getResult",
        contentType: "application/json; charset=utf-8",
        headers: {Authorization: 'Bearer '+ token},
        data: JSON.stringify(data),
        async: true,
        success: function(response) {
            showResult(response.result.surveyName, response.result.point);
        },
    });
})

function showResult(surveyName, result){
    $("#surveyName").val(surveyName);
    $("#surveyResult").val(result);
}