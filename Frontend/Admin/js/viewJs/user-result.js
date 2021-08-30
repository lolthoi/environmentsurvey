var domain = "https://localhost:44304";

var token = sessionStorage.getItem("token");
var url_string = window.location + "";
var url = new URL(url_string);
var userId = url.searchParams.get("userId");

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: domain+"/api/"+userId+"/Result/",
        headers: {
            Authorization: "Bearer " + token,
        },
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            $("#box-title").val(response.User);
            showList(response.Result);
        },
    });
})

function showList(list){
    $("#listResultTbody").html("");
    for(var i=0; i<list.length; i++){
        $("#listResultTbody").append(
            '<tr>'
                +'<td>'+No+'</td>'
                +'<td>'+list[i].Seminar+'</td>'
                +'<td>'+list[i].Survey +'</td>'
                +'<td>'+list[i].Point+'</td>'
                +'<td>'+list[i].SubmitTime+'</td>'
            +'</tr>'
        )
    }
}