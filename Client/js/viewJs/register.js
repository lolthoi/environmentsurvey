$(document).ready(function () {
    $('#resgiterButton').click(function(){
        var data = {
            Username : $('#username').val(),
            Password : $('#userPass').val(),
            NumberId : $('#idNumber').val(),
            Role: $('#userRole').val(),
            LastName: $('#userLastname').val(),
            FirstName: $('#userFirstname').val(),
            Email: $('#userEmail').val(),
            Tel: $('#userTel').val(),
            Address: $('#userAddress').val(),
            Gender: $('#userGender').val(),
            Status: 0
        }

        $.ajax({
            type : "POST",
            url: "https://localhost:44304/api/Account/Register",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success : function(responseText){
                if(responseText === "success"){
                    window.location.href = 'index.html'
                } else {
                    $('#message').removeClass("hiddenField");
                    $('#message').val("Username Not Available");
                }
            }
        })
    })
})