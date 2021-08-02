var domen = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token")

$(document).ready(function(){
	var data = {
		Username : username,		
	}	
	function doWork(response)
	{
		listUserSeminar = response;
	}
	var listUserSeminar = '';
	$.ajax({
		type : "POST",
		url: domen+"/api/UserSeminar/getUserSeminarByUser",
		headers: {
			Authorization: 'Bearer '+token
		},
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		datatype:"json",
		async:false,
		success : function(response){
			doWork(response);
		},       
	});
	
	
	// get all seminar
	$.ajax({
        type : "GET",
        url: domen+"/api/Seminar",
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(response){
			//localStorage.setItem("response",response);
			if(role == null){
				response.forEach(function(seminar) {
					showSeminar(seminar);
				});
			}  
			//var lstseminar = [];          
			if(role == "STUDENT"){
				let lsUserSeminarID =  listUserSeminar.map(item => {return item.SeminarId});
				let listSeminar  = response.filter(item=> !lsUserSeminarID.includes(item.ID));
				listSeminar.forEach(function(seminar) {
					if(seminar.forUser == 1){
						showSeminar(seminar);
					}
					
				});				
			}
			if(role == "EMPLOYEE"){
				let lsUserSeminarID =  listUserSeminar.map(item => {return item.SeminarId});
				let listSeminar  = response.filter(item=> !lsUserSeminarID.includes(item.ID));
				listSeminar.forEach(function(seminar) {
					if(seminar.forUser == 1){
						showSeminar(seminar);
					}
					
				});
				listSeminar.forEach(function(seminar) {
					if(seminar.forUser == 0){
						showSeminar(seminar);
					}
					
				});
			}
        },       
    })
})

//show seminar
function showSeminar(seminar){
	$('#seminar').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+domen+'/Images/'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2"></i>'+seminar.Location+'</p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'">'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<button type="button" class="btn btn-primary btn-sm button_register" id="button_register_'+seminar.ID+'" data-name="'+seminar.Name+'" data-id="'+seminar.ID+'">Register now</button>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}

$(document).ready(function() {
	$("body").on("click", ".button_register", function(){		
		if(username == null || token == null || role == null){
			$('#message_register_seminar').html("Please login befor register seminar. If you done have an account please register first!")
			$('#message_register_seminar').css("color","tomato");
			$('#registerSeminarModal').modal('show');
		}else if(username != null && token != null && role != null){
			$('#registerModal').modal('show');
			var id = $(this).attr("data-id");
			var nameSeminar = $(this).attr("data-name");
			var data = {
				Username : username,
				SeminarId : id
			}
			var clickButton = this;			
			$.ajax({
				
				type : "POST",
				url: domen+"/api/UserSeminar/SeminarRegistration",
				headers: {
					Authorization: 'Bearer '+token
				},
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				datatype:"json",
				async:true,
				success : function(response){
					if(response == "Register success"){
						var messageSucess = 'Thanks you for Registering seminar: <span style="color: black; font-size:18px">'+nameSeminar+'</span>. The result of registration for the seminar will be notified via email after 24 hours. Please check your email.'
						$('#message_register_seminar').html(messageSucess);
						$('#message_register_seminar').css("color","green");
						$('#registerModal').modal('hide');
						$('#registerSeminarModal').modal('show');
						$(clickButton).html("");
						$(clickButton).html("Registered");
						$(clickButton).prop('disabled', true);
						$(clickButton).removeClass("btn btn-primary");
						$(clickButton).css("background-color","#5237e8");
						$(clickButton).css("color","white");
					}else{
						var messageSucess = "Registration error, try again. If still error please click FAGs to find reason or call support 0123456789. Thanks you!"
						$('#message_register_seminar').html(messageSucess);
						$('#message_register_seminar').css("color","tomato");
						$('#registerModal').modal('hide');
						$('#registerSeminarModal').modal('show');
						
					}
				}, 

			})
			
		}	
	});
	
});