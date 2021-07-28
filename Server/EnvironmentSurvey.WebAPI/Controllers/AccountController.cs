using EnvironmentSurvey.WebAPI.BusinessLogic;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IHostingEnvironment hostingEnvironment;

        public AccountController(IAccountService accountService, IHostingEnvironment hostingEnv)
        {
            _accountService = accountService;
            hostingEnvironment = hostingEnv;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<IActionResult> Register()
        {
            //var dict = HttpContext.Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());

            var formCollection = await Request.ReadFormAsync();
            var dict = formCollection.ToDictionary(x => x.Key, x => x.Value.ToString());
            var file = formCollection.Files.First();
            //var files = HttpContext.Request.Form.Files;
            string imgPath = null;
            if (file != null)
            {
                FileInfo fi = new FileInfo(file.FileName);
                var newfilename = "Image_" + DateTime.Now.TimeOfDay.Milliseconds + fi.Extension;
                var path = Path.Combine("", hostingEnvironment.WebRootPath + "\\Images\\" + newfilename);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    imgPath =  newfilename;
                }
            }
            var response = await _accountService.Register(dict, imgPath);
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
            var authenModel = await _accountService.Login(model);
            if (authenModel != null)
                return Ok(new { authenModel });
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
