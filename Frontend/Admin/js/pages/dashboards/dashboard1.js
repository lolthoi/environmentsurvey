/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Newsletter
    // ============================================================== 

    //ct-visits
    new Chartist.Line('#ct-visits', {
        labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        series: [
            [5, 2, 7, 4, 5, 3, 5, 4]
            , [2, 5, 2, 6, 2, 5, 2, 4]
        ]
    }, {
        top: 0,
        low: 1,
        showPoint: true,
        fullWidth: true,
        plugins: [
            Chartist.plugins.tooltip()
        ],
        axisY: {
            labelInterpolationFnc: function (value) {
                return (value / 1) + 'k';
            }
        },
        showArea: true
    });

    var chart = [chart];

    var sparklineLogin = function () {
        $('#sparklinedash').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#7ace4c'
        });
        $('#sparklinedash2').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#7460ee'
        });
        $('#sparklinedash3').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#11a0f8'
        });
        $('#sparklinedash4').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#f33155'
        });
        $('#sparklinedash5').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#e375d6'
        });
        $('#sparklinedash6').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#e3c675'
        });
        $('#sparklinedash7').sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#7597e3'
        });
    }
    var sparkResize;
    $(window).on("resize", function (e) {
        clearTimeout(sparkResize);
        sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();
});

var domen = "https://localhost:44304";
var token = localStorage.getItem('token');
var role = localStorage.getItem("role");
var username = localStorage.getItem("username");

$(document).ready(function(){
    $.ajax({
        type : "GET",
        headers: {
			Authorization: 'Bearer '+token
		},
        url: domen+"/api/Report/getDataReport",
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(response){
            $('#newUser').html(response.TotalNewUsers);
            $('#newReqSeminars').html(response.TotalNewRequestSeminars);
            $('#users').html(response.TotalUsers);
            $('#reqSeminars').html(response.TotalRequestSeminars);
            $('#surveys').html(response.TotalSurveys);
            $('#seminars').html(response.TotalSeminars);    
            $('#Awards').html(response.TotalSurveys*3);
            if(response.Top1Seminar == ""){
                $('#top1seminar').html("No request Register");
            }else{
                $('#top1seminar').html(response.Top1Seminar);
            }
            
            if(response.Top1SeminarPerDay == ""){
                $('#top1SeminarDay').html("No request Register");
            }else{
                $('#top1SeminarDay').html(response.Top1SeminarPerDay);   
            }
              
            $('#top1SeminarDayCount').html(response.Top1SeminarPerDayCount);      
            $('#top1seminarCount').html(response.Top1SeminarCount);      
        },       
    })
});


