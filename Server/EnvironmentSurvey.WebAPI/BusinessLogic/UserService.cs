using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface IUserService
    {
        Task<List<UserModel>> GetAll();
        Task<List<UserModel>> Search(String key);
        Task<UserModel> GetUserByID(int user_ID);
        Task<UserModel> GetUserByName(string userName);
        Task<int> CountUser();
        Task<string> Update(Dictionary<string, string> dict, string imagePath);
        Task<string> Delete(int Id);
        Task<string> checkUserExists(string username);
        Task<string> checkEmailExists(string email);
        Task<string> checkTelExists(string tel);
        Task<string> checkIdnumberExists(string idNumber);
        Task<string> VerifyAccount(string username);
    }
    public class UserService : IUserService
    {
        private readonly ESContext _context;
        private IConfiguration _configuration;

        public UserService(IConfiguration config, ESContext context)
        {
            _configuration = config;
            _context = context;
        }

        public async Task<string> checkEmailExists(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
            if (user != null)
            {
                return "Email is already in use";
            }
            else
            {
                return "";
            }
        }

        public async Task<string> checkIdnumberExists(string idNumber)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.NumberId.Equals(idNumber));
            if (user != null)
            {
                return "ID Number is already in use";
            }
            else
            {
                return "";
            }
        }

        public async Task<string> checkTelExists(string tel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Tel.Equals(tel));
            if (user != null)
            {
                return "Tel is already in use";
            }
            else
            {
                return "";
            }
        }

        public async Task<string> checkUserExists(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(username));
            if (user != null)
            {
                return "Username is unvalible";
            }
            else
            {
                return "";
            }
        }

        public async Task<int> CountUser()
        {
            var listUser = await _context.Users.ToListAsync();
            return listUser.Count();
        }

        

        public async Task<string> Delete(int Id)
        {
            User user = await _context.Users.FindAsync(Id);
            if (user == null)
            {
                return "User not found";
            }
            try
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return "Delete Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<UserModel>> GetAll()
        {
            var listUser = await _context.Users.ToListAsync();
            var userModels = listUser.Select(x => new UserModel
            {
                ID = x.Id,
                NumberId = x.NumberId,
                Username = x.Username,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Role = x.Role,
                Address = x.Address,
                Email = x.Email,
                Gender = x.Gender,
                Tel = x.Tel,
                Status = x.Status,

            });
            return userModels.ToList();
        }

        public async Task<UserModel> GetUserByID(int user_ID)
        {
            User user = await _context.Users.FindAsync(user_ID);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var userModel = new UserModel
            {
                ID = user.Id,
                NumberId = user.NumberId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Address = user.Address,
                Email = user.Email,
                Gender = user.Gender,
                Tel = user.Tel,
                Status = user.Status,
            };
            return userModel;
        }

        public async Task<UserModel> GetUserByName(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(userName));
            var userModel = new UserModel
            {
                ID = user.Id,
                NumberId = user.NumberId,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Address = user.Address,
                Email = user.Email,
                Gender = user.Gender,
                Tel = user.Tel,
                Status = user.Status,
                Image = user.Image
            };
            return userModel;
        }

        public async Task<List<UserModel>> Search(string search_Key)
        {
            var listUser = await _context.Users
                                 .Where(x => x.Username.Contains(search_Key) || x.FirstName.Contains(search_Key) || x.LastName.Contains(search_Key) || x.NumberId.Contains(search_Key) || x.Email.Contains(search_Key))
                                 .ToListAsync();
            if (listUser.Count() == 0)
                throw new Exception("There is no result");
            else
            {
                List<UserModel> result = listUser.Select(x => new UserModel
                {
                    ID = x.Id,
                    NumberId = x.NumberId,
                    Username = x.Username,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Role = x.Role,
                    Address = x.Address,
                    Email = x.Email,
                    Gender = x.Gender,
                    Tel = x.Tel,
                    Status = x.Status,

                }).ToList();
                return result;
            }
        }

        public async Task<string> Update(Dictionary<string, string> dict, string imagePath)
        {
            int id = Int32.Parse(dict["userId"]);
            User user = await _context.Users.FindAsync(id);
            foreach (string key in dict.Keys)
            {                              
                if (key.Equals("idNumber")) { user.NumberId = dict[key]; continue; }                
                if (key.Equals("userLastname")) { user.LastName = dict[key]; continue; }
                if (key.Equals("userFirstname")) { user.FirstName = dict[key]; continue; }
                if (key.Equals("userEmail")) { user.Email = dict[key]; continue; }
                if (key.Equals("userTel")) { user.Tel = dict[key]; continue; }
                if (key.Equals("userAddress")) { user.Address = dict[key]; continue; }
                if (key.Equals("userGender")) { user.Gender = Int32.Parse(dict[key]); continue; }
            }
            

            if (imagePath != null)
            {
                //delete old image
                var path = Path.Combine(Environment.CurrentDirectory, @"wwwroot\Images", user.Image);
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                user.Image = imagePath;
            }                      
            user.ModifiedDate = DateTime.UtcNow;
            try
            {
                await _context.SaveChangesAsync();
                return "Update Success";
            }
            catch (Exception ex)
            {
                return "Update error";
            }
        }

        public async Task<string> VerifyAccount(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(username));
            user.Status = (int)Status.ACCEPTED;
            try
            {
                await _context.SaveChangesAsync();
                return "Verify Success";
            }
            catch (Exception ex)
            {
                return "Verify error";
            }
        }
    }
}
