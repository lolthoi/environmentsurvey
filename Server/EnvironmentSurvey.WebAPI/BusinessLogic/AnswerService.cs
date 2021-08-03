using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

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
        private readonly IRepository<Answer> _answerRespository;
        public AnswerService(IRepository<Answer> answerRespository)
        {
            _answerRespository = answerRespository;
        }
        public AnswerModel Create(AnswerModel model)
        {
            var answer = new Answer
            {
                Answer1 = model.Answer,
                IsCorrect = model.IsCorrect,
                QuestionId = model.QuestionId,
            };
            model.Id = answer.Id;
            _answerRespository.Insert(answer);
            return model;
        }

        public bool Delete(int Id)
        {
            Answer answer = _answerRespository.Get(Id);
            if (answer == null)
                throw new Exception("Question not found");
            else
            {
                _answerRespository.Delete(answer);
                return true;
            }
        }

        public List<AnswerModel> GetAll()
        {
            var listAnswer = _answerRespository.GetAll().ToList();
            if (listAnswer.Count == 0)
                throw new Exception("There is no answer existed");
            var result = listAnswer.Select(x => new AnswerModel
            {
                Id = x.Id,
                Answer = x.Answer1,
                IsCorrect = x.IsCorrect,
                QuestionId = x.QuestionId,
            }).ToList();
            return result;
        }

        public AnswerModel GetById(int Id)
        {
            AnswerModel model = new();
            Answer answer = _answerRespository.Get(Id);
            if (answer == null)
                throw new Exception("Answer not found");
            else
            {
                model.Id = answer.Id;
                model.Answer = answer.Answer1;
                model.IsCorrect = answer.IsCorrect;
                model.QuestionId = answer.QuestionId;
            }
            return model;
        }

        public AnswerModel Update(AnswerModel model)
        {
            Answer answer = _answerRespository.Get(model.Id);
            if (answer == null)
                throw new Exception("Answer not found");
            else
            {
                answer.Answer1 = model.Answer;
                answer.IsCorrect = model.IsCorrect;
                answer.QuestionId = model.QuestionId;
                _answerRespository.Update(answer);
            }
            return model;
        }
    }
}
