using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ISubjectService
    {
        SubjectModel GetById(int id);
    }
    public class SubjectService : ISubjectService
    {
        private readonly IRepository<Subject> _subjectRepository;
        public SubjectService(IRepository<Subject> subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }
        public SubjectModel GetById(int id)
        {
            Subject subject = _subjectRepository.Get(id);
            SubjectModel subjectModel = new SubjectModel();
            if(subject != null)
            {
                subjectModel.Id = subject.Id;
                subjectModel.Subject = subject.Subject1;
            }
            return subjectModel;
        }
    }
}
