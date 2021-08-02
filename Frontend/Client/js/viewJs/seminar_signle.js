var domen = "https://localhost:44304";
var token = localStorage.getItem('token');

$(document).ready(function(){
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
	$.ajax({
        type : "GET",
        url: domen+"/api/Seminar/"+id,
        headers: {
            Authorization: 'Bearer '+token
        },
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(seminar){
            $('#seminar_detail_name').html(seminar.Name);	
            showSeminarDetail(seminar)
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
       +'<ul class="list-styled">'
         +'<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati unde nulla? Lorem, ipsum dolor. Lorem, ipsum.</li>'
         +'<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati unde nulla? Lorem, ipsum dolor. Lorem, ipsum.</li>'
         +'<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati unde nulla? Lorem, ipsum dolor. Lorem, ipsum.</li>'
         +'<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati unde nulla? Lorem, ipsum dolor. Lorem, ipsum.</li>'
         +'<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati unde nulla? Lorem, ipsum dolor. Lorem, ipsum.</li>'
       +'</ul>'
     +'</div>'
       +'<div class="border-bottom border-primary mt-4"></div>'
     +'</div>'
   +'</div>'
	)
}