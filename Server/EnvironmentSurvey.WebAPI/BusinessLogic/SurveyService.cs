using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ISurveyService
    {
        List<SurveyModel> GetAllSurveyBySeminarId(int seminarId);
        SurveyModel Create(SurveyModel model);
    }
    public class SurveyService : ISurveyService
    {
        private readonly IRepository<Survey> _surveyRespository;
        private readonly IRepository<Result> _resultRespository;
        public SurveyService(IRepository<Survey> surveyRespository, IRepository<Result> resultRespository)
        {
            _surveyRespository = surveyRespository;
            _resultRespository = resultRespository;
        }

        public SurveyModel Create(SurveyModel model)
        {
            var survey = new Survey
            {
                Name = model.Name,
                StartDate = model.StartDate,
                EndTime = model.EndDate,
                Status = (int)model.Status,
                SerminarId = model.SeminarId,
                Description = model.Description,
            };
            _surveyRespository.Insert(survey);
            model.Id = survey.Id;
            return model;
        }

        public List<SurveyModel> GetAllSurveyBySeminarId(int seminarId)
        {
            var listResult = _resultRespository.GetAll().ToList();
            List<ResultModel> listResultModel = new();
            if (listResult.Count > 0)
            {
                listResultModel = listResult.Select(x => new ResultModel
                {
                    Id = x.Id,
                    surveyId = x.SurveyId,
                    point = x.Point,
                    SubmitTime = x.SubmitTime,
                    UserId = x.UserId
                }).ToList();
            }
            var listSurvey = _surveyRespository.GetAll().Where(x => x.SerminarId == seminarId).ToList();
            if (listSurvey.Count == 0)
                throw new Exception("There is no Survey of this Seminar existed");
            var result = listSurvey.Select(x => new SurveyModel
            {
                Id = x.Id,
                Name = x.Name,
                StartDate = x.StartDate,
                EndDate = x.EndTime,
                Status = (SurveyStatus)x.Status,
                SeminarId = x.SerminarId,
                Description = x.Description,
                Results = listResultModel.Count > 0 ? listResultModel.Where(y => y.surveyId == x.Id).ToList() : null,
            }).ToList();
            return result;
        }
    }
}
