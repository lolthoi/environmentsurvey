var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token")


//load all data
$(document).ready(function(){
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		items:4,
		loop: true,
		margin:10,
		autoplay:true,
		autoplayTimeout:2000,
		autoplayHoverPause:true,

		
	});
	
	//get user seminar
	var listUserSeminar = '';
	if(username != null && role!= null && token != null){
		var data = {
			Username : username,		
		}	
		function doWork(response)
		{
			listUserSeminar = response;
		}
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
				doWork(response);
			},       
		});
	}

	// get all seminar

	var dataSearch = {
		Search_key : "",	
		Role : role != null ? role:"",
		FromDate : "",
		ToDate : "",
		Status : 3
	}

	$.ajax({
        type : "POST",
        url: domain+"/api/Seminar?PageNumber=1&PageSize=6",
        contentType: "application/json; charset=utf-8",
		headers: {
			Authorization: 'Bearer '+token
		},
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(dataSearch),
		datatype:"json",
        async:false,
        success : function(response){
			if(role == null || role == "ADMIN"){
				response.ListData.forEach(function(seminar) {
					showSeminar(seminar);					
				});
			}else{
				let lsUserSeminarID =  listUserSeminar.map(item => {return item.SeminarId});
				let listSeminar  = response.ListData.filter(item=> !lsUserSeminarID.includes(item.ID));
				listSeminar.forEach(function(seminar) {
					showSeminar(seminar);
					
				});				
			}			
        },  
		     
    })

	$.ajax({
        type : "GET",
        url: domain+"/api/Report/getGeneralInfor",
		headers: {
			Authorization: 'Bearer '+token
		},
        contentType: "application/json; charset=utf-8",
		datatype:"json",
        async:true,
        success : function(response){
			$('#totalStaff').attr("data-count",response.TotalStaff); 
			$('#totalStudent').attr("data-count",response.TotalStudent); 
			$('#closedSurvey').attr("data-count",response.TotalClosedSurvey); 
			$('#upcomingSurvey').attr("data-count",response.TotalUpcomingSurvey); 
			$('#awards').attr("data-count",response.TotalAwards	); 			
        },       
    })
	

	var dataTopStudent = {
		TimeOrPoint : 0
	}
	$.ajax({
		type : "POST",
		url: domain+"/api/Result/top3Result?PageNumber=1&PageSize=10000",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(dataTopStudent),
		datatype:"json",
		async:true,
		success : function(response){
			if(response.listResult.length > 0){
				response.listResult.forEach(function(result){
					showTop3StudentSurvey(result);
				});
			}else{
				$('#top3Score').html("")
			}	
			
		},       
	})
	
});


function showTop3StudentSurvey(result) {	
	result.Image = result.Image.split("-")[0]    	
    $('.owl-carousel').owlCarousel('add', 
		'<div class="item">'+
			'<div class="card border-0 rounded-0 hover-shadow">'+
				'<img class="card-img-top rounded-0" src="'+result.Image+'" alt="teacher">'+
				'<div class="card-body">'+
					'<h4 class="card-title">'+result.FullName+'</h4>'+
					'<ul class="list-inline seminar_item">'+
						'<li class="list-inline-item"><b>Submit Time : </b>'+result.SubmitTime+' (s)</li>'+
						'<li class="list-inline-item"><b>Point : </b>'+result.point+'</li>'+						
					'</ul>'+
				'</div>'+
			'</div>'+
		'</div>'
    );

   $('.owl-carousel').owlCarousel('refresh');
     
}


//show seminar
function showSeminar(seminar){
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

function showSeminarUpcoming(seminar){
	seminar.Image = seminar.Image.split('-')[0]; 
	$('#upcomingSeminars').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
				+'</ul>'
				+'<p><i class="ti-location-pin text-primary mr-2">'+seminar.Location+'</i></p>'
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


