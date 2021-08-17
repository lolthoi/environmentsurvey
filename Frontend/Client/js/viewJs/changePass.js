
var domain = "https://localhost:44304";
var token_string = localStorage.getItem("token");


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
            url: domain+"/api/Account/ChangePassword",
            headers: {Authorization: 'Bearer '+ token_string},
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success : function(response){
                showPopup(response);
                clearInput();
                
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

function showPopup(text){
    document.getElementById("popupname").value = text;
    document.getElementById("myForm").style.display = "block";
    setTimeout(function(){
		document.getElementById("myForm").style.display = "none";
	},3000);
}

function clearInput(){
    var elements = document.getElementsByTagName("input");
    for (var i=0; i < elements.length; i++) {
        elements[ii].value = "";
    }
}
