using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class ResUserSemiModel
    {
        public int UserId { get; set; }
        public int SeminarId { get; set; }
        public int Status { get; set; }
        public virtual SeminarModel Seminar { get; set; }
    }
}
