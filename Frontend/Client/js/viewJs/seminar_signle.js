var domain = "https://localhost:44304";
var token = localStorage.getItem('token');
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var userId = localStorage.getItem("userId");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const status = urlParams.get('status');


var listSurvey = '';
var listSurveyJoined = '';
$(document).ready(function(){
	//$('#loadListSurvey').load("listSurvey.html");
    getListSurveyUserJoined();
    $.ajax({
        type : "GET",
        url: domain+"/api/Seminar/"+id+"/Survey",
        headers: {
          Authorization: 'Bearer '+token
        },
        contentType: "application/json; charset=utf-8",
        async:false,
        success : function(response){
            getListSurvey(response)
        },       
    })
    showSeminar_survey(listSurvey, listSurveyJoined);
    
})

function getRelatedSeminar(subject, IdSeminar){
  $.ajax({
    type : "GET",
    url: domain+"/api/Seminar/getSeminarRelated?subject="+subject+"&idSeminar="+IdSeminar+"",
    headers: {
      Authorization: 'Bearer '+token
    },
    contentType: "application/json; charset=utf-8",
    async:false,
    success : function(response){
      response.forEach(function(seminar){
        showSeminarRelate(seminar)
      })
      
    },       
})
}


function getListSurvey(response){
  listSurvey = response;
}

function showSeminar_survey(listSurvey, listsurveyJoined){
  $.ajax({
    type : "GET",
    url: domain+"/api/Seminar/"+id,
    headers: {
      Authorization: 'Bearer '+token
    },
    contentType: "application/json; charset=utf-8",
    async:true,
    success : function(seminar){
        $('#seminar_detail_name').html(seminar.Name);	
        if(status == "" ){
          getRelatedSeminar(seminar.Subject.Subject, id)
          showSeminarDetail(seminar);
          listSurvey.forEach(function(survey) {
            showListSurveyPendingDecline(survey)
					});
        }else if(status == 1 ){
          showSeminarDetailRegistered(seminar);
          getRelatedSeminar(seminar.Subject.Subject, id)
          let listSurveyJoining  = listSurvey.filter(item=> !listsurveyJoined.includes(item.Id));
          let listSurveyJoined  = listSurvey.filter(item=> listsurveyJoined.includes(item.Id));
          listSurveyJoined.forEach(function(survey) {
            showListSurveyRegisted(survey, false);
					});
          listSurveyJoining.forEach(function(survey) {
            showListSurveyRegisted(survey, true);
					});
         
        }else{
          showSeminarDetailRegisteringOrDecline(seminar);
          getRelatedSeminar(seminar.Subject.Subject, id)
          listSurvey.forEach(function(survey) {
            showListSurveyPendingDecline(survey)
					});
          
        }
    },       
  })
}

function getlistJoined(response){
  listSurveyJoined = response;
}

function getListSurveyUserJoined(){
  $.ajax({
    type : "GET",
    url: domain+"/api/Result/getAllUserResultJoined?userId="+userId,
    headers: {
      Authorization: 'Bearer '+token
    },
    contentType: "application/json; charset=utf-8",
		datatype:"json",
		async:false,
    success : function(response){
      getlistJoined(response)
    },       
  })
}

