using System.Collections.Generic;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class AnswerModel
    {
        public int Id { get; set; }
        public string Answer { get; set; }
        public int IsCorrect { get; set; }
        public int QuestionId { get; set; }
        public List<UserAnswerModel> UserAnswers { get; set; }
    }
}
