$(document).ready(function(){

    $('#oldPass').focusout(function(){
        confirmPassword();
    })

    $('#retypePass').focusout(function(){
        confirmPassword();
    })

    //event đăng ký 
    $('#changePassButton').click(function(){
        var data = {
            Username : localStorage.getItem('username'),
            OldPassword : $('#oldPass').val(),
            NewPassword : $('#newPass').val()
        }

        $.ajax({
            type : "POST",
            url: "https://localhost:44304/api/Account/ChangePassword",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success : function(response){
                console.log(response);
            }
        })
    })
})

//kiểm tra nhập lại password
function confirmPassword(){
    var newPass = $("#newPass").val();
    var retype = $("#retypePass").val();
    if(newPass != retype){
        $("#message").text("Please check your password confirm");
        $('#message').removeClass('hiddenField');
        $('#changePassButton').addClass('disabled');
    } else {
        $('#message').addClass('hiddenField');
        $('#changePassButton').removeClass('disabled');
    }
}