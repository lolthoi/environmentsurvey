using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly IResultService _resultService;
        public ResultController(IResultService resultService)
        {
            _resultService = resultService;
        }

        [HttpGet]
        [Route("getUserResult")]
        [Authorize(Roles = "ADMIN, STUDENT, EMPLOYEE")]
        public async Task<ResponsePagedModel> getResult([FromQuery] PaginationClientModel paginationClientModel,int userId)
        {
            return await _resultService.showResultUser(paginationClientModel , userId);
        }

        [HttpPost("getResultBySurveyId")]
        [Authorize(Roles = "ADMIN, STUDENT, EMPLOYEE")]
        public async Task<ResponsePagedModel> getResultBySurveyId([FromQuery] PaginationClientModel paginationClientModel, int surveyId, SearchModel model)
        {
            return await _resultService.showResultBySurveyId(paginationClientModel, surveyId, model);
        }

        [HttpGet("getInfor")]
        [Authorize(Roles = "ADMIN")]
        public async Task<List<InforTakeSurveyModel>> getInfor( int seminarId)
        {
            return await _resultService.TakeInfor(seminarId);
        }

        [HttpPost("top3Result")]
        public Task<ResponsePagedModel> getTop3Result([FromQuery] PaginationClientModel paginationClientModel, SearchModel model)
        {
            return _resultService.Top3Result(paginationClientModel, model);
        }
        [HttpPost("saveResultUser")]
        [Authorize(Roles = "ADMIN, STUDENT, EMPLOYEE")]
        public async Task<string> saveResultUser(SaveResultModel model)
        {
            return await _resultService.SaveResult(model);
        }

        [HttpPost("checkResultExists")]
        [Authorize(Roles = "ADMIN, STUDENT, EMPLOYEE")]
        public async Task<bool> checkResultExists(SaveResultModel model)
        {
            return await _resultService.checkResultExists(model);
        }

        [HttpGet("getAllUserResultJoined")]
        [Authorize(Roles = "ADMIN, STUDENT, EMPLOYEE")]
        public async Task<List<int>> getAllUserResultJoined(int userId)
        {
            return await _resultService.listSurveyIdUser(userId);
        }

        [HttpPost("sendEmailAward")]
        [Authorize(Roles = "ADMIN")]
        public async Task<bool> sendEmailAward(AwardModel model)
        {
            return await _resultService.SendEmailAward(model);
        }
    }
}
