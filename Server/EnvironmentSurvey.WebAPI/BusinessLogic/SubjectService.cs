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
        List<SubjectModel> getAll();
    }
    public class SubjectService : ISubjectService
    {
        private readonly IRepository<Subject> _subjectRepository;
        public SubjectService(IRepository<Subject> subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public  List<SubjectModel> getAll()
        {
            var listSubject =  _subjectRepository.GetAll().ToList();
            List<SubjectModel> listSubectModel = new List<SubjectModel>();
            if(listSubject.Count > 0)
            {
                listSubectModel = listSubject.Select(s => new SubjectModel
                {
                    Id = s.Id,
                    Subject = s.Subject1
            }).ToList();
            }
            return listSubectModel;
            
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
