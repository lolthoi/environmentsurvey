var domain = "https://localhost:44304";
var token = localStorage.getItem("token");

var url_string = window.location + "";
var url = new URL(url_string);
var subjectId = url.searchParams.get("subjectId");

$(document).ready(function(){
    if(subjectId != null){
        $("#page-title").text("Edit Subject");
        getSubject(subjectId);
    }

    $("#saveForm").click(function(){
        if($("#subject").val() == ""){
            $("#issue-subject").text("Please Insert Subject");
            $("#saveForm").attr("disabled", true);
        } else {
            if(subjectId == null){
                var data = {
                    Subject : $("#subject").val(),
                }
                
                $.ajax({
                    type: "POST",
                    url: domain+"/api/Subject",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    contentType: "application/json; charset=utf-8",
                    data : JSON.stringify(data),
                    datatype:"json",
                    async: true,
                    success: function(response) {
                        if(response == true){
                            sessionStorage.setItem('createResponse', "Success");
                            window.location.replace("list-subject.html");
                        }
                    },
                });
            } else {
                var data = {
                    Id : Number.parseInt(subjectId),
                    Subject : $("#subject").val(),
                }
                
                $.ajax({
                    type: "PUT",
                    url: domain+"/api/Subject",
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
                            window.location.replace("list-subject.html");
                        }
                    },
                });
            }
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
            Id : subjectId,
            Subject : name,
        };
    } else {
        data = {
            Id : 0,
            Subject : name,
        }
    }
    $.ajax({
        type: "POST",
        url: domain+"/api/Subject/Search",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        datatype:"json",
        async: true,
        success: function(response) {
            if(response == false){
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
        url: domain+"/api/Subject/"+id,
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