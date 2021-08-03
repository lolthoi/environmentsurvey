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
    public class UserAnswerController : ControllerBase
    {
        private readonly IUserAnswerService _userAnswerService;
        public UserAnswerController(IUserAnswerService userAnswerService)
        {
            _userAnswerService = userAnswerService;
        }
        // GET: api/<UserAnswerController>
        [HttpGet]
        public ActionResult<List<UserAnswerModel>> GetAll()
        {
            return _userAnswerService.GetAll();
        }

        // GET api/<UserAnswerController>/5
        [HttpGet("/api/User/{userId:int}/Survey/{surveyId:int}")]
        public ActionResult<List<UserAnswerModel>> GetByUserSurvey(int userId, int surveyId)
        {
            return _userAnswerService.GetByUserSurvey(userId, surveyId);
        }

        // POST api/<UserAnswerController>
        [HttpPost]
        public ActionResult<List<UserAnswerModel>> Create(List<UserAnswerModel> model)
        {
            return _userAnswerService.Create(model);
        }

        // DELETE api/<UserAnswerController>/5
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            return _userAnswerService.Delete(id);
        }
    }
}
