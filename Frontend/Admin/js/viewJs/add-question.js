var domen = "https://localhost:44304";
var token = localStorage.getItem("token");

var url_string = window.location + "";
var url = new URL(url_string);
var questionId = url.searchParams.get("questionId");
var flag = 0;

$(document).ready(function(){
    if(questionId != null){
        $("#page-title").text("Edit Question")

        $.ajax({
            type: "GET",
            url: domen+"/api/Question/"+questionId,
            headers: {
                Authorization: "Bearer " + token,
            },
            contentType: "application/json; charset=utf-8",
            datatype:"json",
            async: true,
            success: function(response) {
                loadDataQuestionModel(response);
            },
        });
        $("#saveQuestion").removeAttr("disabled");
    };

    $("#question").focusout(function(){
        validateQuestion();
        validateAnswer();
    })

    $(".answer").focusout(function(){
        changestatusAnswer();
        validateAnswer();
    })

    $("#saveQuestion").click(function(){
        var data = {
            Question : $("#question").val(),
            Answers : returnData()
        }
        console.log(data);
        
        // $.ajax({
        //     type: "POST",
        //     url: domen+"/api/Question",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //     },
        //     contentType: "application/json; charset=utf-8",
        //     data : JSON.stringify(data),
        //     datatype:"json",
        //     async: true,
        //     success: function(response) {
        //         if(response == true){
        //             window.location.href = "/Admin/list-survey.html?seminarId="+seminarId;
        //         }
        //     },
        // });
    })

})

function validateQuestion(){
    if($("#question").val() == ""){
        $("#issue-question").text("Please insert question.");
        $("#saveQuestion").attr("disabled", true);
    } else {
        $("#issue-question").text("");
        $("#saveQuestion").removeAttr("disabled");
    }
}

function changestatusAnswer(){
    var row = event.target;
    var rowId = row.id.substring(3);
    
    if(row.value != ""){
        $("#correct"+rowId).removeAttr("disabled");
        if(flag === 0){
            $("#correct"+rowId).attr("checked",true);
            flag = 1;
        }
    } else {
        $("#correct"+rowId).attr("disabled", true);
    }
}

function validateAnswer(){
    var count = 0;
    var listAns = $(".answer");
    for (let i = 0; i < listAns.length; i++) {
        if(listAns[i].value != ""){
            count++;
        }
    }
    if(count >= 2){
        $("#issue-answer").text("");
        $("#saveQuestion").removeAttr("disabled");
    } else {
        $("#issue-answer").text("Please insert 2 answers.");
        $("#saveQuestion").attr("disabled", true);
    }
}

// trả về data list model answer
function returnData(){
    var listAnswerModel = [];

    var listAns = $(".answer");
    for (let i = 0; i < listAns.length; i++) {
        if(listAns[i].value != ""){
            var rowId = listAns[i].id.substring(3);
            if($("#correct"+rowId).prop("checked")){
                var model = {
                    Id: $("#ansId"+rowId).val(),
                    Answer : listAns[i].value,
                    isCorrect : 1
                }
                listAnswerModel.push(model);
            } else {
                var model = {
                    Id: $("#ansId"+rowId).val(),
                    Answer : listAns[i].value,
                    isCorrect : 2
                }
                listAnswerModel.push(model);
            }
        }
    }

    return listAnswerModel;
}

//load data khi edit
function loadDataQuestionModel(model){
    $("#question").val(model.Question);
    var listAns = model.Answers;
    for (let i = 0; i < listAns.length; i++) {
        var j = i+1;
        $("#ans"+j).val(listAns[i].Answer);
        $("#correct"+j).removeAttr("disabled");
        if(listAns[i].IsCorrect === 1){
            $("#correct"+j).attr("checked", true);
        }
        if(questionId != null){
            $("#ansId"+j).val(listAns[i].Id);
        }
    }
}