function showListSurveyRegisted(survey, check){
  var arrayStartTime = survey.StartDate.split(' ');
  var arrayEndTime = survey.StartDate.split(' ');
  var text = "";
  if(survey.Status == 1){
    text = "Closed";
  }
  if(survey.Status == 2 && check == false){
    text = "Closed";
  }
  if(survey.Status == 2 && check == true){
    text = "Start";
  }
  
  if(survey.Status == 3){
    text = "Planned";
  }
   $('#listSurvey').append(
    '<div class="col-4 mb-4 ">'+
    '<div class="card p-0 border-primary rounded-0 hover-shadow">'+
      '<div class="card-body ">'+
        '<ul class="list-inline mb-2 seminar_item ">'+
        '<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>Start Date</li>'+
        '<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>End Date</li>'+
        '</ul>'+
        '<ul class="list-inline mb-2 seminar_item ">'+
          '<li class="list-inline-item">'+arrayStartTime[0]+'</li>'+
          '<li class="list-inline-item">'+arrayEndTime[0]+'</li>'+
        '</ul>'+
        '<ul class="list-inline mb-2 seminar_item ">'+
          '<li class="list-inline-item">'+arrayStartTime[1]+' '+arrayStartTime[2]+'</li>'+
          '<li class="list-inline-item">'+arrayEndTime[1]+' '+arrayEndTime[2]+'</li>'+
        '</ul>'+
        '<h4 class="card-title '+text+'-text" style="height:50px">'+survey.Name+'</h4>'+
        // '<p class="card-text mb-4 seminar_desc">'+survey.Description+'</p>'+
        '<a href="survey_detail.html?id='+survey.Id+'" style="margin-left: 30%;" class="btn btn-primary btn-sm '+text+' " id="startSurvey'+survey.Id+'">'+text+'</a>'+
      '</div>'+
    '</div>'+
  '</div>'
   );
}


function showListSurveyPendingDecline(survey){
  var arrayStartTime = survey.StartDate.split(' ');
  var arrayEndTime = survey.StartDate.split(' ');
   $('#listSurvey').append(
    '<div class="col-4 mb-4 ">'+
    '<div class="card p-0 border-primary rounded-0 hover-shadow">'+
      '<div class="card-body ">'+
        '<ul class="list-inline mb-2 seminar_item ">'+
        '<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>Start Date</li>'+
        '<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>End Date</li>'+
        '</ul>'+
        '<ul class="list-inline mb-2 seminar_item ">'+
          '<li class="list-inline-item">'+arrayStartTime[0]+'</li>'+
          '<li class="list-inline-item">'+arrayEndTime[0]+'</li>'+
        '</ul>'+
        '<ul class="list-inline mb-2 seminar_item ">'+
          '<li class="list-inline-item">'+arrayStartTime[1]+' '+arrayStartTime[2]+'</li>'+
          '<li class="list-inline-item">'+arrayEndTime[1]+' '+arrayEndTime[2]+'</li>'+
        '</ul>'+
        '<h4 class="card-title" style="height:50px">'+survey.Name+'</h4>'+
        // '<p class="card-text mb-4 seminar_desc">'+survey.Description+'</p>'+
      '</div>'+
    '</div>'+
  '</div>'
   );
}

function showSeminarDetail(seminar){
	$('#seminar_detail').append(
		'<div class="row">'
            +'<div class="col-12 mb-4">'
            +'<img src="'+domain+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
            +'</div>'
        +'</div>'
    +'<div class="row align-items-center mb-5 seminar_item">'
      +'<div class="col-xl-8 order-1 col-sm-6 mb-4 mb-xl-0">'
        +'<h2>'+seminar.Name+'</h2>'
     +'</div>'
     +'<div class="col-xl-4 order-sm-3 order-xl-2 col-12 order-2">'
       +'<ul class="list-inline text-xl-center">'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-alarm-clock text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">DURATION</h6>'
               +'<p class="mb-0">03 Hours</p>'
             +'</div>'
           +'</div>'
         +'</li>'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-user text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">TEACHER</h6>'
               +'<p class="mb-0">'+seminar.Author+'</p>'
             +'</div>'
           +'</div>'
         +'</li>'
       +'</ul>'
     +'</div>'

     +'<div class="col-12 mt-4 order-4">'
       +'<div class="border-bottom border-primary"></div>'
     +'</div>'
   +'</div>'
   +'<div class="row">'
     +'<div class="col-12 mb-4">'
       +'<h3>About Seminar</h3>'
       +'<p>'+seminar.Description+'</p>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Location and Time</h3>'
       +'<div class="col-12 px-0">'
         +'<div class="row">'
           +'<div class="col-md-6">'
               +'<h4><i class="ti-location-pin text-primary mr-2"></i>Location</h4>'
                +'<p>The seminar will be held in '+seminar.Location+'</p>'
           +'</div>'
           +'<div class="col-md-6">'
             +'<h4><i class="ti-timer text-primary mr-2"></i>Time</h4>'
             +'<p><b>From</b>: '+seminar.StartDate+'   &emsp;&emsp;&emsp;  <b>To</b>: '+seminar.EndDate+'</p>'
         +'</div>'
         +'</div>'
       +'</div>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Survey</h3>'
       +'<p><b>Description</b>: These are all surveys you can participate in this workshop. Each survey can only be taken once. After Click Submit, you can see the number of correct answers and the time it took to complete the survey. You can <a href="http://127.0.0.1:5500/Client/myHistory.html">Click Here</a> to see your current ranking.</p>'
       +'<div class="row" id="listSurvey">'
       
       +'</div>'
     +'</div>'
     +'<div class="col-12 mb-4">'
      +'<button type="button" class="btn btn-primary btn-sm button_register" data-name="'+seminar.Name+'" ">Register Now</button>'
     +'</div>'
       
     +'</div>'
   +'</div>'
	)
}

