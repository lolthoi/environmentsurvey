var domen = "https://localhost:44304";
var tempList = null;
var selectList = [];

var url_string = window.location + "";
var url = new URL(url_string);
var surveyId = Number.parseInt(url.searchParams.get("surveyId"));
var seminarId = url.searchParams.get("seminarId");

var token = localStorage.getItem("token");

$(document).ready(function(){
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
            $("#title").text(response.Name);
        },
    });

    $.ajax({
        type: "GET",
        url: domen+"/api/Question",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            console.log(response);
            tempList = response;
            for (let i = 0; i < tempList.length; i++) {
                var listSurveyQuestion = tempList[i].SurveyQuestions;
                for (let j = 0; j < listSurveyQuestion.length; j++) {
                    var surveyIdinside = listSurveyQuestion[j].SurveyId;
                    if(surveyIdinside === surveyId){
                        console.log("da chay");
                        var removeObject = tempList.splice(i,1);
                        selectList.push(removeObject[0]);
                        break;
                    }
                }
            }
            loadAllQuestion(tempList);
            loadSelectedQuestion(selectList);
        },
    });

    $("#add").click(function(){
        addSelectedQuestion();
    })

    $("#remove").click(function(){
        removeSelectedQuestion();
    })

    $("#submitButton").click(function(){
        var data = convertData();

        $.ajax({
            type: "GET",
            url: domen+"/api/SurveyQuestion",
            headers: {
                Authorization: "Bearer " + token,
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            datatype:"json",
            async: true,
            success: function(response) {
                if(response == true){
                    window.location.href = "list-survey.html?seminarId="+seminarId;
                }
            },
        });
    })
})

function loadAllQuestion(list){
    $("#questions").html("");
    list.forEach(e => {
        $("#questions").append(
            '<option value="'+e.Id+'">- '+e.Question+'</option>'
        )
    });
}

function loadSelectedQuestion(list){
    $("#questionSelected").html("");
    list.forEach(e => {
        $("#questionSelected").append(
            '<option value="'+e.Id+'">- '+e.Question+'</option>'
        )
    });
}

function addSelectedQuestion(){
    var selectedRow = document.getElementById("questions");
    var questionId = selectedRow.value;
    for (let i = 0; i < tempList.length; i++) {
        if(tempList[i].Id == questionId){
            var removeObject = tempList.splice(i,1);
            selectList.push(removeObject[0]);
            
        }
    }
    loadAllQuestion(tempList);
    loadSelectedQuestion(selectList);
}

function removeSelectedQuestion(){
    var selectedRow = document.getElementById("questionSelected");
    var questionId = selectedRow.value;
    for (let i = 0; i < selectList.length; i++) {
        if(selectList[i].Id == questionId){
            var removeObject = selectList.splice(i,1);
            tempList.push(removeObject[0]);
            
        }
    }
    loadAllQuestion(tempList);
    loadSelectedQuestion(selectList);
}

function convertData(){
    var data = [];
    selectList.forEach(e => {
        var surveyQuestionModel = {
            SurveyId : surveyId,
            QuestionId : e.Id
        }
        data.push(surveyQuestionModel);
    });
    return data;
}

// function filterResponseList(){
//     for (let i = 0; i < tempList.length; i++) {
//         var listSurveyQuestion = tempList[i].SurveyQuestions;
//         console.log(listSurveyQuestion);
//         for (let j = 0; j < listSurveyQuestion.length; j++) {
//             if(listSurveyQuestion[j].SurveyId === surveyId){
//                 var removeObject = tempList.splice(i,1);
//                 selectList.push(removeObject[0]);
//                 break;
//             }
//         }
//     }
// }

