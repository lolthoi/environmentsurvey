var domen = "https://localhost:44304";
var tempList = null;
var selectList = [];

$(document).ready(function(){
    var url_string = window.location + "";
    var url = new URL(url_string);
    var seminarId = url.searchParams.get("seminarId");

    $.ajax({
        type: "GET",
        url: domen+"/api/Question",
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            tempList = response;
            loadAllQuestion(tempList);
        },
    });

    $("#add").click(function(){
        addSelectedQuestion();
    })
})

function loadAllQuestion(list){
    $("#questions").html("");
    list.forEach(e => {
        $("#questions").append(
            '<option value="'+e.Id+'">'+e.Question+'</option>'
        )
    });
}

function loadSelectedQuestion(list){
    $("#questionSelected").html("");
    list.forEach(e => {
        $("#questionSelected").append(
            '<option value="'+e.Id+'">'+e.Question+'</option>'
        )
    });
}

function addSelectedQuestion(){
    var selectedRow = document.getElementById("questions");
    var questionId = selectedRow.value;
    for (let i = 0; i < tempList.length; i++) {
        if(tempList[i].Id == questionId){
            if(selectList.length === 0){
                selectList = tempList.splice(i,1);
            } else {
                selectList.push(tempList.splice(i,1));
            }
            
        }
    }
    loadAllQuestion(tempList);
    loadSelectedQuestion(selectList);
    console.log(selectList);

}

