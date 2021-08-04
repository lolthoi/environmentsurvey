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
        private readonly IRepository<Answer> _answerRespository;
        private readonly IRepository<SurveyQuestion> _surveyQuestionRepository;
        public QuestionService(
            IRepository<Question> questionRespository,
            IRepository<Answer> answerRespository,
            IRepository<SurveyQuestion> surveyQuestionRepository)
        {
            _questionRespository = questionRespository;
            _answerRespository = answerRespository;
            _surveyQuestionRepository = surveyQuestionRepository;
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
            var listAnswer = _answerRespository.GetAll().ToList();
            List<AnswerModel> listAnswerModel = new();
            if (listAnswer.Count > 0)
            {
                listAnswerModel = listAnswer.Select(x => new AnswerModel
                {
                    Id = x.Id,
                    Answer = x.Answer1,
                    IsCorrect = x.IsCorrect,
                    QuestionId = x.QuestionId
                }).ToList();
            }

            var listSurveyQuestion = _surveyQuestionRepository.GetAll().ToList();
            List<SurveyQuestionModel> listSurveyQuestionModel = new();
            if (listSurveyQuestion.Count > 0)
            {
                listSurveyQuestionModel = listSurveyQuestion.Select(x => new SurveyQuestionModel
                {
                    Id = x.Id,
                    SurveyId = x.SurveyId,
                    QuestionId = x.QuestionId,
                }).ToList();
            }

            var listQuestion = _questionRespository.GetAll().ToList();
            if (listQuestion.Count == 0)
                throw new Exception("There is no question existed");

            var result = listQuestion.Select(x => new QuestionModel
            {
                Id = x.Id,
                Question = x.Question1,
                Answers = listAnswerModel.Count > 0 ? listAnswerModel.Where(y => y.QuestionId == x.Id).ToList() : null,
                SurveyQuestions = listSurveyQuestionModel.Count > 0 ? listSurveyQuestionModel.Where(y => y.QuestionId == x.Id).ToList() : null,
            }).ToList();
            return result;
        }

        public QuestionModel GetById(int Id)
        {
            var listAnswer = _answerRespository.GetAll().Where(x => x.QuestionId == Id).ToList();
            List<AnswerModel> listAnswerModel = new();
            if (listAnswer.Count > 0)
            {
                listAnswerModel = listAnswer.Select(x => new AnswerModel
                {
                    Id = x.Id,
                    Answer = x.Answer1,
                    IsCorrect = x.IsCorrect,
                    QuestionId = x.QuestionId
                }).ToList();
            }

            QuestionModel model = new();
            Question question = _questionRespository.Get(Id);
            if (question == null)
                throw new Exception("Question not found");
            else
            {
                model.Id = question.Id;
                model.Question = question.Question1;
                model.Answers = listAnswerModel;
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
