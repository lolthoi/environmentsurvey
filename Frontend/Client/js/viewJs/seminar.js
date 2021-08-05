var domen = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token")

$(document).ready(function(){
	var data = {
		Username : username,		
	}	
	var listUserSeminar = '';
	function doWork(response)
	{
		listUserSeminar = response;
	}
	
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
	var dataSearch = {
		Search_key : $('#search_key').val(),		
	}
	$.ajax({
        type : "POST",
        url: domen+"/api/Seminar",
        contentType: "application/json; charset=utf-8",
		data: JSON.stringify(dataSearch),
		datatype:"json",
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

	$('#search_key').on('input', function(){
		clearSeminar();
		var dataSearch = {
			Search_key : $(this).val(),		
			
		}
		console.log($(this).val());
		$.ajax({
			type : "POST",
			url: domen+"/api/Seminar",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(dataSearch),
			datatype:"json",
			async:true,
			success : function(response){
				console.log("response "+response);
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
	});
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
				+'<a href="seminar-single.html?id='+seminar.ID+'&status=">'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<a href="seminar-single.html?id='+seminar.ID+'&status=" class="btn btn-primary btn-sm button_register" id="button_register_'+seminar.ID+'"  >View detail</a>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}
function clearSeminar(){
	$('#seminar').empty();
}

