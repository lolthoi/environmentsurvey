var domain = "https://localhost:44304";
var role = sessionStorage.getItem("role");
var username = sessionStorage.getItem("username");
var token = sessionStorage.getItem("token")
var totalPage1 ='';
$(document).ready(function(){
	callAjax(pageNumber = 1);
	pagination(pageNumber = 1, totalPage1 );
})
function getTotal(total){
	totalPage1 = total;
}
function callAjax(pageNumber){
	var data = {
		Username : username,		
	}	
	var listUserSeminar = '';
	function doWork(response)
	{
		listUserSeminar = response;
	}
	if(role != null && token!= null && username!= null){
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
		Search_key : $('#search_key').val(),	
		Role : role != null ? role:"",
		FromDate : "",
		ToDate : "",
		Status : 3
	}
	var totalPage = "";
	function getTotalPage(total){
		totalPage = total;		
	}
	
	$.ajax({
        type : "POST",
        url: domain+"/api/Seminar?PageNumber="+pageNumber+"&PageSize=6",
        contentType: "application/json; charset=utf-8",
		headers: {
			Authorization: 'Bearer '+token
		},
		data: JSON.stringify(dataSearch),
		datatype:"json",
        async:false,
        success : function(response){

			getTotalPage(response.TotalPage);
			//sessionStorage.setItem("response",response);
			if(role == null || role == "ADMIN"){
				response.ListData.forEach(function(seminar) {
					showSeminar(seminar);					
				});
				$('#currentPage').html(response.PageNumber)
			}else{
				let lsUserSeminarID =  listUserSeminar.map(item => {return item.SeminarId});
				let listSeminar  = response.ListData.filter(item=> !lsUserSeminarID.includes(item.ID));
				listSeminar.forEach(function(seminar) {
					showSeminar(seminar);
					
				});				
			}			
        },  
		     
    })
	getTotal(totalPage)
	$('#search_key').on('input', function(){
		clearSeminar();
		var dataSearch = {
			Search_key : $(this).val(),	
			Role : role!=null ? role:"",
			FromDate : "",
			ToDate : ""
		}
		$.ajax({
			type : "POST",
			url: domain+"/api/Seminar?PageNumber="+pageNumber+"&PageSize=6",
			contentType: "application/json; charset=utf-8",
			headers: {
				Authorization: 'Bearer '+token
			},
			data: JSON.stringify(dataSearch),
			datatype:"json",
			async:true,
			success : function(response){
				if(role == null || role == "ADMIN"){
					response.ListData.forEach(function(seminar) {
						showSeminar(seminar);					
					});
					$('#currentPage').html(response.PageNumber)
				}else{
					let lsUserSeminarID =  listUserSeminar.map(item => {return item.SeminarId});
					let listSeminar  = response.ListData.filter(item=> !lsUserSeminarID.includes(item.ID));
					listSeminar.forEach(function(seminar) {
						showSeminar(seminar);						
					});	
					$('#currentPage').html(response.PageNumber)			
				}
			},       
		})
	});

}


//?PageNumber=2&PageSize=2
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

//pagination
function pagination(pageNumber = 1,totalPage){
	$('#currentPage').html(pageNumber);
	if(pageNumber == totalPage){
		$('#nextPage').addClass('disableLink');
	}
	if(pageNumber == 1){
		$('#previousPage').addClass('disableLink');
	}	
	$('#nextPage').click(function(){
		pageNumber++
		clearSeminar();
		if(pageNumber <= totalPage){
			callAjax(pageNumber);	
			if(pageNumber == totalPage){
				$(this).addClass('disableLink');
				$('#previousPage').removeClass('disableLink');
			}
		}			
	});
	$('#previousPage').click(function(){
		pageNumber--;
		clearSeminar();
		if(pageNumber >= 1){
			callAjax(pageNumber);	
			if(pageNumber <= 1){
				$(this).addClass('disableLink');
				$('#nextPage').removeClass('disableLink');
			}
		}
	})
}

