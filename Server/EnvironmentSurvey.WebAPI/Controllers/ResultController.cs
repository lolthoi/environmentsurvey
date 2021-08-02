using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
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
        [Route("getResult")]
        public async Task<IActionResult> getResult(int surveyId, string userName)
        {
            var userNameInToken = User.Identity.Name;
            if (userNameInToken.Equals(userName)){
                try
                {
                    var result = await _resultService.showResult(surveyId, userName);
                    return Ok(result);
                }
                catch
                {
                    return BadRequest("Result Not Found");
                }
            }
            return BadRequest("User Not Authorize");
            
            
            
        }
    }
}
