var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var UserId = localStorage.getItem("userId");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


var listQuestion = '';
var check = "";

$(document).ready(function(){
  checkResultUser(id, UserId);
  if(check){
    SaveResult(id, UserId);
  }
  else{
    window.location.href = "index.html";
  }

});
function doCheck(response){
  check = response;
}

function SaveResult(surveyId, UserId){
  var dataSave = {
    SurveyId : surveyId,
    UserId : UserId
  }
  $.ajax({
    type : "POST",
    url: domain+"/api/Result/saveResultUser",
    headers: {
      Authorization: 'Bearer '+token
    },
    contentType: "application/json; charset=utf-8",
		data: JSON.stringify(dataSave),
		datatype:"json",
		async:false,
    success : function(response){
        if(response == "success"){
          getList();
          pagination(listQuestion);

          $("body").on("click", 'input[type="radio"]', function(){		
            if ($(this).is(':checked'))
            {
              RemoveClass(this)
              $(" label[for='" + this.id + "']").addClass('selected-option');
              $(this).parent().addClass('selected-option');
            }
          });
          clockCountUp(listQuestion);
        }else{
          window.location.href = "seminar-single.html?id=3&status=1";
        }
    },       
  })
}

function checkResultUser(surveyId, userId){
  var checkResult = {
    SurveyId : surveyId,
    UserId : userId
  }
  $.ajax({
    type : "POST",
    url: domain+"/api/Result/checkResultExists",
    headers: {
      Authorization: 'Bearer '+token
    },
    contentType: "application/json; charset=utf-8",
		data: JSON.stringify(checkResult),
		datatype:"json",
		async:false,
    success : function(response){
      doCheck(response);
    },       
  })
}



function pagination(listQuestion, pageNumber = 1){
  listQuestion.forEach(function (question, index) {
    showQuestion(question, index + 1);
    for(var i= 0; i<question.Answers.length; i++ ){
      var text= "";
      if(i == 0){
        text = "A";
      }
      if(i == 1){
        text = "B";
      }
      if(i == 2){
        text = "C";
      }
      if(i == 3){
        text = "D";
      }
      showAnswer(question.Answers[i],question.SurveyQuestionId, index+1, text)
    }
  });

  addButtonSubmit();
  $('#nameSurvey').html(listQuestion[0].NameSurvey);
  var pageSize = 5;
  var listElement = $('#listQuestion').children();

  for(var i=pageSize*pageNumber; i<listElement.length; i++){
      $(listElement[i]).css("display","none")
  }

  if(pageNumber*pageSize + 1 == listElement.length){
    for(var i=(pageNumber -1)*pageSize; i< pageNumber*pageSize + 1; i++){
      $(listElement[i]).css("display","block");
    }
  }

  totalPage = Math.ceil(listQuestion.length/pageSize);

  $('#currentPage').html(pageNumber);


	if(pageNumber == totalPage){
		$('#nextPage').addClass('disableLink');
	}
	if(pageNumber == 1){
		$('#previousPage').addClass('disableLink');
	}	
	$('#nextPage').click(function(){
		pageNumber++
    $('#currentPage').html("");
    $('#currentPage').html(pageNumber);
    $('#previousPage').removeClass('disableLink');
		if(pageNumber <= totalPage){
			for(var i=(pageNumber -1)*pageSize; i<pageNumber*pageSize; i++){
        $(listElement[i]).css("display","block");
      }
      for(var i=0; i<(pageNumber -1)*pageSize; i++){
        $(listElement[i]).css("display","none");
      }
      for(var i=pageNumber*pageSize; i<listElement.length; i++){
        $(listElement[i]).css("display","none");
      }      
			if(pageNumber == totalPage){
        if(pageNumber*pageSize +1 == listElement.length){
          for(var i=(pageNumber -1)*pageSize; i< pageNumber*pageSize + 1; i++){
            $(listElement[i]).css("display","block");
          }
        }
				$(this).addClass('disableLink');
				
			}
		}			
	});
	$('#previousPage').click(function(){
		pageNumber--;
    $('#currentPage').html("");
    $('#currentPage').html(pageNumber);
		if(pageNumber >= 1){
			for(var i=(pageNumber -1)*pageSize; i<pageNumber*pageSize; i++){
        $(listElement[i]).css("display","block");
      }
      for(var i=0; i<(pageNumber -1)*pageSize; i++){
        $(listElement[i]).css("display","none");
      }
      for(var i=pageNumber*pageSize; i<listElement.length; i++){
        $(listElement[i]).css("display","none");
      }      
			if(pageNumber == totalPage){
				$(this).addClass('disableLink');
				$('#previousPage').removeClass('disableLink');
			}


			if(pageNumber <= 1){
				$(this).addClass('disableLink');
				$('#nextPage').removeClass('disableLink');
			}
		}
	})

}

