using EnvironmentSurvey.WebAPI.ClientSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ISurveyQuestionService
    {
        SurveyQuestionModel Create(SurveyQuestionModel model);
        List<SurveyQuestionModel> GetAll();
        SurveyQuestionModel GetById(int Id);
        SurveyQuestionModel Update(SurveyQuestionModel model);
        bool Delete(int Id);
    }
    public class SurveyQuestionService : ISurveyQuestionService
    {
        public SurveyQuestionModel Create(SurveyQuestionModel model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public List<SurveyQuestionModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public SurveyQuestionModel GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public SurveyQuestionModel Update(SurveyQuestionModel model)
        {
            throw new NotImplementedException();
        }
    }
}
