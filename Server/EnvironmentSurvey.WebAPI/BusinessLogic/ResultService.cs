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
    public interface IResultService
    {
        Task<ResultModel> showResult(int surveyId, string userName);
    }
    public class ResultService : IResultService
    {
        private readonly ESContext _context;

        public ResultService(ESContext context)
        {
            _context = context;
        }

        public async Task<ResultModel> showResult(int surveyId, string userName)
        {
            var account = _context.Users.SingleOrDefault(u => u.Username.Equals(userName));
            var result = await _context.Results.Where(r => r.SurveyId == surveyId && r.UserId == account.Id).FirstOrDefaultAsync();
            if(result == null)
            {
                throw new Exception("There is no result");
            }

            ResultModel model = new ResultModel();
            model.surveyId = result.SurveyId;
            model.surveyName = result.Survey.Name;
            model.point = result.Point;

            return model;
        }
    }
}
