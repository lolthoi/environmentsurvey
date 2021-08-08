let listSeminarOfUser = []
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

  if(username != null && role!= null && token != null){
    var dataLst = {
        Username : username,		
    }
    $.ajax({
        type : "POST",
        url: domen+"/api/UserSeminar/getUserSeminarByUser",
        headers: {
            Authorization: 'Bearer '+token
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(dataLst),
        datatype:"json",
        async:false,
        success : function(response){
            response.forEach(element => {
                var obj = {
                    "seminarID": element.SeminarId,
                    "status": element.Status
                };
                listSeminarOfUser.push(obj)
            });
        },       
    });
}
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
    //  || listSeminarOfUser.includes(id) 
    console.log(listSeminarOfUser)
    let check = false ;
    listSeminarOfUser.forEach(element => {
        if(element.seminarID == id && element.status == 1)
        check = true ;
    });

    if(nowTs >= Date.parse(eachSurvey.StartDate) && nowTs <= Date.parse(eachSurvey.EndDate) && check){
      $('#listSurveyData').append(
      '<div class="col-lg-3 col-sm-6 mb-5">'
        +'<div class="card p-0 border-primary rounded-0 hover-shadow">'
          +'<div class="card-body">'
            +'<ul class="list-inline mb-2">'
              +'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+`${year}-${month}-${day}`+'</li>'
              +'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+`${yearEnd}-${monthEnd}-${dayEnd}`+'</li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Name+'</a></li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Description+'</a></li>'
              +'</ul>'
              +'<button id="start" style="margin-left:25%" onclick="startQuestion('+eachSurvey.Id+')" value="" class="eachSurveyQues button_startbtn btn-primary btn-sm">Start</button>'
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
              +'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+`${year}-${month}-${day}`+'</li>'
              +'<li class="list-inline-item"><i class="ti-calendar mr-1 text-color"></i>'+`${yearEnd}-${monthEnd}-${dayEnd}`+'</li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Name+'</a></li>'
              +'<li class="list-inline-item"><a class="text-color">'+eachSurvey.Description+'</a></li>'
              +'</ul>'
            +'</div>'
          +'</div>'
      +'</div>'
    );
    } 
  }

let questionData = []
let idSurveyPost ;
var token = localStorage.getItem("token")
  function copyData(res){
    questionData = res
  }

let startSurvey = document.getElementById('startSurvey');
//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 15;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = [];
let common = function(id){
	let index = 0;
	let timer = 15;
	let interval = 0;
	start.style.display = "block";
    guide.style.display = "none";
	clearInterval(interval);
    quiz.style.display = "none";
}

function startQuestion(idSurvey){
  idSurveyPost = idSurvey;
  guide.style.display = "block";
  $('#pop-up').modal('show')
  $(".eachSurveyQues"). prop('disabled', true);
  $.ajax({
			type : "GET",
			url: domen+"/api/Survey/"+idSurvey+"/Question",
			headers: {
				Authorization: 'Bearer '+token
			},
			contentType: "application/json; charset=utf-8",
			datatype:"json",
			async:false,
			success : function(response){
				copyData(response);
			},       
		});
}

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
  guide.style.display = "none";
  document.getElementById("focusWhenCloseQuestion").focus();
  $(".eachSurveyQues"). prop('disabled', false);
  $('#pop-up').modal('hide')
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 0) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer--;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);

function loadData() {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = questionData[index].Question;
    document.getElementById("questionText").value = questionData[index].SurveyQuestionId;
    option1.innerText = questionData[index].Answers[0].Answer;
    document.getElementById("option1").value = questionData[index].Answers[0].Id;
    option2.innerText = questionData[index].Answers[1].Answer;
    document.getElementById("option2").value = questionData[index].Answers[1].Id;
    option3.innerText = questionData[index].Answers[2].Answer;
    document.getElementById("option3").value = questionData[index].Answers[2].Id;
    option4.innerText = questionData[index].Answers[3].Answer;
    document.getElementById("option4").value = questionData[index].Answers[3].Id;

    //    timer start
    timer = 15;
}

let count = 0;
function countQuestion(){
  count++;
}
//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
  
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();
    total_correct.innerHTML = count+ ` Of ${questionData.length} Questions`;

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    
});

option1.addEventListener("click", () => {
  UserAns.push({
    "SurveyQuestionId": document.getElementById("questionText").value,
    "AnswerId": document.getElementById("option1").value,
    "UserId": localStorage.getItem("userId")
})});

option2.addEventListener("click", () => {
  UserAns.push({
    "SurveyQuestionId": document.getElementById("questionText").value,
    "AnswerId": document.getElementById("option2").value,
    "UserId": localStorage.getItem("userId")
  })});
option3.addEventListener("click", () => {
  UserAns.push({
    "SurveyQuestionId": document.getElementById("questionText").value,
    "AnswerId": document.getElementById("option3").value,
    "UserId": localStorage.getItem("userId")
  })});
option4.addEventListener("click", () => {
  UserAns.push({
    "SurveyQuestionId": document.getElementById("questionText").value,
    "AnswerId": document.getElementById("option4").value,
    "UserId": localStorage.getItem("userId")
  })});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        
        
        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then questionData.length
    if (index !== questionData.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })
        total_correct.innerHTML = count+ ` Of ${questionData.length} Questions`;
        //question
        loadData();
        //result
        total_correct.style.display = "block";
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;
        //when Quiz Question Complete Display Result Section
        $.ajax({
            type : "POST",
            url: domen+"/api/UserAnswer",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(UserAns),
            success : function(response){
                
            }
        })
        UserAns = [];
        totalAnswer = {};
        clearInterval(interval);
        quiz.style.display = "none";
        result.style.display = "block"
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    result.style.display = "none";
    count = 0;
    $('#pop-up').modal('hide')
    window.location.reload();
});