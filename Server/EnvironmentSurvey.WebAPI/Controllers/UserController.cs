using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Common;
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
    //[Authorize]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles="ADMIN")]
        //[Authorize(Roles ="ADMIN")]
        public async Task<List<UserModel>> getAll()
        {
            var listUser = await _userService.GetAll();
            return listUser;
        }
        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "ADMIN")]
        public async Task<List<UserModel>> Search(SearchModel model)
        {
            return await _userService.Search(model.Search_key);
        }
        [HttpGet("{id:int}")]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        public async Task<IActionResult> getUserByID(int id)
        {
            var user = await _userService.GetUserByID(id);
            return Ok(user);
        }
        [HttpPost]
        [Route("searchByUsername")]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        public async Task<UserModel> getUserByUsername(SearchModel model)
        {
            return await _userService.GetUserByName(model.Username);
        }
        [HttpPut]
        [Route("changeProfile")]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        public async Task<string> update(UserModel model)
        {
            return await _userService.Update(model);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<string> delete(int id)
        {
            return await _userService.Delete(id);
        }
        [HttpPost]
        [Route("checkUserExists")]
        public async Task<IActionResult> checkUserExists(string username)
        {
            var data  = await _userService.checkUserExists(username);
            return Ok(data);
        }
    }
}
