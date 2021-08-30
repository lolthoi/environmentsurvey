var domain = "https://localhost:44304";
var role = sessionStorage.getItem("role");
var username = sessionStorage.getItem("username");
var token = sessionStorage.getItem("token");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const seminarId = urlParams.get('id');

$(document).ready(function(){
  getList();
})

// get list seminar
function getList() {
  $.ajax({
    type: "GET",
    url: domain + "/api/Result/getInfor?seminarId="+seminarId+"",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    async: true,
    success: function (response) {
      if(response.length == 0){
        $("#list-seminar tbody ").append(
          "<tr>" +
            '<td colspan="7" class="text-center"> No data</td>' +
          "</tr>"
        )};
      response.forEach(function (seminar) {
        showSeminar(seminar);
      });
      $('#seminarName').html(response[0].SeminarName)
    },
  });
}
//show seminar
function showSeminar(model) {
    $("#list-seminar tbody").append(
        "<tr>" +
        '<td >' +
        model.SurveyName+
        "</td>" +
        '<td class="text-center">' +
        '<a href="user_seminar.html?id='+model.SeminarId+'" title="View detail">'+ model.TotalRegister+'</a>'+
        "</td>" +
        '<td class="text-center">' +
        '<a href="result-survey.html?id='+model.SurveyId+'" title="View detail">'+model.TotalTakeSurvey+'</a>'+
        "</td>" +
        "</tr>"
    );
}
function ClearData(){
  $("#list-seminar tbody").empty();
}

