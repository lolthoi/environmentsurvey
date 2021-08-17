const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const surveyId = urlParams.get('id');
let userAnswerData = [];
let listSurveyQuestionId = [];
let dataQuestion = {};
let totalPage = 0;
let currentPage = 0 ;
let dataQuestionEachPage= [];
var domain = "https://localhost:44304";
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");
var token = localStorage.getItem("token")

$(document).ready(function(){
  $.ajax({
			type : "GET",
			url: domain+"/api/Survey/"+surveyId+"/Question",
			headers: {
				Authorization: 'Bearer '+token
			},
			contentType: "application/json; charset=utf-8",
			datatype:"json",
			async:false,
			success : function(response){
				dataQuestion = response;
        dataQuestion.forEach(
          (each) => {
            userAnswerData.push({
              "SurveyQuestionId": each.SurveyQuestionId,
              "AnswerId": null,
              "UserId": localStorage.getItem("userId")
              })
          }
        );
        
			},       
		});
  dataQuestion.forEach(
    (currentQuestion) => {
        listSurveyQuestionId.push(currentQuestion.SurveyQuestionId);
    }
  );
  while(dataQuestion.length > 5){
    pageQst = dataQuestion.slice(0,5);
    dataQuestion = dataQuestion.slice(5);
    dataQuestionEachPage[totalPage] = pageQst;
    totalPage++;
  }
  dataQuestionEachPage[totalPage] = dataQuestion;
  buildQuiz(dataQuestionEachPage[currentPage]);
});

let indexQuestion = 0;
function buildQuiz(dataQuestionThisPage){
    // variable to store the HTML output
    const output = [];
    // for each question...
    if(currentPage < totalPage){
      $('#submit').empty();
      $('#previousPage').empty();
      if(currentPage != 0){
        $('#previousPage').append(`<button id="previousPageQuestion" onclick="previousPageQuestion()">Quay lại</button>`);
      }
      $('#nextPage').append(`<button id="nextPageQuestion" onclick="nextPageQuestion()">Tiếp tục</button>`);
      dataQuestionThisPage.forEach(
          (currentQuestion) => {
              let _answers = currentQuestion.Answers;
              indexQuestion++;
            // variable to store the list of possible answers
            const answers = [];
            _answers.forEach((eachAnswer) => {
              answers.push(
                  `<div style="width:100%">
                    <label>
                        <input type="radio" value="${eachAnswer.Id}" id="${eachAnswer.Id}" name="${currentQuestion.SurveyQuestionId}">${eachAnswer.Answer}
                    </label>
                  </div>`
                );
              });
    
            // add this question and its answers to the output
            output.push(
              `<div class="question">${indexQuestion} :  ${currentQuestion.Question} </div>
              <div class="answers"> ${answers.join('')} </div>`
            );
          }
        );
    }else{
        $('#nextPage').empty();
        $('#previousPage').append(`<button id="previousPageQuestion" onclick="previousPageQuestion()">Quay lại</button>`);
        $('#submit').append(`<button id="submitData" onclick="submit()">Hoàn thành</button>`);
        dataQuestionThisPage.forEach(
          (currentQuestion) => {
            indexQuestion++;
            let _answers = currentQuestion.Answers;
            // variable to store the list of possible answers
            const answers = [];
            _answers.forEach((eachAnswer) => {
              answers.push(
                  `<div style="width:100%">
                    <label>
                        <input type="radio" value="${eachAnswer.Id}" id="${eachAnswer.Id}" name="${currentQuestion.SurveyQuestionId}">${eachAnswer.Answer}
                    </label>
                  </div>`
                );
              });

            // add this question and its answers to the output
            output.push(
              `<div class="question">${indexQuestion} :  ${currentQuestion.Question} </div>
              <div class="answers"> ${answers.join('')} </div>`
            );
          }
        );
  }
    
    quizContainer.innerHTML = output.join('');
  }


const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
  

function previousPageQuestion(){
  currentPage--;
  indexQuestion -=10;
  listSurveyQuestionId.forEach(
    (surveyQuestionId) => {
        var ele = document.getElementsByName(surveyQuestionId);
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
                userAnswerData.forEach(function(obj) {
                    if(obj.SurveyQuestionId == surveyQuestionId) {
                        obj.AnswerId = ele[i].value;
                    }
                });
            }
        }
    }
  );  
  buildQuiz(dataQuestionEachPage[currentPage]);
  
  
  dataQuestionEachPage[currentPage].forEach(
    (eachQuestion) => {
      userAnswerData.forEach(function(obj) {
        if(obj.SurveyQuestionId == eachQuestion.SurveyQuestionId && obj.AnswerId != null) {
          $('#' + obj.AnswerId).prop('checked',true);
        }
      });
      
    }
  );
  window.scrollTo(0, 0);
}

function nextPageQuestion(){
  currentPage++;
  
  listSurveyQuestionId.forEach(
      (surveyQuestionId) => {
          var ele = document.getElementsByName(surveyQuestionId);
          for(i = 0; i < ele.length; i++) {
              if(ele[i].checked){
                  userAnswerData.forEach(function(obj) {
                      if(obj.SurveyQuestionId == surveyQuestionId) {
                          obj.AnswerId = ele[i].value;
                      }
                  });
              }
          }
      }
  );
  buildQuiz(dataQuestionEachPage[currentPage]);
  dataQuestionEachPage[currentPage].forEach(
    (eachQuestion) => {
      userAnswerData.forEach(function(obj) {
        if(obj.SurveyQuestionId == eachQuestion.SurveyQuestionId && obj.AnswerId != null) {
          $('#' + obj.AnswerId).prop('checked',true);
        }
      });
      
    }
  );
  window.scrollTo(0, 0);
}

function submit(){
    listSurveyQuestionId.forEach(
        (surveyQuestionId) => {
            var ele = document.getElementsByName(surveyQuestionId);
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                    userAnswerData.forEach(function(obj) {
                        if(obj.SurveyQuestionId == surveyQuestionId) {
                            obj.AnswerId = ele[i].value;
                        }
                    });
                }
                
            }
        }
    );
    $('#containerTime').empty();
    let finishTime = Date.now();
    let timeSubmit = finishTime - startTimeSurvey;
    let totalDataUserAnswer = []
    totalDataUserAnswer.push(userAnswerData);
    totalDataUserAnswer.push(timeSubmit);
    // $.ajax({
    //     type : "POST",
    //     url: domain+"/api/UserAnswer",
    //     contentType: "application/json; charset=utf-8",
    //     data: JSON.stringify(totalDataUserAnswer),
    //     success : function(response){
    //       console.log(response)   
    //     }
    // })

    // Swal.fire({
    //   title: 'You have completed the survey',
    //   text: "You score : 9",
    //   icon: 'success',
    //   allowOutsideClick: false,
    //   showCancelButton: false,
    //   confirmButtonColor: '#3085d6',
    //   confirmButtonText: 'Close'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     location = "seminars.html"
    //   }
    // });

    Swal.fire({
      title: 'You have completed the survey',
      text: "You score : 1",
      icon: 'error',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        location = "seminars.html"
      }
    });
    indexQuestion = 0;
}

let startTimeSurvey = 0;
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  startTimeSurvey = Date.now();
  setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer <= 0) {
          timer = duration;
          submit();
      }
  }, 1000);
}

$(document).ready(function(){
  var twentyfiveminutes = 15 * 60,
      display = document.querySelector('#time');
  startTimer(twentyfiveminutes, display);
  });