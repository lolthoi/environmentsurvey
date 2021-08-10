var domen = "https://localhost:44304";
var token = localStorage.getItem("token");

var url_string = window.location + "";
var url = new URL(url_string);
var questionId = url.searchParams.get("questionId");

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
    })

    $(".answer").focusout(function(){
        changestatusAnswer();
    })


    $("#saveQuestion").click(function(){
        if(validateAnswer()){
            var data = {
                Question : $("#question").val(),
                Answers : returnData()
            }
            
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
        }
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
        return true;
    }
    return false;
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
                    Answer : listAns[i].value,
                    isCorrect : 1
                }
                listAnswerModel.push(model);
            } else {
                var model = {
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
    console.log(listAns);
    for (let i = 0; i < listAns.length; i++) {
        var j = i+1;
        $("#ans"+j).val(listAns[i].Answer);
        if(listAns[i].IsCorrect === 1){
            $("#correct"+j).attr("checked", true);
            $("#correct"+j).removeAttr("disabled");
        }
    }
}

