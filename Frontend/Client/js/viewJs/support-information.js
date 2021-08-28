var domain = "https://localhost:44304";
$(document).ready(function () {
    $.ajax({
        type : "GET",
        url: domain+"/api/SupportInfo",
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(si){
            $("#companyName").html(si.Company);
            $("#companyTel").html(si.CompanyTel);
            $("#companyAddress").html(si.Address);
            $("#supporterName").html(si.Supporter);
            $("#supporterTel").html(si.SupporterTel);
        },      
        error: function (response) {
        } 
    })
});