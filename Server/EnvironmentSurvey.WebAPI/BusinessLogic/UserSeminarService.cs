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
    public interface IUserSeminarService
    {
        Task<string> SeminarRegistration(UserSeminarModel model);
        Task<List<ResUserSemiModel>> getUserSeminarByUser(UserSeminarModel model);

        Task<List<ResUserSemiModel>> getAllSeminarPending();

        Task<string> changeUserSeminarStatus(int option, int userSeminarId);
    }
    public class UserSeminarService : IUserSeminarService
    {
        private readonly ESContext _context;
        private readonly ISeminarService _seminarService;
        public UserSeminarService(ESContext context, ISeminarService seminarService)
        {
            _context = context;
            _seminarService = seminarService; 
        }

        public async Task<string> changeUserSeminarStatus(int option, int userSeminarId)
        {
            try
            {
                UserSeminar userSerminar = await _context.UserSeminars.FindAsync(userSeminarId);
                if(option == 1)
                {
                    userSerminar.Status = 1;
                } else
                {
                    userSerminar.Status = 3;
                }
                await _context.SaveChangesAsync();
                return "success";
            } catch (Exception ex)
            {
                return "failed";
            }
        }

        public async Task<List<ResUserSemiModel>> getAllSeminarPending()
        {
            var list = await _context.UserSeminars.Where(s => s.Status == 2).ToListAsync();
            List<ResUserSemiModel> returnList = new List<ResUserSemiModel>();
            foreach(var userSeminar in list)
            {
                User user = _context.Users.Find(userSeminar.UserId);
                Seminar seminar = _context.Seminars.Find(userSeminar.SeminarId);
                var obj = new ResUserSemiModel
                {
                    UserSeminarId = userSeminar.Id,
                    UserName = user.Username,
                    UserNumberId = userSeminar.User.NumberId,
                    seminarName = seminar.Name
                };
                returnList.Add(obj);
            }
            return returnList.ToList();
        }

        public async Task<List<ResUserSemiModel>> getUserSeminarByUser(UserSeminarModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(model.Username));
            if(user != null)
            {
                var listUserSemnar = await _context.UserSeminars.Where(us => us.UserId.Equals(user.Id)).ToListAsync();
                List<ResUserSemiModel> lsUserSeminarModal = new List<ResUserSemiModel>();
                foreach(var US in listUserSemnar)
                {
                    var user_seminar = new ResUserSemiModel
                    {
                        UserId = US.UserId,
                        SeminarId = US.SeminarId,
                        Seminar = await _seminarService.GetByID(US.SeminarId),
                        Status = US.Status
                    };
                    lsUserSeminarModal.Add(user_seminar);
                }
                return lsUserSeminarModal.ToList();
            }
            else
            {
                return null;
            }
        }

        public async Task<string> SeminarRegistration(UserSeminarModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(model.Username));
            Seminar seminar = await _context.Seminars.FindAsync(model.SeminarId);
            if (user != null && seminar != null )
            {
                var userSeminar = new UserSeminar
                {
                    UserId = user.Id,
                    User = user,
                    SeminarId = model.SeminarId,
                    Seminar = seminar,
                    Status = (int)Status.PENDING,
                    CreatedDate = DateTime.UtcNow
                };
                try
                {
                    _context.UserSeminars.Add(userSeminar);
                    await _context.SaveChangesAsync();
                    return "Register success";
                }
                catch (Exception ex)
                {
                    return "Register error";
                }
               
            }
            else 
            {
                return "User not found";
            }
            
        }
    }
}
