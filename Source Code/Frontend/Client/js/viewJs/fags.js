var domain = "https://localhost:44304";
$.ajax({
  type: "GET",
  url: domain + "/api/FAQs",
  contentType: "application/json; charset=utf-8",
  async: true,
  success: function (response) {
    response.forEach(function (faq) {
      showFAQs(faq);
    });
  },
});
//show faqs
function showFAQs(faq) {
  $("#accordionExample").append(
    '<div class="card">'
    +'<div class="card-header " id="heading'+faq.ID+'">'
      +'<h2 class="mb-0">'
        +'<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+faq.ID+'"'
         + 'aria-expanded="false" aria-controls="collapse'+faq.ID+'">'
          + faq.Issue
        +'</button>'
      +'</h2>'
    +'</div>'
    +'<div id="collapse'+faq.ID+'" class="collapse" aria-labelledby="heading'+faq.ID+'" data-parent="#accordionExample">'
    +'<div class="card-body">'
        +faq.Solution
        +'</div>'
      +'</div>'
    +'</div>'
  );
}
