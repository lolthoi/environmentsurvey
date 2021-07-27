$(document).ready(function(){

    var username = localStorage.getItem('username');
    console.log(username);
    var token = localStorage.getItem('token');
    console.log(token);
    $.ajax({
        type: "POST",
        url: "https://localhost:44304/api/User/checkUserExists?username=" + username,
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function(response) {
            console.log("response  : "+response);
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