using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace EnvironmentSurvey.WebAPI.DataAccess.Extensions
{
    public interface IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll();
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ESContext context;
        private DbSet<T> entities;

        public Repository(ESContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return entities.Where(x => !x.DeletedDate.HasValue).AsQueryable();
        }

        public T Get(int id)
        {
            return entities.FirstOrDefault(s => s.Id == id && !s.DeletedDate.HasValue);
        }

        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            entity.CreatedDate = DateTime.Now;

            entities.Add(entity);
            context.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entity.ModifiedDate = DateTime.Now;
            context.SaveChanges();
        }

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entity.DeletedDate = DateTime.Now;
            context.SaveChanges();
        }
    }
}
