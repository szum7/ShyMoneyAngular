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
        public IActionResult GetFakeMonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH)
        {
            var data = repo.MonthlySumups(FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, true);
            return Json(data);
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetMonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH)
        {
            var data = repo.MonthlySumups(FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, false);
            return Json(data);
        }
        #endregion
    }
}
