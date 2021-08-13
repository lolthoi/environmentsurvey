var domen = "https://localhost:44304";
var selectedList = [];
var listForSelect = [];

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
            for (let i = 0; i < response.length;i++) {
                var listSurveyQuestion = response[i].SurveyQuestions;
                var flag = 0;
                for (let j = 0; j < listSurveyQuestion.length; j++) {
                    var surveyIdinside = listSurveyQuestion[j].SurveyId;
                    if(surveyIdinside === surveyId){
                        console.log("da chay");
                        selectedList.push(response[i]);
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0){
                    listForSelect.push(response[i]);
                }
            }
            loadAllQuestion(listForSelect);
            loadSelectedQuestion(selectedList);
            console.log(selectedList);
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
            type: "PUT",
            url: domen+"/api/SurveyQuestion",
            headers: {
                Authorization: "Bearer " + token,
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            async: true,
            success: function(response) {
                if(response == true){
                    window.location.href = "list-survey.html?seminarId="+seminarId;
                }
            },
        });
    });

    $("#serachBox1").keyup(function(){
        var search = $("#serachBox1").val();
        if(search != ""){
            searchAllQuestion(search);
        } else {
            $("#questions").html("");
            loadAllQuestion(listForSelect);
        }
    });

    $("#serachBox2").keyup(function(){
        var search = $("#serachBox2").val();
        if(search != ""){
            searchAllSelectQuestion(search);
        } else {
            $("#questionSelected").html("");
            loadSelectedQuestion(selectedList);
        }
    });


});

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
    for (let i = 0; i < listForSelect.length; i++) {
        if(listForSelect[i].Id == questionId){
            var removeObject = listForSelect.splice(i,1);
            selectedList.push(removeObject[0]);
        }
    }
    loadAllQuestion(listForSelect);
    loadSelectedQuestion(selectedList);
}

function removeSelectedQuestion(){
    var selectedRow = document.getElementById("questionSelected");
    var questionId = selectedRow.value;
    for (let i = 0; i < selectedList.length; i++) {
        if(selectedList[i].Id == questionId){
            var removeObject = selectedList.splice(i,1);
            listForSelect.push(removeObject[0]);
            
        }
    }
    loadAllQuestion(listForSelect);
    loadSelectedQuestion(selectedList);
}

function convertData(){
    var data = [];
    selectedList.forEach(e => {
        var surveyQuestionModel = {
            SurveyId : surveyId,
            QuestionId : e.Id
        }
        data.push(surveyQuestionModel);
    });
    return data;
}

function searchAllQuestion(search){
    var searchList = [];
    listForSelect.forEach(e => {
        var check = e.Question.search(search);
        if(check >= 0){
            searchList.push(e);
        }
    })
    $("#questions").html("");
    loadAllQuestion(searchList);
}

function searchAllSelectQuestion(search){
    var searchList = [];
    selectedList.forEach(e => {
        var check = e.Question.search(search);
        if(check >= 0){
            searchList.push(e);
        }
    })
    $("#questionSelected").html("");
    loadSelectedQuestion(searchList);
}

