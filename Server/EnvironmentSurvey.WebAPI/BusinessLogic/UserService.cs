using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using Microsoft.AspNetCore.Hosting;
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
        Task<ResponsePagedModel> GetAll(SearchModel model, PaginationClientModel paginationClientModel);
        Task<List<UserModel>> Search(String key);
        Task<UserModel> GetUserByID(int user_ID);
        Task<UserModel> GetUserByName(string userName);
        Task<int> CountUser();
        //Task<string> Update(Dictionary<string, string> dict, string imagePath);
        Task<string> Update(UserModel model);
        Task<string> changeAvatar(ChangeAvatarModel model);
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
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ICloudinaryService _cloudinaryService;
        public UserService(IConfiguration config, ESContext context, IHostingEnvironment hostingEnvironment, ICloudinaryService cloudinaryService)
        {
            _configuration = config;
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            _cloudinaryService = cloudinaryService;
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
                return "Username is available";
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
                user.DeletedDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return "Delete Success";
            }
            catch (Exception ex)
            {
                return "Delete error";
            }
        }

        public async Task<ResponsePagedModel> GetAll(SearchModel model, PaginationClientModel paginationClientModel)
        {
            var query = _context.Users.Where(u => !u.Role.Equals("ADMIN") && !u.DeletedDate.HasValue).OrderByDescending(u => u.CreatedDate);
            if (model.FromDate == "" && model.ToDate == "" && model.Role == "" && model.Search_key == "")
            {

            }
            if (model.FromDate != "")
            {
                DateTime fromDate = Convert.ToDateTime(model.FromDate);
                query = (IOrderedQueryable<User>)query.Where(u => u.CreatedDate >= fromDate);
            }
            if (model.ToDate != "")
            {
                DateTime toDate = Convert.ToDateTime(model.ToDate);
                query = (IOrderedQueryable<User>)query.Where(u => u.CreatedDate <= toDate);
            }
            if (model.Search_key != "")
            {
                var key = model.Search_key;
                query = (IOrderedQueryable<User>)query.Where(u => u.Username.Contains(key) || u.FirstName.Contains(key) || u.LastName.Contains(key) || u.Email.Contains(key));
            }
            if (model.Role != "")
            {
                query = (IOrderedQueryable<User>)query.Where(u => u.Role.Equals(model.Role));
            }

            var listUser = await query.ToListAsync();
            int totalPage = (int)Math.Ceiling(listUser.Count() / (double)paginationClientModel.PageSize);
            var listUserClient = await query
                                  .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                                  .Take(paginationClientModel.PageSize)
                                  .ToListAsync();
            var userModels = listUserClient.Select(x => new UserModel
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

            var responsePagedModel = new ResponsePagedModel
            {
                ListUser = userModels.ToList(),
                PageNumber = paginationClientModel.PageNumber,
                TotalPage = totalPage
            };
            return responsePagedModel;
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

        public async Task<string> Update(UserModel model)
        {
            try
            {
                User user = await _context.Users.FindAsync(model.ID);
                user.LastName = model.LastName;
                user.FirstName = model.FirstName;
                user.Address = model.Address;
                user.Gender = model.Gender;
                user.ModifiedDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> changeAvatar(ChangeAvatarModel model)
        {

            User user = await _context.Users.FindAsync(model.ID);
            if (user == null)
                throw new Exception("User not found");
            else
            {
                if (model.File != null)
                {
                    _cloudinaryService.DeleteImage(user.Image);
                    user.Image = model.Image;
                }
                user.ModifiedDate = DateTime.UtcNow;
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                    return "Success";
                return "Error";
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