function showSeminarDetailRegisteringOrDecline(seminar){
	$('#seminar_detail').append(
		'<div class="row">'
            +'<div class="col-12 mb-4">'
            +'<img src="'+domain+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
            +'</div>'
        +'</div>'
    +'<div class="row align-items-center mb-5 seminar_item">'
      +'<div class="col-xl-8 order-1 col-sm-6 mb-4 mb-xl-0">'
        +'<h2>'+seminar.Name+'</h2>'
     +'</div>'
     +'<div class="col-xl-4 order-sm-3 order-xl-2 col-12 order-2">'
       +'<ul class="list-inline text-xl-center">'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-alarm-clock text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">DURATION</h6>'
               +'<p class="mb-0">03 Hours</p>'
             +'</div>'
           +'</div>'
         +'</li>'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-user text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">TEACHER</h6>'
               +'<p class="mb-0">'+seminar.Author+'</p>'
             +'</div>'
           +'</div>'
         +'</li>'
       +'</ul>'
     +'</div>'

     +'<div class="col-12 mt-4 order-4">'
       +'<div class="border-bottom border-primary"></div>'
     +'</div>'
   +'</div>'
   +'<div class="row">'
     +'<div class="col-12 mb-4">'
       +'<h3>About Seminar</h3>'
       +'<p>'+seminar.Description+'</p>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Location and Time</h3>'
       +'<div class="col-12 px-0">'
         +'<div class="row">'
           +'<div class="col-md-6">'
               +'<h4><i class="ti-location-pin text-primary mr-2"></i>Location</h4>'
                +'<p>The seminar will be held in '+seminar.Location+'</p>'
           +'</div>'
           +'<div class="col-md-6">'
             +'<h4><i class="ti-timer text-primary mr-2"></i>Time</h4>'
             +'<p><b>From</b>: '+seminar.StartDate+'   &emsp;&emsp;&emsp;  <b>To</b>: '+seminar.EndDate+'</p>'
         +'</div>'
         +'</div>'
       +'</div>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Survey</h3>'
       +'<p><b>Description</b>: These are all surveys you can participate in this workshop. Each survey can only be taken once. After Click Submit, you can see the number of correct answers and the time it took to complete the survey. You can <a href="http://127.0.0.1:5500/Client/myHistory.html">Click Here</a> to see your current ranking.</p>'
       +'<div class="row" id="listSurvey">'
       
       +'</div>'
     +'</div>'      
     +'</div>'
   +'</div>'
	)
}

