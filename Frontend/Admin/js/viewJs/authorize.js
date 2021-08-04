var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var token = localStorage.getItem('token');
var username = localStorage.getItem('username');
window.onload = function(){
    if(role != 'ADMIN'){
        window.location.replace("/Client/index.html");
    }else{
        var data = {
            Username : username       
        }
        $.ajax({
            type : "POST",
            url: domain+"/api/User/searchByUsername",
            headers: {
                Authorization: 'Bearer '+token
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            datatype:"json",
            async:true,
            success : function(response){
                $('#user-img').attr("src", domain+'/Images/'+response.Image);
                $('#user-name').text(response.FirstName + ' ' + response.LastName);
            },       
        })
    }
}