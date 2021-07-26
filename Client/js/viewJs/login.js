$(document).ready(function(){
    $('#loginButton').click(function(){
        var data = {
            Username : $('#loginName').val(),
            Password : $('#loginPassword').val()
        }

        $.ajax({
            type : "POST",
            url: "https://localhost:44304/api/Account/Login",
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