function showSeminarDetailRegistered(seminar){
	$('#seminar_detail').append(
		'<div class="row">'
            +'<div class="col-12 mb-4">'
            +'<img src="'+domain+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
            +'</div>'
        +'</div>'
    +'<div class="row align-items-center mb-5 seminar_item">'
      +'<div class="col-xl-8 order-1 col-sm-6 mb-4 mb-xl-0">'
        +'<h2>'+seminar.Name+'</h2>'
     +'</div>'
     +'<div class="col-xl-4 order-sm-3 order-xl-2 col-12 order-2">'
       +'<ul class="list-inline text-xl-center">'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-alarm-clock text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">DURATION</h6>'
               +'<p class="mb-0">03 Hours</p>'
             +'</div>'
           +'</div>'
         +'</li>'
         +'<li class="list-inline-item mr-4 mb-3 mb-sm-0">'
           +'<div class="d-flex align-items-center">'
             +'<i class="ti-user text-primary icon-md mr-2"></i>'
             +'<div class="text-left">'
               +'<h6 class="mb-0">TEACHER</h6>'
               +'<p class="mb-0">'+seminar.Author+'</p>'
             +'</div>'
           +'</div>'
         +'</li>'
       +'</ul>'
     +'</div>'

     +'<div class="col-12 mt-4 order-4">'
       +'<div class="border-bottom border-primary"></div>'
     +'</div>'
   +'</div>'
   +'<div class="row">'
     +'<div class="col-12 mb-4">'
       +'<h3>About Seminar</h3>'
       +'<p>'+seminar.Description+'</p>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Location and Time</h3>'
       +'<div class="col-12 px-0">'
         +'<div class="row">'
           +'<div class="col-md-6">'
               +'<h4><i class="ti-location-pin text-primary mr-2"></i>Location</h4>'
                +'<p>The seminar will be held in '+seminar.Location+'</p>'
           +'</div>'
           +'<div class="col-md-6">'
             +'<h4><i class="ti-timer text-primary mr-2"></i>Time</h4>'
             +'<p><b>From</b>: '+seminar.StartDate+'   &emsp;&emsp;&emsp;  <b>To</b>: '+seminar.EndDate+'</p>'
         +'</div>'
         +'</div>'
       +'</div>'
     +'</div>'
     +'<div class="col-12 mb-4">'
       +'<h3 class="mb-3">Survey</h3>'
       +'<p><b>Description</b>: These are all surveys you can participate in this workshop. Each survey can only be taken once. After Click Submit, you can see the number of correct answers and the time it took to complete the survey. You can <a href="http://127.0.0.1:5500/Client/myHistory.html">Click Here</a> to see your current ranking.</p>'
       +'<div class="row" id="listSurvey">'
       
       +'</div>'
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
			var nameSeminar = $(this).attr("data-name");
			var data = {
				Username : username,
				SeminarId : id
			}
			var clickButton = this;			
			$.ajax({
				
				type : "POST",
				url: domain+"/api/UserSeminar/SeminarRegistration",
				headers: {
					Authorization: 'Bearer '+token
				},
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				datatype:"json",
				async:true,
				success : function(response){
          console.log();
					if(response == "Register success"){
						var messageSucess = 'Thanks you for Registering seminar: <span style="color: black; font-size:18px">'+nameSeminar+'</span>. The result of registration for the seminar will be notified via email after 24 hours. Please check your email.'
						$('#message_register_seminar').html(messageSucess);
						$('#message_register_seminar').css("color","green");
						$('#registerModal').modal('hide');
						$('#registerSeminarModal').modal('show');
						$(clickButton).html("");
						$(clickButton).html("Processing");
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

function showSeminarRelate(seminar){
	$('#relatedSeminar').append(
		'<div class="col-lg-4 col-sm-6 mb-5">'
			+'<div class="card p-0 border-primary rounded-0 hover-shadow">'
			+'<img class="card-img-top rounded-0 seminar_picture" style="height=200px!important" src="'+domain+'/Images/'+seminar.Image+'" alt="course thumb">'
			+'<div class="card-body">'
				+'<ul class="list-inline mb-2 seminar_item">'
				+'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+seminar.StartDate+'</li>'
				+'<li class="list-inline-item"><a class="text-color" href="#">'+seminar.Subject.Subject+'</a></li>'
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

$(document).ready(function() {
	$("body").on("click", ".take_survey", function(){		
		if(username != null && token != null && role != null){
			var endDate = $(this).attr("data-endDate");
      var dtnow = Date.now().toString();
			if(dtnow >= endDate){
        window.location.href = "";
      }else{
        var messageSucess = 'You can only do the survey after the seminar is over, please wait. Thanks you!'
        $('#message_register_seminar').html(messageSucess);
        $('#message_register_seminar').css("color","green");
        $('#registerSeminarModal').modal('show');
      }
		}	
	});
	
});