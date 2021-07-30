using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeminarController : Controller
    {
        private readonly ISeminarService _seminarSevice;
        public SeminarController(ISeminarService seminarSevice)
        {
            _seminarSevice = seminarSevice;
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN,STUDENT,EMPLOYEE")]
        //[Authorize(Roles ="ADMIN")]
        public async Task<List<SeminarModel>> getAll()
        {
            var listUser = await _seminarSevice.GetAll();
            return listUser;
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        public async Task<SeminarModel> getSeminarByID(int id)
        {
            var user = await _seminarSevice.GetByID(id);
            return user;
        }
    }
}
