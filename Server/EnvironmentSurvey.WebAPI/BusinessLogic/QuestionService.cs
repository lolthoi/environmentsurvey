using EnvironmentSurvey.WebAPI.ClientSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface IQuestionService
    {
        QuestionModel Create(QuestionModel model);
        List<QuestionModel> GetAll();
        QuestionModel GetById(int Id);
        QuestionModel Update(QuestionModel model);
        bool Delete(int Id);
    }
    public class QuestionService : IQuestionService
    {
        public QuestionModel Create(QuestionModel model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public List<QuestionModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public QuestionModel GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public QuestionModel Update(QuestionModel model)
        {
            throw new NotImplementedException();
        }
    }
}
