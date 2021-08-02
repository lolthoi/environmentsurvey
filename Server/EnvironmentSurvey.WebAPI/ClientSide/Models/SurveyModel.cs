using System;
using System.Collections.Generic;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class SurveyModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Status { get; set; }
        public int SeminarId { get; set; }
        public string Description { get; set; }
        public List<ResultModel> Results { get; set; }
        public List<SurveyQuestionModel> SurveyQuestions { get; set; }
    }
}
