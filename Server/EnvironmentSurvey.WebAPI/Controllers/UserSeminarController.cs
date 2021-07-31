using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
    public class UserSeminarController : ControllerBase
    {
        private readonly IUserSeminarService _userSeminarService;

        public UserSeminarController(IUserSeminarService userSeminarService)
        {
            _userSeminarService = userSeminarService;
        }

        [HttpPost]
        [Route("SeminarRegistration")]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        public async Task<IActionResult> SeminarRegistration(UserSeminarModel model)
        {
            var result = await _userSeminarService.SeminarRegistration(model);
            if(result)
                return Ok();
            else
                return BadRequest();
        }
    }
}
