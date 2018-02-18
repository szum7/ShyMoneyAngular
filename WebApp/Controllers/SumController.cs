using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using CRUD.Models;
using BusinessLibrary.Common.Enum;

namespace CRUD.Controllers
{
    public class SumController : Controller
    {
        public ISumRepository repo;

        public SumController(ISumRepository repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult GetOnDates(string dateType, DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            DateTypeEnum dateTypeEnum = DateTypeEnum.INPUT_DATE; // default
            if (dateType == "ACCOUNT_DATE")
                dateTypeEnum = DateTypeEnum.ACCOUNT_DATE;
            else if (dateType == "DUE_DATE")
                dateTypeEnum = DateTypeEnum.DUE_DATE;

            var data = repo.GetOnDates(dateTypeEnum, FROM_DATE, TO_DATE);
            return Json(data);
        }

        [HttpGet, Produces("application/json")]
        public IActionResult Get(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            var data = repo.Get(FROM_DATE, TO_DATE);
            return Json(new { data = data });
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetWithTags(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            var data = repo.GetWithTags(FROM_DATE, TO_DATE);
            return Json(new { data = data });
        }
        #endregion

        #region - Save Methods
        [HttpPost, Produces("application/json")]
        public IActionResult Save([FromBody] Sum SUM)
        {
            return Json(repo.Save(SUM));
        }
        #endregion

        #region - Delete Methods
        [HttpDelete]
        public IActionResult Delete(int ID)
        {
            return Json(repo.Delete(ID));
        }
        #endregion
    }
}