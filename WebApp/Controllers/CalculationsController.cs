using BusinessLibrary.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    public class CalculationsController : Controller
    {
        public ICalculationRepo repo;

        public CalculationsController(ICalculationRepo repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult GetTagTotalResult(int FROM_YEAR, int FROM_MONTH, int FROM_DAY, int TO_YEAR, int TO_MONTH, int TO_DAY)
        {
            return Json(repo.TagTotalResult(FROM_YEAR, FROM_MONTH, FROM_DAY, TO_YEAR, TO_MONTH, TO_DAY, false));
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetFakeTagTotalResult(int FROM_YEAR, int FROM_MONTH, int FROM_DAY, int TO_YEAR, int TO_MONTH, int TO_DAY)
        {
            return Json(repo.TagTotalResult(FROM_YEAR, FROM_MONTH, FROM_DAY, TO_YEAR, TO_MONTH, TO_DAY, true));
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetFakeMonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH)
        {
            return Json(repo.MonthlySumups(FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, true));
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetMonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH)
        {
            return Json(repo.MonthlySumups(FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, false));
        }
        #endregion
    }
}