function clockCountUp(listQuestion){
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  var interval = setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  $("body").on("click", '#submit', function(){	
    clearInterval(interval);
    var data = [];	
      var datacheck = [];
      var siblings = $(this).parent().siblings();
      var resultSelect = siblings.children().children().siblings('#options').children().children().siblings('.selected-option').siblings();
      
      for(var i=0; i<resultSelect.length; i++){
        var array = split(resultSelect[i].defaultValue);
        var object = {};
        object['SurveyQuestionId'] = parseInt(array[0]);
        object['AnswerId'] = parseInt(array[1]);
        object['UserId']  = parseInt(UserId);
        datacheck.push(parseInt(array[0]));
        data.push(object);
      }
      var dataNul  = listQuestion.filter(item=> !datacheck.includes(item.SurveyQuestionId));
      dataNul.forEach(function (question) {
        var object = {};
        object['SurveyQuestionId'] = question.SurveyQuestionId;
        object['AnswerId'] = null;
        object['UserId']  = parseInt(UserId);
        data.push(object);
      });
      var dataSave = {
        ListUserAnserModel: data,
        SubmitTime : totalSeconds
      }
      if(role != null && token!= null && username!= null){
        $.ajax({
          type : "POST",
          url: domain+"/api/UserAnswer",
          headers: {
            Authorization: 'Bearer '+token
          },
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(dataSave),
          datatype:"json",
          async:false,
          success : function(response){
            $('#correctAnswer').html(response.point);
            $('#submitTime').html(response.SubmitTime);
            $('#registerModal').modal('hide');
            $('#sucessModal').modal('show');
            setInterval(function(){ 
              if ( $('#sucessModal').attr('aria-hidden')){
                   window.location.href = "myHistory.html";
                 }
            }, 500);
          },       
        });
      }  
  });

}



function RemoveClass(element){
    var parent = $(element).parent();
    parent.siblings().removeClass('selected-option');
    parent.siblings().children().removeClass('selected-option')
}


function split(string){
    return string.split('-')
}

function doWork(response){
  listQuestion = response;
}

// get list question-answer
function getList() {
  $.ajax({
    type: "GET",
    url: domain + "/api/Survey/"+id+"/Question",
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: "application/json; charset=utf-8",
    datatype:"json",
    async:false,
    success: function (response) {
      $('#totalQuestion').html(response.length)
         doWork(response);

    },
  });
}



//show seminar
function showQuestion(model, index) {
    var anser1 = model.Answers[0];
    $("#listQuestion").append(
      '<div class="card mcq-card rounded-0">'+
          '<div class="card-body pt-0 pb-2">'+
              '<h3 style="font-size: 22px;margin: 15px 0">Question '+index+': '+model.Question+'</h3>'+   
              '<ul id="options" class="col-xs-12 options'+index+'">'+
                                
              '</ul>'+
          '</div>'+      
      '</div>'
    );     
}

function showAnswer(answer, SurveyQuestionId, index, text){
  $('#options.options'+index+'').append(
    '<li class="input-group border mb-2  " >'+
        '<input type="radio" class="ml-1 option-radio " id="answer'+answer.Id+'" value="'+SurveyQuestionId+'-'+answer.Id+'" style="opacity: 0;" />'+
        '<label for="answer'+answer.Id+'" class="form-control option-label-radio  option'+text+' rounded-0" style="font-size: 20px;">'+answer.Answer+'</label>'+
    '</li>'
  );
}

function addButtonSubmit(){
  $("#listQuestion").append(
    '<div style="margin-left:850px">'+            
      '<button id="submit" class="btn btn-primary" >Submit</button>'+
    '</div>'
  );
}

function ClearData(){
  $("#list-seminar tbody").empty();
}

