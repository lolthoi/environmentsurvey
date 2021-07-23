using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class UserPassModel
    {
        public string userName { get; set; }
        public string oldPass { get; set; }
        public string newPass { get; set; }

    }
}
