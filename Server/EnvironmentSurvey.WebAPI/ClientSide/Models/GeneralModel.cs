using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class GeneralModel
    {
        public int TotalStudent { get; set; }
        public int TotalStaff { get; set; }
        public int TotalClosedSurvey { get; set; }
        public int TotalUpcomingSurvey { get; set; }
        public int TotalAwards { get; set; }
    }
}
