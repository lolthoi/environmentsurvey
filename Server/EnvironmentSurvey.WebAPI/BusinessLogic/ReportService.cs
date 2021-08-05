using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface IReportSevice
    {
        public Task<DashboardModel> DataDashboard();
    }

    public class ReportService : IReportSevice
    {
        private readonly ESContext _context;
        public ReportService(ESContext context)
        {
            _context = context;

        }
        public async Task<DashboardModel> DataDashboard()
        {
            DateTime dt = DateTime.Now;
            var seminars = await _context.Seminars.ToListAsync();
            var totalseminars = seminars.Count();
            var users = await _context.Users.Where(u=> u.Status == 1).ToListAsync();
            var totalUser = users.Count();
            var newUsers = await _context.Users.Where(u => u.Status == 1 && u.CreatedDate.Year == dt.Year && u.CreatedDate.Month == dt.Month && u.CreatedDate.Day == dt.Day)
                            .ToListAsync();
            var totalNewUser = newUsers.Count();
            var surveys = await _context.Surveys.ToListAsync();
            var totalSurvey = surveys.Count();
            var requestSeminars = await _context.UserSeminars.ToListAsync();
            var totalRquestSeminars = requestSeminars.Count();
            var newRquestSeminars = await _context.UserSeminars.Where(u => u.Status == 1 && u.CreatedDate.Year == dt.Year && u.CreatedDate.Month == dt.Month && u.CreatedDate.Day == dt.Day)
                                  .ToListAsync();
            var totalNewRequestSemianr = newRquestSeminars.Count();

            return null;
        }
    }
}
