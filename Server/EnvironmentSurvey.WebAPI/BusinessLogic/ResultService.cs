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
        Task<ResponsePagedModel> showResultUser(PaginationClientModel paginationClientModel, int userId);
        ResultModel UpdateResult(SaveUserAnswerModel model);
        Task<string> SaveResult(SaveResultModel model);
        Task<bool> checkResultExists(SaveResultModel model);
        Task<ResponsePagedModel> showResultBySurveyId(PaginationClientModel paginationClientModel,int surveyId, SearchModel model);
        Task<List<InforTakeSurveyModel>> TakeInfor(int seminarId);
        Task<ResponsePagedModel> Top3Result(PaginationClientModel paginationClientModel, SearchModel model);
        Task<List<int>> listSurveyIdUser(int userId);
        Task<bool> SendEmailAward(AwardModel model);
        Task ScheduleGetTopResult();
    }
    public class ResultService : IResultService
    {
        private readonly ESContext _context;

        private readonly IRepository<Answer> _answerRespository;
        private readonly IRepository<SurveyQuestion> _surveyQuestionRepository;
        private readonly IRepository<Result> _resultRepository;
        private readonly IRepository<User> _userRespository;
        private readonly IRepository<Survey> _surveyRespository;
        private readonly ISendMailService _sendMailService;
        public ResultService(ESContext context,
            IRepository<Answer> answerRespository,
            IRepository<SurveyQuestion> surveyQuestionRepository,
            IRepository<Result> resultRepository,
            IRepository<User> userRespository,
            IRepository<Survey> surveyRespository,
            ISendMailService sendMailService)
        {
            _context = context;
            _answerRespository = answerRespository;
            _surveyQuestionRepository = surveyQuestionRepository;
            _resultRepository = resultRepository;
            _userRespository = userRespository;
            _surveyRespository = surveyRespository;
            _sendMailService = sendMailService;
        }

        public async Task<ResponsePagedModel> showResultUser(PaginationClientModel paginationClientModel, int userId)
        {
            var lsUserResultTotal = await _context.Results.Where(r => r.UserId == userId).ToListAsync();
            int totalPage = (int)Math.Ceiling(lsUserResultTotal.Count() / (double)paginationClientModel.PageSize);
            var lsUserResult = await _context.Results.Where(r => r.UserId == userId)
                                .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                                .Take(paginationClientModel.PageSize)
                                .ToListAsync();
            List<ResultModel> lsUserResultModel = new List<ResultModel>();
            if(lsUserResult.Count() > 0)
            {
                foreach (var userResult in lsUserResult)
                {
                    var listResult = await _context.Results.Where(r => r.SurveyId == userResult.SurveyId)
                                    .OrderByDescending(r => r.Point).ThenBy(r => r.SubmitTime)
                                    .ThenBy(r => r.CreatedDate)
                                    .ToListAsync();
                    for (int i = 0; i < listResult.Count(); i++)
                    {
                        var r = listResult[i];
                        if (userResult.UserId == r.UserId)
                        {
                            ResultModel result = new ResultModel
                            {
                                Id = r.Id,
                                surveyName = _surveyRespository.Get(r.SurveyId).Name,
                                point = r.Point,
                                SubmitTime = r.SubmitTime,
                                Ranked = i + 1,
                                
                            };
                            lsUserResultModel.Add(result);
                            break;
                        }

                    }
                }
            }
            var responsePagedModel = new ResponsePagedModel
            {
                listResult = lsUserResultModel.ToList(),
                PageNumber = paginationClientModel.PageNumber,
                TotalPage = totalPage
            };
            return responsePagedModel;
        }

        public ResultModel UpdateResult(SaveUserAnswerModel model)
        {
            var result = new ResultModel();
            if (model.ListUserAnserModel.Count == 0)
                return result;
            //get all user anwers
            var listAnswer = _answerRespository.GetAll().ToList();
            var listAnswerModel = new List<AnswerModel>();
            foreach (var item in model.ListUserAnserModel)
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
            if (listAnswerModel.Count() > 0)
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
            var countUser = model.ListUserAnserModel.GroupBy(x => x.UserId).Select(t => t.Key).ToList();
            if (countUser.Count == 1)
            {
                userId = countUser.FirstOrDefault();
            }
            //Get SurveyId
            int surveyId = 0;
            var a = model.ListUserAnserModel.FirstOrDefault();
            var surveyQuestionModel = _surveyQuestionRepository.Get(a.SurveyQuestionId);
            if (surveyQuestionModel != null)
            {
                surveyId = surveyQuestionModel.SurveyId;
            }
            //update result
            var resultEntity = _context.Results.Where(r => r.SurveyId == surveyId && r.UserId == userId).FirstOrDefault();

           
            if (resultEntity != null)
            {
                resultEntity.Point = point;
                resultEntity.SubmitTime = model.SubmitTime;
                resultEntity.User = _userRespository.Get(userId);
                resultEntity.Survey = _surveyRespository.Get(surveyId);
                try
                {
                    _context.SaveChangesAsync();
                    result = new ResultModel()
                    {
                        Id = resultEntity.Id,
                        point = resultEntity.Point,
                        SubmitTime = resultEntity.SubmitTime,
                        UserId = resultEntity.UserId,
                        surveyId = resultEntity.SurveyId,
                    };
                    return result;
                }
                catch(Exception e)
                {
                    return result;
                }
            }
            else
            {
                result.point = point;
                result.SubmitTime = model.SubmitTime;
                result.UserId = userId;
                result.surveyId = surveyId;
                return result;
            }


        }

        public async Task<ResponsePagedModel> showResultBySurveyId(PaginationClientModel paginationClientModel, int surveyId, SearchModel model)
        {
            var listResultTotal = await _context.Results.Where(r => r.SurveyId == surveyId).OrderByDescending(r => r.Point).ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate).ToListAsync();
            int totalPage = (int)Math.Ceiling(listResultTotal.Count() / (double)paginationClientModel.PageSize);
            List<Result> listResult = new List<Result>();
            if(model.TimeOrPoint == 0)
            {
                listResult = await _context.Results
                        .Where(r => r.SurveyId == surveyId)
                        .OrderByDescending(r => r.Point)
                        .ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate)
                        .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                        .Take(paginationClientModel.PageSize)
                        .ToListAsync();
            }
            else
            {
                listResult = await _context.Results
                        .Where(r => r.SurveyId == surveyId)
                        .Where(r => r.Point == model.TimeOrPoint || r.SubmitTime == model.TimeOrPoint)
                        .OrderByDescending(r => r.Point)
                        .ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate)
                        .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                        .Take(paginationClientModel.PageSize)
                        .ToListAsync();
            }
            List<ResultModel> lsresultModel = new List<ResultModel>();

            if (listResult.Count() > 0)
            {
                for (int i = 0; i < listResult.Count; i++)
                {
                    var r = listResult[i];
                    ResultModel result = new ResultModel
                    {
                        Id = r.Id,
                        surveyName = _surveyRespository.Get(r.SurveyId).Name,
                        NameSeminar = _context.Seminars.Where(s=>s.Id == _surveyRespository.Get(r.SurveyId).SerminarId).FirstOrDefault().Name,
                        point = r.Point,
                        SubmitTime = r.SubmitTime,
                        FullName = _userRespository.Get(r.UserId).FirstName + " " + _userRespository.Get(r.UserId).LastName,
                        Ranked = i + 1,
                        Email = _userRespository.Get(r.UserId).Email
                    };
                    lsresultModel.Add(result);
                }
            }
            var responsePagedModel = new ResponsePagedModel
            {
                listResult = lsresultModel.ToList(),
                PageNumber = paginationClientModel.PageNumber,
                TotalPage = totalPage
            };
            return responsePagedModel;
        }

        public async Task<List<InforTakeSurveyModel>> TakeInfor(int seminarId)
        {
            
            var requestSeminars = await _context.UserSeminars.Where(s=> s.SeminarId == seminarId).Where(s=>s.Status ==(int)Status.ACCEPTED).ToListAsync();
            var totalRquestSeminars = requestSeminars.Count();
            var listSurvey = await _context.Surveys.Where(s => s.SerminarId == seminarId).ToListAsync();
            List<InforTakeSurveyModel> listResult = new List<InforTakeSurveyModel>();
            if(listSurvey.Count() > 0)
            {
                foreach(var survey in listSurvey)
                {
                    InforTakeSurveyModel model = new InforTakeSurveyModel
                    {
                        SeminarId = seminarId,
                        SurveyId = survey.Id,
                        TotalRegister = totalRquestSeminars,
                        SeminarName = _context.Seminars.Where(s=> s.Id == seminarId).FirstOrDefault().Name,
                        SurveyName = survey.Name,
                        TotalTakeSurvey = _resultRepository.GetAll().Where(r=> r.SurveyId == survey.Id).ToList().Count()
                    };
                    listResult.Add(model);
                }
            }
            return listResult;
        }

        public async Task< ResponsePagedModel> Top3Result(PaginationClientModel paginationClientModel , SearchModel model)
        {
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
            int totalPage = (int)Math.Ceiling(listTotalResultTop3.Count() / (double)paginationClientModel.PageSize);

            List<Result> listResult = new List<Result>();
            if (model.TimeOrPoint==0)
            {
                listResult = listTotalResultTop3
                            .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                            .Take(paginationClientModel.PageSize)
                            .ToList();
            }
            
            if( model.TimeOrPoint != 0)
            {
                 listResult = listTotalResultTop3
                            .Where(r => r.Point == model.TimeOrPoint || r.SubmitTime == model.TimeOrPoint)
                            .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                            .Take(paginationClientModel.PageSize)
                            .ToList();
            }
            
            List<ResultModel> lsresultModel = new List<ResultModel>();

            if (listResult.Count() > 0)
            {
                lsresultModel = listResult.Select(r => new ResultModel
                {
                    surveyName = _surveyRespository.Get(r.SurveyId).Name,
                    point = r.Point,
                    SubmitTime = r.SubmitTime,
                    FullName = _userRespository.Get(r.UserId).FirstName + " " + _userRespository.Get(r.UserId).LastName,
                    Image = _userRespository.Get(r.UserId).Image,

                }).ToList();
            }
            var responsePagedModel = new ResponsePagedModel
            {
                listResult = lsresultModel.ToList(),
                PageNumber = paginationClientModel.PageNumber,
                TotalPage = totalPage
            };
            return responsePagedModel;
        }

        public async  Task<string> SaveResult(SaveResultModel model)
        {
            if(model != null)
            {
                User user = await _context.Users.FindAsync(model.UserId);
                if (user.Role != "ADMIN")
                {
                    Result res = new()
                    {
                        Point = 0,
                        SubmitTime = 0,
                        UserId = model.UserId,
                        SurveyId = model.SurveyId,
                        CreatedDate = DateTime.UtcNow
                    };
                    try
                    {
                        _context.Results.Add(res);
                        await _context.SaveChangesAsync();
                        return "success";
                    }
                    catch (Exception e)
                    {
                        return "save error";
                    }
                } else
                {
                    return "success";
                }
            }
            return "data client null";
        }

        public async Task<bool> checkResultExists(SaveResultModel model)
        {
            if(model == null)
            {
                return false;
            }
            else
            {
                var result = await _context.Results.Where(r => r.SurveyId == model.SurveyId && r.UserId == model.UserId).FirstOrDefaultAsync();
                if(result != null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        public async Task<List<int>> listSurveyIdUser(int userId)
        {
            List<int> listSurveyId = new List<int>();
            listSurveyId =  await _context.Results.Where(r => r.UserId == userId).Select(r => r.SurveyId).ToListAsync();
            return listSurveyId;
        }

        public async Task<bool> SendEmailAward(AwardModel model)
        {
            var listEmailUser = model.ListEmailUser;
            var surveyName = model.SurveyName;
            var subject = "Announce Award";
            var message = "Thank you for participating in our <b>" + surveyName + "</b> survey. We are pleased to announce that you have entered the top 3  with the best survey scores. To receive the reward please contact: 19000001. Thanks you !";
            try
            {
                foreach (var x in listEmailUser)
                {
                    string email = x.Email;
                    var username = x.FullName;
                    await _sendMailService.SendEmailAward(email, surveyName, username, subject, message);
                    
                }
                return true;
            }catch(Exception e)
            {
                return false;
            }
        }

        public async Task ScheduleGetTopResult()
        {
            DateTime currentDate = DateTime.Now;
            DateTime yesterday = DateTime.Now.AddDays(-1);
            var listSurveyEnd = await _context.Surveys.Where(s => s.EndTime < currentDate && s.EndTime > yesterday).ToListAsync();
            if (listSurveyEnd.Count > 0)
            {
                foreach (Survey survey in listSurveyEnd)
                {
                    List<EmailUserModel> listTopUser = new List<EmailUserModel>();
                    var listTopResult = await _context.Results
                            .Where(r => r.SurveyId == survey.Id)
                            .OrderByDescending(r => r.Point)
                            .ThenBy(r => r.SubmitTime).ThenBy(r => r.CreatedDate)
                            .Take(3)
                            .ToListAsync();

                    foreach (Result result in listTopResult)
                    {
                        User user = await _context.Users.FindAsync(result.UserId);
                        EmailUserModel obj = new EmailUserModel();
                        obj.Email = user.Email;
                        obj.FullName = user.FirstName + " " + user.LastName;
                        listTopUser.Add(obj);
                    }
                    AwardModel award = new AwardModel();
                    award.SurveyName = survey.Name;
                    award.ListEmailUser = listTopUser;
                    var sendMailResult = await SendEmailAward(award);
                    if (sendMailResult == false) throw new Exception("Faild to send Email.");
                }
            }
        }
    }
}
