using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface IAccountService
    {
        Task<string> Register(RegisterModel model);
        Task<string> Login(LoginModel model);
        //Task<Object> GetUserProfile();
        Task<string> changePassword(ChangePasswordModel model);
    }
    public class AccountService : IAccountService
    {
        private readonly ESContext _context;
        private IConfiguration _configuration;

        public AccountService(IConfiguration config, ESContext context)
        {
            _configuration = config;
            _context = context;
        }

        private async Task<User> GetUser(string UserName, string Password)
        {
            var account = _context.Users.SingleOrDefault(u => u.Username.Equals(UserName));
            if (account == null || !BC.Verify(Password, account.Password))
                return await Task.FromResult<User>(null);
            else
                return await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(UserName));
        }

        public async Task<string> Register(RegisterModel model)
        {
            var duplicate = _context.Users.FirstOrDefault(u => u.Username.Equals(model.Username));
            if (duplicate != null)
                return "Duplicate";
            var user = new User()
            {
                Username = model.Username,
                Password = BC.HashPassword(model.Password),
                NumberId = model.NumberId,
                Role = model.Role,
                LastName = model.LastName,
                FirstName = model.FirstName,
                Email = model.Email,
                Tel = model.Tel,
                Address = model.Address,
                Gender = model.Gender,
                Status = 0,
                CreatedDate = DateTime.UtcNow
            };
            try
            {
                _context.Users.Add(user);
                var result = await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            return "Success";
        }

        public async Task<string> Login(LoginModel model)
        {
            if (model != null && model.Username != null && model.Password != null)
            {
                var user = await GetUser(model.Username, model.Password);
                if (user != null)
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("Username", user.Username)
                    }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return token;
                }
                else
                    return null;
            }
            return null;
        }

        public async Task<string> changePassword(ChangePasswordModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(model.Username));
            string userPass = user.Password;
            if (BC.Verify(model.OldPassword, userPass))
            {
                string passwordHash = BC.HashPassword(model.NewPassword);
                user.Password = passwordHash;
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
                return  "Success";
            }
            return "Failed";
        }   
    }
}
