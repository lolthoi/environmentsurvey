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
        Task<bool> SeminarRegistration(UserSeminarModel model);
    }
    public class UserSeminarService : IUserSeminarService
    {
        private readonly ESContext _context;
        public UserSeminarService(ESContext context)
        {
            _context = context;
        }
        public async Task<bool> SeminarRegistration(UserSeminarModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(model.Username));
            var userSeminar = new UserSeminar
            {
                UserId = user.Id,
                SeminarId = model.SeminarId,
                Status = (int)Status.PENDING,
                CreatedDate = DateTime.UtcNow
            };
            try
            {
                _context.UserSeminars.Add(userSeminar);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
