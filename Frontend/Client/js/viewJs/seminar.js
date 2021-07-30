var domen = "https://localhost:44304";

$(document).ready(function(){
	$.ajax({
        type : "GET",
        url: domen+"/api/Seminar",
        // headers: {
        //     Authorization: 'Bearer '+token
        // },
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(data),
        //datatype:"json",
        async:true,
        success : function(response){
            console.log(response);
			response.forEach(function(seminar) {
				showSeminar(seminar);
			});
			
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
				+'<a href="course-single.html">'
				+'<h4 class="card-title">'+seminar.Name+'</h4>'
				+'</a>'
				+'<p class="card-text mb-4 seminar_desc">'+seminar.Description+' </p>'
				+'<a href="course-single.html" class="btn btn-primary btn-sm">Apply now</a>'
			+'</div>'
			+'</div>'
		+'</div>'
	)
}