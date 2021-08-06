using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.ClientSide.Models
{
    public class PaginationClientModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPage { get; set; }
        public PaginationClientModel()
        {
            this.PageNumber = 1;
            this.PageSize = 6;
        }
    }
}
