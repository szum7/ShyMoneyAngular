using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;

namespace WebApp.Controllers
{
    public class DateController : Controller
    {
        public IDateRepo repo;

        public DateController(IDateRepo repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult GetDateStringRange(string dateFrom, string dateTo)
        {            
            return Json(repo.GetDateStringRange(dateFrom, dateTo));
        }
        #endregion
    }
}