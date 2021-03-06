using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
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
        public Task<GeneralModel> GeneralInfor();
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
            var seminars = await _context.Seminars.Where(s => !s.DeletedDate.HasValue).ToListAsync();
            var totalseminars = seminars.Count();
            var users = await _context.Users.Where(u=> u.Status.Equals(1)).Where(s=> !s.DeletedDate.HasValue).Where(s => !s.Role.Equals("ADMIN")).ToListAsync();
            var totalUser = users.Count();
            var newUsers = await _context.Users.Where(u => u.Status.Equals(1) && u.CreatedDate.Year == dt.Year && u.CreatedDate.Month == dt.Month && u.CreatedDate.Day == dt.Day)
                            .ToListAsync();
            var totalNewUser = newUsers.Count();
            var surveys = await _context.Surveys.Where(s => !s.DeletedDate.HasValue).ToListAsync();
            var totalSurvey = surveys.Count();
            var requestSeminars = await _context.UserSeminars.Where(s=> s.Status == 1).ToListAsync();
            var totalRquestSeminars = requestSeminars.Count();
            var newRquestSeminars = await _context.UserSeminars.Where(u => u.Status.Equals(1) && u.CreatedDate.Year == dt.Year && u.CreatedDate.Month == dt.Month && u.CreatedDate.Day == dt.Day)
                                  .ToListAsync();
            var totalNewRequestSemianr = newRquestSeminars.Count();
            var top1Senimar = await _context.UserSeminars.GroupBy(s => s.SeminarId).OrderByDescending(g => g.Count()).Select(g => new {SeminarId = g.Key, count = g.Count() }).FirstOrDefaultAsync();
            Seminar seminar = new Seminar();
            if(top1Senimar != null)
            {
                seminar = await _context.Seminars.Where(s => s.Id.Equals(top1Senimar.SeminarId)).FirstAsync();
            }
            
            var top1SenimarPerDay = await _context.UserSeminars
                .Where(u=>u.CreatedDate.Year == dt.Year && u.CreatedDate.Month == dt.Month && u.CreatedDate.Day == dt.Day)
                .GroupBy(s => s.SeminarId).OrderByDescending(g => g.Count()).Select(g => new { SeminarId = g.Key, count = g.Count() }).FirstOrDefaultAsync();
            Seminar seminarPerDay = new Seminar();
            if (top1SenimarPerDay != null)
            {
                seminarPerDay = await _context.Seminars.Where(s => s.Id.Equals(top1SenimarPerDay.SeminarId)).FirstAsync();
            }

            //Top 3 Student: Awards
            var listSurveyId = await _context.Results.GroupBy(r => r.SurveyId).Select(r => r.Key).ToListAsync();
            List<Result> listTotalResultTop3 = new List<Result>();
            foreach (var surveyId in listSurveyId)
            {
                var list = await _context.Results
                        .Where(r => r.SurveyId == (surveyId) && !r.UserId.Equals(1))
                        .OrderByDescending(r => r.Point)
                        .ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate)
                        .Take(3)
                        .ToListAsync();
                list.ForEach(item => listTotalResultTop3.Add(item));
            }

            var responseModel = new DashboardModel
            {
                TotalSeminars = totalseminars,
                TotalSurveys = totalSurvey,
                TotalUsers = totalUser,
                TotalNewUsers = totalNewUser,
                TotalRequestSeminars = totalRquestSeminars,
                TotalNewRequestSeminars = totalNewRequestSemianr,
                Top1Seminar = seminar.Name != null ? seminar.Name : "",
                Top1SeminarCount = top1Senimar != null ? top1Senimar.count : 0,
                Top1SeminarPerDay = seminarPerDay.Name != null ? seminarPerDay.Name : "",
                Top1SeminarPerDayCount = top1SenimarPerDay != null ? top1SenimarPerDay.count : 0,
                TotalAwards = listTotalResultTop3.Count()
            };
            return responseModel;
        }

        public async Task<GeneralModel> GeneralInfor()
        {
            //Top 3 Student: Awards
            var listSurveyId = await _context.Results.GroupBy(r => r.SurveyId).Select(r => r.Key).ToListAsync();
            List<Result> listTotalResultTop3 = new List<Result>();
            foreach (var surveyId in listSurveyId)
            {
                var list = await _context.Results
                        .Where(r => r.SurveyId == (surveyId) && !r.UserId.Equals(1))
                        .OrderByDescending(r => r.Point)
                        .ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate)
                        .Take(3)
                        .ToListAsync();
                list.ForEach(item => listTotalResultTop3.Add(item));
            }
            DateTime dt = DateTime.UtcNow;
            var listCloseSurvey = await _context.Surveys.Where(s => s.EndTime < dt).ToListAsync();
            var listUpcomingSurvey = await _context.Surveys.Where(s => s.StartDate > dt).ToListAsync();

            var listSeminarStudent = await _context.Seminars.Where(s => s.forUser == 2).ToListAsync();
            List<Survey> listSurvey = new();
            foreach(var seminar in listSeminarStudent)
            {
                var listSurveyStudent = await _context.Surveys.Where(s => s.SerminarId == seminar.Id).ToListAsync();
                listSurveyStudent.ForEach(item => listSurvey.Add(item));
            }
            var totalStudentTakeSurvey = 0;
            foreach(var survey in listSurvey)
            {
                var listStudent = await _context.Results.Where(r => r.SurveyId == survey.Id && !r.UserId.Equals(1)).ToListAsync();
                totalStudentTakeSurvey = totalStudentTakeSurvey + listStudent.Count();
            }

            var listSeminarStaff = await _context.Seminars.Where(s => s.forUser == 1).ToListAsync();
            List<Survey> listSurveyStaff = new();
            foreach (var seminar in listSeminarStaff)
            {
                var listSurveyStaffEntity = await _context.Surveys.Where(s => s.SerminarId == seminar.Id).ToListAsync();
                listSurveyStaffEntity.ForEach(item => listSurveyStaff.Add(item));
            }
            var totalStaffTakeSurvey = 0;
            foreach (var survey in listSurveyStaff)
            {
                var listStaff = await _context.Results.Where(r => r.SurveyId == survey.Id && !r.UserId.Equals(1)).ToListAsync();
                totalStaffTakeSurvey = totalStaffTakeSurvey + listStaff.Count();
            }

            var generalModel = new GeneralModel
            {
                TotalAwards = listTotalResultTop3.Count(),
                TotalClosedSurvey = listCloseSurvey.Count(),
                TotalUpcomingSurvey = listUpcomingSurvey.Count(),
                TotalStaff = totalStaffTakeSurvey,
                TotalStudent = totalStudentTakeSurvey

            };
            return generalModel;
        }
    }
}
