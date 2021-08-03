using EnvironmentSurvey.WebAPI.ClientSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface IAnswerService
    {
        AnswerModel Create(AnswerModel model);
        List<AnswerModel> GetAll();
        AnswerModel GetById(int Id);
        AnswerModel Update(AnswerModel model);
        bool Delete(int Id);
    }
    public class AnswerService : IAnswerService
    {
        public AnswerModel Create(AnswerModel model)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public List<AnswerModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public AnswerModel GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public AnswerModel Update(AnswerModel model)
        {
            throw new NotImplementedException();
        }
    }
}
