using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
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
        Task<string> Update(UserModel model);
        Task<string> Delete(int Id);
        Task<string> checkUserExists(string username);
        Task<string> checkEmailExists(string email);
        Task<string> checkTelExists(string tel);
        Task<string> checkIdnumberExists(string idNumber);
        //Task<Object> GetUserProfile();
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
                throw new Exception("Place not found");
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

        public async Task<string> Update(UserModel model)
        {
            User user = await _context.Users.FindAsync(model.ID);
            if (model.Username == user.Username)
            {
                user.NumberId = model.NumberId;
                user.LastName = model.LastName;
                user.FirstName = model.FirstName;
                user.Email = model.Email;
                user.Tel = model.Tel;
                user.Address = model.Address;
                user.Gender = model.Gender;
                user.Status = model.Status;
                user.ModifiedDate = DateTime.UtcNow;
            }
            try
            {
                await _context.SaveChangesAsync();
                return "Update Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
