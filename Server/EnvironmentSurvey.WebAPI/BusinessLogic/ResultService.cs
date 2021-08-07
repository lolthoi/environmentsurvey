using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
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
        ResultModel SaveResult(List<UserAnswerModel> model);
    }
    public class ResultService : IResultService
    {
        private readonly ESContext _context;

        private readonly IRepository<Answer> _answerRespository;
        private readonly IRepository<SurveyQuestion> _surveyQuestionRepository;
        private readonly IRepository<Result> _resultRepository;
        public ResultService(ESContext context,
            IRepository<Answer> answerRespository,
            IRepository<SurveyQuestion> surveyQuestionRepository,
            IRepository<Result> resultRepository)
        {
            _context = context;
            _answerRespository = answerRespository;
            _surveyQuestionRepository = surveyQuestionRepository;
            _resultRepository = resultRepository;
        }

        public async Task<ResultModel> showResult(int surveyId, string userName)
        {
            var account = _context.Users.SingleOrDefault(u => u.Username.Equals(userName));
            var result = await _context.Results.Where(r => r.SurveyId == surveyId && r.UserId == account.Id).FirstOrDefaultAsync();
            if (result == null)
            {
                throw new Exception("There is no result");
            }

            ResultModel model = new ResultModel();
            model.surveyId = result.SurveyId;
            model.surveyName = result.Survey.Name;
            model.point = result.Point;

            return model;
        }

        public ResultModel SaveResult(List<UserAnswerModel> model)
        {
            if (model.Count == 0)
                throw new Exception("Invalid input list model");
            //get all user anwers
            var listAnswer = _answerRespository.GetAll().ToList();
            var listAnswerModel = new List<AnswerModel>();
            foreach (var item in model)
            {
                var AnswerDomain = listAnswer.Where(x => x.Id == item.AnswerId).FirstOrDefault();
                if (AnswerDomain != null)
                {
                    AnswerModel answerModel = new()
                    {
                        Id = AnswerDomain.Id,
                        Answer = AnswerDomain.Answer1,
                        IsCorrect = (IsCorrect)AnswerDomain.IsCorrect,
                        QuestionId = AnswerDomain.QuestionId,
                    };
                    listAnswerModel.Add(answerModel);
                }
            }
            //count point
            int point = 0;
            if (listAnswerModel.Count > 0)
            {
                foreach (var item in listAnswerModel)
                {
                    if (item.IsCorrect == (IsCorrect)1)
                    {
                        point++;
                    };
                }
            }
            //Get userId
            int userId = 0;
            var countUser = model.GroupBy(x => x.UserId).Select(t => t.Key).ToList();
            if (countUser.Count == 1)
            {
                userId = countUser.FirstOrDefault();
            }
            //Get SurveyId
            int surveyId = 0;
            var a = model.FirstOrDefault();
            var surveyQuestionModel = _surveyQuestionRepository.Get(a.Id);
            if (surveyQuestionModel != null)
            {
                surveyId = surveyQuestionModel.SurveyId;
            }
            //Save result
            Result res = new()
            {
                Point = point,
                SubmitTime = DateTime.UtcNow,
                UserId = userId,
                SurveyId = surveyId,
            };
            _resultRepository.Insert(res);

            var result = new ResultModel()
            {
                Id = res.Id,
                point = res.Point,
                SubmitTime = res.SubmitTime,
                UserId = res.UserId,
                surveyId = res.SurveyId,
            };
            return result;
        }
    }
}
