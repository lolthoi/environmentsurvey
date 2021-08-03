using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

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
        private readonly IRepository<Question> _questionRespository;
        public QuestionService(IRepository<Question> questionRespository)
        {
            _questionRespository = questionRespository;
        }

        public QuestionModel Create(QuestionModel model)
        {
            var question = new Question
            {
                Question1 = model.Question,
            };
            model.Id = question.Id;
            _questionRespository.Insert(question);
            return model;
        }

        public bool Delete(int Id)
        {
            Question question = _questionRespository.Get(Id);
            if (question == null)
                throw new Exception("Question not found");
            else
            {
                _questionRespository.Delete(question);
                return true;
            }
        }

        public List<QuestionModel> GetAll()
        {
            var listQuestion = _questionRespository.GetAll().ToList();
            if (listQuestion.Count == 0)
                throw new Exception("There is no question existed");
            var result = listQuestion.Select(x => new QuestionModel
            {
                Id = x.Id,
                Question = x.Question1,
            }).ToList();
            return result;
        }

        public QuestionModel GetById(int Id)
        {
            QuestionModel model = new();
            Question question = _questionRespository.Get(Id);
            if (question == null)
                throw new Exception("Question not found");
            else
            {
                model.Id = question.Id;
                model.Question = question.Question1;
            }
            return model;
        }

        public QuestionModel Update(QuestionModel model)
        {
            Question question = _questionRespository.Get(model.Id);
            if (question == null)
                throw new Exception("Question not found");
            else
            {
                question.Question1 = model.Question;
                _questionRespository.Update(question);
            }
            return model;
        }
    }
}
