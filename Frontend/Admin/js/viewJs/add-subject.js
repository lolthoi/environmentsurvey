var domen = "https://localhost:44304";
var token = localStorage.getItem("token");

var url_string = window.location + "";
var url = new URL(url_string);
var subjectId = url.searchParams.get("subjectId");

$(document).ready(function(){
    if(subjectId != null){
        getSubject(subjectId);
    }

    $("#saveQuestion").click(function(){
        if($("#subject").val() == ""){
            $("#issue-subject").text("Please Insert Subject");
            $("#saveForm").attr("disabled", true);
        } else {
            var data = {
                Subject : $("#subject").val(),
            }
            
            $.ajax({
                type: "POST",
                url: domen+"/api/Subject",
                headers: {
                    Authorization: "Bearer " + token,
                },
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(data),
                datatype:"json",
                async: true,
                success: function(response) {
                    if(response == true){
                        window.location.href = "/Admin/list-subject.html";
                    }
                },
            });
        }
    });

    $("#subject").focusout(function(){
        var name = $("#subject").val();
        validateSubject(name);
    })
});

function validateSubject(name){
    var data;
    if(subjectId != null){
        data = {
            subjectId : subjectId,
            Subject : name,
        };
    } else {
        data = {
            subjectId : 0,
            Subject : name,
        }
    }
    $.ajax({
        type: "POST",
        url: domen+"/api/Subject/Search",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        datatype:"json",
        async: true,
        success: function(response) {
            if(response == true){
                $("#issue-subject").text("Subject Name Unavailable.");
                $("#saveForm").attr("disabled", true);
            } else {
                $("#issue-subject").text("");
                $("#saveForm").removeAttr("disabled");
            }
        },
    });
};

function getSubject(id){
    $.ajax({
        type: "GET",
        url: domen+"/api/Subject/"+id,
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            $("#subject").val(response.Subject);
        },
    });
}