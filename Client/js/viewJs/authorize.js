
var domen = "https://localhost:44304";

$(document).ready(function(){

    var username = localStorage.getItem('username');
    var token = localStorage.getItem('token');
    $.ajax({
        type: "POST",
        url: domen+"/api/User/checkUserExists?username=" + username,
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function(response) {
            if(username != null && token != null && response == "Username is unvalible"){
                $('.login').css("display","none");
                $('.profile').css("display","block");
                $('#navbarDropdown').html(username);
            }
        },
    });
    if(username == "" || token == "" || username == null || token == null){
        $('.profile').css("display","none");
        $('.login').css("display","block");
    }
})
$('.logout').click(function(){
    localStorage.clear();
    $('.profile').css("display","none");
    $('.login').css("display","block");
})