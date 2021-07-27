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
            success : function(response){
                localStorage.setItem('username', response.authenModel.Username);
                localStorage.setItem('role', response.authenModel.Role);
                localStorage.setItem('token', response.authenModel.Token);
                window.location.href = 'index.html';
            },
            error: function(response){
                $("#message").text("Username Or Password Not Correct");
                $('#message').removeClass('hiddenField');
            }
        })
    })
})