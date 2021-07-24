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
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var response = await _accountService.Register(model);
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
        public async Task<IActionResult> Login(LoginModel model)
        {
            var token = await _accountService.Login(model);
            if (token != null)
                return Ok(new { token });
            return BadRequest(new { message = "Username or password is incorrect!" });
        }

        [HttpPost]
        [Authorize]
        [Route("ChangePassword")]
        //POST : /api/User/ChangePassword
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var userName = User.FindFirst("Username");
            if (userName.Value.Equals(model.Username))
            {
                var check = await _accountService.changePassword(model);
                if (check.Equals("Success"))
                    return Ok(new { succeeded = "Password Change Successful" });
            }
            return BadRequest(new { error = "Change Password Fail" });
        }
    }
}
