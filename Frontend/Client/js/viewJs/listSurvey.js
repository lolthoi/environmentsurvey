
$(document).ready(function(){
    $(this).scrollTop(0);
	$.ajax({
			type : "GET",
			url: domen+"/api/Seminar/"+id+"/Survey",
			headers: {
				Authorization: 'Bearer '+token
			},
			contentType: "application/json; charset=utf-8",
			datatype:"json",
			async:false,
			success : function(response){
				showSurvey(response);
			},       
		});
  });

  function showSurvey(res){
    res.forEach(showEachSurvey);
  }

  function showEachSurvey(eachSurvey){
    let startDateOfSurvey = new Date(Date.parse(eachSurvey.StartDate)).toString();
    var date = new Date(startDateOfSurvey); // Date 2011-05-09T06:08:45.178Z
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    let endDateOfSurvey = new Date(Date.parse(eachSurvey.EndDate)).toString();
    var dateEnd = new Date(endDateOfSurvey); // Date 2011-05-09T06:08:45.178Z
    var yearEnd = dateEnd.getFullYear();
    var monthEnd = ("0" + (dateEnd.getMonth() + 1)).slice(-2);
    var dayEnd = ("0" + dateEnd.getDate()).slice(-2);
    let nowTs = Date.now();
    if((nowTs >= Date.parse(eachSurvey.StartDate) && nowTs <= Date.parse(eachSurvey.EndDate) && status == 1) || role == "ADMIN"){
      $('#listSurveyData').append(
      '<div class="col-lg-3 col-sm-6 mb-5">'
        +'<div class="card p-0 border-primary rounded-0 hover-shadow">'
          +'<div class="card-body">'
            +'<ul class="list-inline mb-2">'
              +'<li class="list-inline-item">Start time: <i class="ti-calendar mr-1 text-color"></i>'+`${year}-${month}-${day}`+'</li>'
              +'<li class="list-inline-item" style="margin-bottom : 10px">End time: <i class="ti-calendar mr-1 text-color"></i>'+`${yearEnd}-${monthEnd}-${dayEnd}`+'</li>'
              +'<li class="list-inline-item" style="font-weight:bold !important"><a class="text-color">'+eachSurvey.Name+'</a></li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Description+'</a></li>'
              +'</ul>'
              +'<a href="questionSurvey.html?id='+eachSurvey.Id+'" class="btn btn-primary btn-sm button_register">Start Survey Now</a>'
            +'</div>'
          +'</div>'
      +'</div>'
    );
    }else{
      $('#listSurveyData').append(
      '<div class="col-lg-3 col-sm-6 mb-5">'
        +'<div class="card p-0 border-primary rounded-0 hover-shadow">'
          +'<div class="card-body">'
            +'<ul class="list-inline mb-2">'
              +'<li class="list-inline-item">Start time: <i class="ti-calendar mr-1 text-color"></i>'+`${year}-${month}-${day}`+'</li>'
              +'<li class="list-inline-item" style="margin-bottom : 10px">End time: <i class="ti-calendar mr-1 text-color"></i>'+`${yearEnd}-${monthEnd}-${dayEnd}`+'</li>'
              +'<li class="list-inline-item"><a class="text-color" style="font-weight:bold !important">'+eachSurvey.Name+'</a></li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Description+'</a></li>'
              +'</ul>'
            +'</div>'
          +'</div>'
      +'</div>'
    );
    } 
  }
