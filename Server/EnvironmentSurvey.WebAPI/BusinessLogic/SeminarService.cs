﻿using EnvironmentSurvey.WebAPI.ClientSide.Models;
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
        public Task<List<SeminarModel>> GetAll(string key);
        public Task<SeminarModel> GetByID(int id);
        public Task<SeminarModel> GetByIDManage(int id);
        public Task<List<SeminarModel>> GetListSeminar();
        public Task<bool> Create(SeminarModel model);
        public Task<bool> Update(SeminarModel model);
        public Task<bool> Delete(int Id);
    }
    public class SeminarService : ISeminarService
    {
        private readonly ESContext _context;
        private IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;

        public SeminarService(ESContext context, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<bool> Create(SeminarModel model)
        {
            var file = model.File;
            if (file != null)
            {
                string imageFolderPath = _hostingEnvironment.WebRootPath + "\\Images";
                if (!Directory.Exists(imageFolderPath))
                {
                    Directory.CreateDirectory(imageFolderPath);
                }
                FileInfo fi = new FileInfo(file.FileName);
                var newfilename = "Image_" + DateTime.UtcNow.ToString("yyyyMMddHHmmssfff") + fi.Extension;
                var path = Path.Combine("", _hostingEnvironment.WebRootPath + "\\Images\\" + newfilename);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    model.Image = newfilename;
                }
            }
            var seminar = new Seminar
            {
                Name = model.Name,
                Description = model.Description,
                Image = model.Image,
                Location = model.Location,
                Author = model.Author,
                Subject = model.Subject,
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

        public async Task<List<SeminarModel>> GetAll(string key)
        {
            List<Seminar> listSeminar = new List<Seminar>();
            listSeminar = listSeminar.Where(s => !s.DeletedDate.HasValue).ToList();
            DateTime dateTime = DateTime.Now;
            var pageNumber = 3;
            var pageSize = 1;

            if (key == "")
            {
                listSeminar = await _context.Seminars.Where(s => s.StartDate > dateTime)
                    .OrderByDescending(s => s.CreatedDate)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }
            else
            {
                listSeminar = await _context.Seminars.Where(s => s.StartDate > dateTime)
                                .Where(s => s.Name.Contains(key) || s.Author.Contains(key) || s.Subject.Contains(key) || s.Description.Contains(key))
                                .OrderByDescending(s => s.CreatedDate).ToListAsync();
            }
            var seminarModel = listSeminar.Select(x => new SeminarModel
            {
                ID = x.Id,
                Name = x.Name,
                Description = x.Description,
                Image = x.Image,
                Location = x.Location,
                Author = x.Author,
                Subject = x.Subject,
                forUser = x.forUser,
                StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                EndDate = x.EndTime.ToString("yyyy-MM-dd")
            });
            return seminarModel.ToList();
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
                        Subject = seminar.Subject,
                        forUser = seminar.forUser,
                        StartDate = startDate,
                        EndDate = endDate
                    };
                    return seminarModel;
                }
            }
        }

        public async Task<List<SeminarModel>> GetListSeminar()
        {
            var listSeminar = await _context.Seminars.ToListAsync();
            var seminarModel = listSeminar.Where(x => !x.DeletedDate.HasValue).Select(x => new SeminarModel
            {
                ID = x.Id,
                Name = x.Name,
                Description = x.Description,
                Image = x.Image,
                Location = x.Location,
                Author = x.Author,
                Subject = x.Subject,
                forUser = x.forUser,
                StartDate = x.StartDate.ToString("yyyy-MM-dd"),
                EndDate = x.EndTime.ToString("yyyy-MM-dd")
            }).OrderBy(s => s.StartDate);
            return seminarModel.ToList();
        }

        public async Task<bool> Update(SeminarModel model)
        {
            Seminar seminar = await _context.Seminars.FindAsync(model.ID);
            if (seminar == null)
                throw new Exception("Seminar not found");
            else
            {
                if(model.File != null)
                {
                    string imagePath = _hostingEnvironment.WebRootPath + "\\Images\\" + seminar.Image;
                    File.Delete(imagePath);
                    var file = model.File;
                    string imageFolderPath = _hostingEnvironment.WebRootPath + "\\Images";
                    if (!Directory.Exists(imageFolderPath))
                    {
                        Directory.CreateDirectory(imageFolderPath);
                    }
                    FileInfo fi = new FileInfo(file.FileName);
                    var newfilename = "Image_" + DateTime.UtcNow.ToString("yyyyMMddHHmmssfff") + fi.Extension;
                    var path = Path.Combine("", _hostingEnvironment.WebRootPath + "\\Images\\" + newfilename);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        seminar.Image = newfilename;
                    }
                }
                seminar.Name = model.Name;
                seminar.Description = model.Description;
                seminar.Location = model.Location;
                seminar.Author = model.Author;
                seminar.Subject = model.Subject;
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
                string imagePath = _hostingEnvironment.WebRootPath + "\\Images\\" + seminar.Image;
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
                        Subject = seminar.Subject,
                        forUser = seminar.forUser,
                        StartDate = seminar.StartDate.ToString("yyyy-MM-dd HH:mm:ss"),
                        EndDate = seminar.EndTime.ToString("yyyy-MM-dd HH:mm:ss")
                    };
                    return seminarModel;
                }
            }
        }
    }
}
