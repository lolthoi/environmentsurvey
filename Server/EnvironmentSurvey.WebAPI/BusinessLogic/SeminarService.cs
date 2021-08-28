using EnvironmentSurvey.WebAPI.ClientSide.Models;
using EnvironmentSurvey.WebAPI.DataAccess;
using EnvironmentSurvey.WebAPI.DataAccess.Domains;
using EnvironmentSurvey.WebAPI.DataAccess.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{

    public interface ISeminarService
    {
        public Task<ResponsePagedModel> GetAll(SearchModel model, PaginationClientModel paginationClientModel);
        public Task<SeminarModel> GetByID(int id);
        public Task<SeminarModel> GetByIDManage(int id);
        public Task<List<SeminarModel>> GetListSeminar(string status);
        public Task<bool> Create(SeminarModel model);
        public Task<bool> Update(SeminarModel model);
        public Task<bool> Delete(int Id);
        public Task<List<SeminarModel>> UpComingSeminar();
        public Task<List<SeminarModel>> RelatedSeminar(string subject, int idSeminar);
    }
    public class SeminarService : ISeminarService
    {
        private readonly ESContext _context;
        private IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ISubjectService _subjectService;
        private readonly ICloudinaryService _cloudinaryService;
        public SeminarService(ICloudinaryService cloudinaryService,  ESContext context, IConfiguration configuration, IHostingEnvironment hostingEnvironment, ISubjectService subjectService)
        {
            _context = context;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
            _subjectService = subjectService;
            _cloudinaryService = cloudinaryService;
        }

        public async Task<bool> Create(SeminarModel model)
        {
            var seminar = new Seminar
            {
                Name = model.Name,
                Description = model.Description,
                Image = model.Image,
                Location = model.Location,
                Author = model.Author,
                Subject = await _context.Subjects.FindAsync(model.SubjectId),
                SubjectId = model.SubjectId,
                forUser = model.forUser,
                StartDate = Convert.ToDateTime(model.StartDate),
                EndTime = Convert.ToDateTime(model.EndDate),
                CreatedDate = DateTime.UtcNow
            };
            _context.Seminars.Add(seminar);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
                return true;
            return false;
        }

        public async Task<ResponsePagedModel> GetAll(SearchModel model, PaginationClientModel paginationClientModel)
        {
            var key = model.Search_key;
            var role = model.Role;
            DateTime dateTime = DateTime.Now;
            List<Seminar> listSeminar = new List<Seminar>();

            var query = _context.Seminars.Where(s => !s.DeletedDate.HasValue).OrderByDescending(s => s.CreatedDate);
            if(model.FromDate == "" && model.ToDate == "" && model.Search_key == "" && role =="" && model.Status == 0 || model.FromDate == "" && model.ToDate == "" && model.Search_key == "" && role == "ADMIN" && model.Status == 0)
            {
               
            }
            if(model.Search_key != "")
            {
                
                query = (IOrderedQueryable<Seminar>)query.Where(u => u.Name.Contains(key) || u.Author.Contains(key) || u.Location.Contains(key));
            }
            if(model.FromDate != "")
            {
                DateTime fromDate = Convert.ToDateTime(model.FromDate);
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.StartDate >= fromDate);
            }
            if(model.ToDate != "")
            {
                DateTime toDate = Convert.ToDateTime(model.ToDate);
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.StartDate <= toDate);
            }
            if(model.Role == "STUDENT")
            {
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.forUser == 2);//.Where(s => s.StartDate > dateTime);
            }
            if (model.Role == "EMPLOYEE")
            {
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.forUser == 1);//.Where(s => s.StartDate > dateTime);
            }
            if(model.Status == 1)
            {
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.EndTime < dateTime);
            }
            if (model.Status == 2)
            {
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.StartDate < dateTime && dateTime < s.EndTime);
            }
            if (model.Status == 3)
            {
                query = (IOrderedQueryable<Seminar>)query.Where(s => s.StartDate > dateTime);
            }
            listSeminar = await query.ToListAsync();
            int totalPage = (int)Math.Ceiling(listSeminar.Count() / (double)paginationClientModel.PageSize);
            var listSeminarClient = await query
                                    .Skip((paginationClientModel.PageNumber - 1) * paginationClientModel.PageSize)
                                     .Take(paginationClientModel.PageSize)
                                    .ToListAsync();

            var seminarModel = listSeminarClient.Select(x => new SeminarModel
            {
                ID = x.Id,
                Name = x.Name,
                Description = x.Description,
                Image = x.Image,
                Location = x.Location,
                Author = x.Author,
                Subject = _subjectService.GetById(x.SubjectId),
                forUser = x.forUser,
                StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                EndDate = x.EndTime.ToString("yyyy-MM-dd"),
                TotalRequestAccept = _context.UserSeminars.Where(us => us.SeminarId == x.Id && us.Status == 1).ToList().Count()
            }) ;
            var responsePagedModel = new  ResponsePagedModel
            {
                ListData = seminarModel.ToList(),
                PageNumber = paginationClientModel.PageNumber,
                TotalPage = totalPage
            };
            return responsePagedModel;
        }

        public async Task<SeminarModel> GetByID(int id)
        {
            Seminar seminar = await _context.Seminars.FindAsync(id);
            if (seminar == null)
            {
                throw new Exception("Seminar not found");
            }
            else
            {
                if (seminar.DeletedDate.HasValue)
                {
                    throw new Exception("Seminar not found");
                }
                else
                {
                    string startDate = seminar.StartDate.ToString("yyyy-MM-dd");
                    string endDate = seminar.EndTime.ToString("yyyy-MM-dd");
                    var seminarModel = new SeminarModel
                    {
                        ID = seminar.Id,
                        Name = seminar.Name,
                        Description = seminar.Description,
                        Image = seminar.Image,
                        Location = seminar.Location,
                        Author = seminar.Author,
                        Subject = _subjectService.GetById(seminar.SubjectId),
                        forUser = seminar.forUser,
                        StartDate = startDate,
                        EndDate = endDate
                    };
                    return seminarModel;
                }
            }
        }

        public async Task<List<SeminarModel>> GetListSeminar(string status)
        {
            DateTime dt = DateTime.UtcNow;
            List<Seminar> listSeminar = new();            
            if (status == "upcoming")
            {
                listSeminar = await _context.Seminars.Where(s => s.StartDate > dt).OrderByDescending(s => s.StartDate).ToListAsync();
            }
            if (status == "happening")
            {
                listSeminar = await _context.Seminars.Where(s => s.EndTime > dt).OrderBy(s => s.StartDate).ToListAsync();
            }

            var seminarModel = listSeminar.Where(x => !x.DeletedDate.HasValue).Select(x => new SeminarModel
            {
                ID = x.Id,
                Name = x.Name,
                Description = x.Description,
                Image = x.Image,
                Location = x.Location,
                Author = x.Author,
                Subject = _subjectService.GetById(x.SubjectId),
                forUser = x.forUser,
                StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                EndDate = x.EndTime.ToString("yyyy-MM-dd")
            });
            return seminarModel.Take(6).ToList();
        }

        public async Task<bool> Update(SeminarModel model)
        {
            Seminar seminar = await _context.Seminars.FindAsync(model.ID);
            if (seminar == null)
                throw new Exception("Seminar not found");
            else
            {
                if (model.File != null)
                {
                    seminar.Image = model.Image;
                    _cloudinaryService.DeleteImage(seminar.Image);
                }
                
                seminar.Name = model.Name;
                seminar.Description = model.Description;
                seminar.Location = model.Location;
                seminar.Author = model.Author;
                seminar.SubjectId = model.SubjectId;
                seminar.Subject = await _context.Subjects.FindAsync(model.SubjectId);
                seminar.forUser = model.forUser;
                seminar.StartDate = Convert.ToDateTime(model.StartDate);
                seminar.EndTime = Convert.ToDateTime(model.EndDate);
                seminar.ModifiedDate = DateTime.UtcNow;
                _context.Entry(seminar).State = EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                    return true;
                return false;
            }
        }

        public async Task<bool> Delete(int Id)
        {
            Seminar seminar = await _context.Seminars.FindAsync(Id);
            if (seminar == null)
                throw new Exception("Seminar not found");
            else
            {
                string imagePath = _hostingEnvironment.WebRootPath + "/Images/" + seminar.Image;
                File.Delete(imagePath);
                seminar.DeletedDate = DateTime.UtcNow;
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                    return true;
                return false;
            }
        }

        public async Task<SeminarModel> GetByIDManage(int id)
        {
            Seminar seminar = await _context.Seminars.FindAsync(id);
            if (seminar == null)
            {
                throw new Exception("Seminar not found");
            }
            else
            {
                if (seminar.DeletedDate.HasValue)
                {
                    throw new Exception("Seminar not found");
                }
                else
                {
                    var seminarModel = new SeminarModel
                    {
                        ID = seminar.Id,
                        Name = seminar.Name,
                        Description = seminar.Description,
                        Image = seminar.Image,
                        Location = seminar.Location,
                        Author = seminar.Author,
                        Subject = _subjectService.GetById(seminar.SubjectId),
                        SubjectId = seminar.SubjectId,
                        forUser = seminar.forUser,
                        StartDate = seminar.StartDate.ToString("yyyy-MM-dd HH:mm:ss"),
                        EndDate = seminar.EndTime.ToString("yyyy-MM-dd HH:mm:ss")
                    };
                    return seminarModel;
                }
            }
        }

        public async Task<List<SeminarModel>> UpComingSeminar()
        {
            DateTime dt = DateTime.UtcNow;
            List<SeminarModel> listUpcomingSeminar = new();
            var listSeminar = await _context.Seminars.Where(s => s.StartDate > dt).ToListAsync();
            if(listSeminar.Count() > 0)
            {
                listUpcomingSeminar = listSeminar.Select(x => new SeminarModel
                {
                    ID = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image,
                    Location = x.Location,
                    Author = x.Author,
                    Subject = _subjectService.GetById(x.SubjectId),
                    forUser = x.forUser,
                    StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                    EndDate = x.EndTime.ToString("yyyy-MM-dd")
                }).Take(3).ToList();
                return listUpcomingSeminar;
            }
            else
            {
                return listUpcomingSeminar;
            }
        }

        public async Task<List<SeminarModel>> RelatedSeminar(string subject, int idSeminar)
        {
            List<SeminarModel> listUpcomingSeminar = new();
            DateTime dt = DateTime.UtcNow;
            var listSeminar = await _context.Seminars.Where(s=> s.Subject.Subject1.Equals(subject) && s.Id != idSeminar).Where(s=> s.StartDate > dt).OrderByDescending(s => s.CreatedDate).ToListAsync();
            if (listSeminar.Count() > 0)
            {
                listUpcomingSeminar = listSeminar.Select(x => new SeminarModel
                {
                    ID = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image,
                    Location = x.Location,
                    Author = x.Author,
                    Subject = _subjectService.GetById(x.SubjectId),
                    forUser = x.forUser,
                    StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                    EndDate = x.EndTime.ToString("yyyy-MM-dd")
                }).Take(3).ToList();
                return listUpcomingSeminar;
            }
            else
            {
                return listUpcomingSeminar;
            }
        }
    }
}
