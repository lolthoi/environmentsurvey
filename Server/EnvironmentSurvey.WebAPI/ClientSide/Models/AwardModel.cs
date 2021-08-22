using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class AwardModel
    {
        public List<EmailUserModel> ListEmailUser { get; set; }
        public string SurveyName { get; set; }
    }
}
