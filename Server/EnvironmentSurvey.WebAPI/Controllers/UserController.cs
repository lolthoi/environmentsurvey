using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<IActionResult> Register(UserModel model)
        {
            var response = await _userService.Register(model);
            if (response.Equals("Success"))
                return Ok(new { succeeded = "Success" });
            else if (response.Equals("Duplicate"))
                return BadRequest(new { error = "Username has already been taken!" });
            else
                return BadRequest(new { error = response });
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(UserModel model)
        {
            var token = await _userService.Login(model);
            if (token != null)
                return Ok(new { token });
            return BadRequest(new { message = "Username or password is incorrect!" });
        }

        [HttpPost]
        [Route("ChangePass")]
        //POST : /api/User/ChangePassword
        public async Task<IActionResult> ChangePass(UserPassModel model)
        {
            var userName = User.FindFirst("Username");
            if (userName.Value.Equals(model.userName))
            {
                var check = await _userService.changePassword(model.userName, model.oldPass, model.newPass);
                if(check.Equals("success"))
                {
                    return Ok("Password Change Successful");
                } 
                else
                {
                    return BadRequest("Change Password Fail");
                }
            }
            return BadRequest("Change Password Fail");
        }
    }
}
