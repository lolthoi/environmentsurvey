var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token")

$(document).ready(function(){
	var data = {
		Username : username,		
	}
	// get all seminar
	$.ajax({
		type : "POST",
		url: domain+"/api/UserSeminar/getUserSeminarByUser",
		headers: {
			Authorization: 'Bearer '+token
		},
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		datatype:"json",
		async:false,
		success : function(response){
			var i = 0;
			var j = 0;
			var k = 0;
			response.forEach(function(userseminar) {
				
                if(userseminar.Status == 1){
					                 
					var dateSeminar = userseminar.Seminar.EndDate;
					var datTime = new Date(dateSeminar);
					var now = new Date();
					if(now > datTime){
						k++
						showSeminarClosed(userseminar.Seminar,userseminar.Status)
					}else{
						i++;  
						showSeminar(userseminar.Seminar,userseminar.Status );
					}					
                }
                if(userseminar.Status == 2){
					j++;
                    showSeminarRegistering(userseminar.Seminar,userseminar.Status);
                }
                if(userseminar.Status == 3){
					j++;
                    showSeminarDecline(userseminar.Seminar, userseminar.Status);
                }
				
            });
			if(i == 0){
				$('#messageRegisterd').html('You are not participating in any seminars at the moment!.')
			}
			if(j == 0){
				$('#messageRegistering').html('You do not have a seminar entry pending approval or denied at the moment!.')
			}
			if(k == 0){
				$('#messageClosed').html('You have not completed any seminar at the moment!.')
			}
		},       
	});
});	

//show seminar
function showSeminar(seminar, status){
	seminar.Image = seminar.Image.split('-')[0]; 
	$('#seminarRegistered').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2"></i>'+seminar.Location+'</p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'">'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'&status='+status+'" class="btn btn-primary btn-sm button_register" id="button_register_'+seminar.ID+'" data-name="'+seminar.Name+'" data-id="'+seminar.ID+'">View detail</a>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}

function showSeminarRegistering(seminar,status){
	seminar.Image = seminar.Image.split('-')[0]; 
	$('#seminar').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2">'+seminar.Location+'</i></p>'
				+'<a >'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'&status='+status+'" class="btn processing btn-sm button_register" id="button_register_'+seminar.ID+'" data-name="'+seminar.Name+'" data-id="'+seminar.ID+'">Processing</a>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
	
	
}

function showSeminarDecline(seminar){
	seminar.Image = seminar.Image.split('-')[0]; 
	$('#seminar').append(
		
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2">'+seminar.Location+'</i></p>'
				+'<a >'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<button type="button" class="btn btn-danger btn-sm button_register " id="button_register_'+seminar.ID+'" data-name="'+seminar.Name+'" data-id="'+seminar.ID+'">Decline</button>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}


function showSeminarClosed(seminar, status){
	seminar.Image = seminar.Image.split('-')[0]; 
	$('#closedSeminars').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2">'+seminar.Location+'</i></p>'
				+'<a >'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'&status='+status+'" class="btn btn-primary btn-sm button_register" id="button_register_'+seminar.ID+'" data-name="'+seminar.Name+'" data-id="'+seminar.ID+'">View detail</a>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}



