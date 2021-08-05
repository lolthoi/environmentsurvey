$(document).ready(function(){
    var domen = "https://localhost:44304";

    $.ajax({
        type: "GET",
        url: domen+"/api/Seminar/getSeminar",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function(response) {
            response.forEach(function() {
                addRowData(response.No, response.seminarName, response.UserName, response.NumberId);
            });
        },
    });
})

function addRowData(No, SeminarName, UserName, NumberId){
    var container = document.getElementById("listSurveyPending");
    var row = $('<tr id="row'+No+'"></tr>');

    var no = $('<tr>'+No+'</tr>');
    var seminarName = $('<tr>'+SeminarName+'</tr>');
    var user = $('<tr>'+UserName+'</tr>');
    var numberid = $('<tr>'+NumberId+'</tr>');
    var option = $('<td>'
                        +'<select id="select'+No+'" class="form-select actionSelect">'
                        +'<option selected>Option</option>'
                            +'<option value="1">Accept</option>'
                            +'<option value="2">Denided</option>'
                        +'</select>'
                    +'</td>');

    row.append(no,seminarName,user,numberid,option);
    container.append(row);
}

