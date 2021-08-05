var domain = "https://localhost:44304";
$(document).ready(function () {
    $.ajax({
        type : "GET",
        url: domain+"/api/SupportInfo/",
        contentType: "application/json; charset=utf-8",
        async:true,
        success : function(si){
            $("#companyName").html(si.Company);
            $("#companyTel").html('<a href="tel:'+si.CompanyTel+'" class="text-color">'+si.CompanyTel+'</a></span>');
            $("#companyAddress").html(si.Address);
            $("#supporterName").html(si.Supporter);
            $("#supporterTel").html('<a href="tel:'+si.SupporterTel+'" class="text-color">'+si.SupporterTel+'</a></span>');
        },      
        error: function (response) {
          console.log(response);
        } 
    })
});