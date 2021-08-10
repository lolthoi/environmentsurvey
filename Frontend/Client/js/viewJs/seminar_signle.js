var domen = "https://localhost:44304";
var token = localStorage.getItem('token');
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const status = urlParams.get('status');


$(document).ready(function(){
	$('#loadListSurvey').load("listSurvey.html");
	$.ajax({
        type : "GET",
        url: domen+"/api/Seminar/"+id,
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(seminar){
            $('#seminar_detail_name').html(seminar.Name);	
            if(status == ""){
              showSeminarDetail(seminar);
            }else if(status == 1){
              showSeminarDetailRegistered(seminar);
            }else{
              showSeminarDetailRegisteringOrDecline(seminar);
            }
        },       
    })
})

function showSeminarDetail(seminar){
	$('#seminar_detail').append(
		'<div class="row">'
            +'<div class="col-12 mb-4">'
            +'<img src="'+domen+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
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
       +'<div id="loadListSurvey"></div>'
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
            +'<img src="'+domen+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
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
       +'<ul class="list-styled">'
     +'</div>'      
     +'</div>'
   +'</div>'
	)
}
function showSeminarDetailRegistered(seminar){
	$('#seminar_detail').append(
		'<div class="row">'
            +'<div class="col-12 mb-4">'
            +'<img src="'+domen+'/Images/'+seminar.Image+'" class="img-fluid w-100">'
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
				url: domen+"/api/UserSeminar/SeminarRegistration",
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