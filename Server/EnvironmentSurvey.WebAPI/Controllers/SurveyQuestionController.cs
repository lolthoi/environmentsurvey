using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyQuestionController : ControllerBase
    {
        private readonly ISurveyQuestionService _surveyQuestionService;

        [HttpGet("/api/Survey/{id:int}/[controller]")]
        public ActionResult<List<SurveyQuestionModel>> GetAllBySurveyId(int id)
        {
            return _surveyQuestionService.GetAllBySurveyId(id);
        }
    }
}
