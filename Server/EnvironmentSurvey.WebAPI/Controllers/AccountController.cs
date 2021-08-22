﻿using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly ISendMailService _sendMailService;

        public AccountController(IAccountService accountService, ISendMailService sendMailService)
        {
            _accountService = accountService;
            _sendMailService = sendMailService;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var response = await _accountService.Register(model);
            if (response.Equals("Success"))
            {
                await _sendMailService.SendWelcomeEmailAsync(model.Email, "Verify Account", model.Username, model.Username);
                return Ok("Success");
            }
            else
                return BadRequest(response);
            
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var authenModel = await _accountService.Login(model);
            if (authenModel != null)
                return Ok(new { authenModel });
            return BadRequest(new { message = "Username or password is incorrect!" });
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN,EMPLOYEE,STUDENT")]
        [Route("ChangePassword")]
        //POST : /api/User/ChangePassword
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            //var userName = User.FindFirst("name");
            var userName = User.Identity.Name;
            if (userName.Equals(model.Username))
            {
                var check = await _accountService.changePassword(model);
                return Ok(check);
            }
            return BadRequest("Change Password Fail");
        }

    }
}
