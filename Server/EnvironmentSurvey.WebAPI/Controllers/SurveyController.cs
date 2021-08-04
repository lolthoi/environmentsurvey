using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService _surveyService;
        public SurveyController(ISurveyService surveyService)
        {
            _surveyService = surveyService;
        }

        [HttpGet("/api/Seminar/{id:int}/[controller]")]
        public ActionResult<List<SurveyModel>> GetAllSurveyBySeminarId(int id)
        {
            return _surveyService.GetAllSurveyBySeminarId(id);
        }
        [HttpPost]
        public ActionResult<SurveyModel> Create(SurveyModel model)
        {
            return _surveyService.Create(model);
        }
    }
}
