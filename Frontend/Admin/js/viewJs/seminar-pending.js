var domen = "https://localhost:44304";
var tempList = null;

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: domen+"/api/UserSeminar/getAllSeminarPending",
        contentType: "application/json; charset=utf-8",
        datatype:"json",
        async: true,
        success: function(response) {
            tempList = response;
            showListPending(response);
        },
    });

    // $(".actionSelect").change(function(){
    //     console.log("đã bắt dc sự kiện");
    //     var selectId = event.target.id;
    //     console.log(selectId);
    //     console.log($(this).val());
    // })

    $("#listSeminarTbody").on("change",".actionSelect", function(){
        
        var selectId = event.target.id;
        var userSeminarIdString = selectId.substring(selectId.indexOf("select")+6);
        var optionString = $(this).val();
        var userSeminarId = Number.parseInt(userSeminarIdString);
        var option = Number.parseInt(optionString);

        changeStatus(userSeminarId, option);
        
    });
})

function addRowData(No, Id, SeminarName, UserName, NumberId){
    $("#listSeminarTbody").append(
        '<tr>'
            +'<td>'+No+'</td>'
            +'<td>'+SeminarName+'</td>'
            +'<td>'+UserName+'</td>'
            +'<td>'+NumberId+'</td>'
            +'<td>'
                +'<select id="select'+Id+'" class="form-select actionSelect">'
                    +'<option selected>Option</option>'
                    +'<option value="1">Accept</option>'
                    +'<option value="2">Denided</option>'
                +'</select>'
            +'</td>'
        +'</tr>'
    )
}

function removeObject(userSeminarId){
    for(var i=0; i<tempList.length; i++){
        if(tempList[i].UserSeminarId === userSeminarId){
            tempList.splice(i,1);
        }
    }
}

function showListPending(list){
    $("#listSeminarTbody").html("");
    for(var i=0; i<list.length; i++){
        addRowData(i+1, list[i].UserSeminarId, list[i].seminarName, list[i].UserName, list[i].UserNumberId);
    }
}

 function changeStatus(usId, op){
    $('#registerModal').modal('show');
    var data = {
        userSeminarId : usId,
        option : op
    }

    $.ajax({
        type: "POST",
        url: domen+"/api/UserSeminar/changeUserSeminarStatus",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        async: true,
        success: function(response) {
            if(response === "success"){
                removeObject(usId);
                console.log(tempList);
                showListPending(tempList);
                $('#registerModal').modal('hide');
            } else {
                $('#registerModal').modal('hide');
            }
        },
    });
 }


