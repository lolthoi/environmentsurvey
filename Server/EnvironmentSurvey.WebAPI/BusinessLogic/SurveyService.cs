using EnvironmentSurvey.WebAPI.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ISurveyService
    {
        
    }
    public class SurveyService : ISurveyService
    {
        private readonly ESContext _context;

        public SurveyService(ESContext context)
        {
            _context = context;
        }

    }
}
