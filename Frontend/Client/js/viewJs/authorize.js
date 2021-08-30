
var domain = "https://localhost:44304";

$(document).ready(function(){

    var username = sessionStorage.getItem('username');
    var token = sessionStorage.getItem('token');
    var role = sessionStorage.getItem('role');
    $.ajax({
        type: "POST",
        url: domain+"/api/User/checkUserExists?username=" + username,
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function(response) {
            if(username != null && token != null && response == "Username is available"){
                $('.login').css("display","none");
                $('.profile').css("display","block");
                $('#navbarDropdown').html(username);
                if(role != "ADMIN"){
                    document.getElementById("admin-dashboard").remove();
                }
            }
        },
    });
    if(username == "" || token == "" || username == null || token == null){
        $('.profile').css("display","none");
        $('.login').css("display","block");
    }
})
$('.logout').click(function(){
    sessionStorage.clear();
    $('.profile').css("display","none");
    $('.login').css("display","block");
    window.location.href = 'index.html';
})