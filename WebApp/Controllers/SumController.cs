using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using CRUD.Models;

namespace CRUD.Controllers
{
    public class SumController : Controller
    {
        public ISumRepository repo;

        public SumController(ISumRepository repo)
        {
            this.repo = repo;
        }

        #region Sync Methods

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult Get(DateTime? fromDate, DateTime? toDate)
        {
            var data = repo.Get(fromDate, toDate);
            return Json(new { result = data });
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetWithTags(DateTime? fromDate, DateTime? toDate)
        {
            var data = repo.GetWithTags(fromDate, toDate);
            return Json(new { result = data });
        }
        #endregion

        #region - Save Methods
        #endregion

        #region - Delete Methods
        #endregion

        #endregion

        #region Async Methods

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetSums()
        {
            var data = await repo.GetAsync();
            return Json(new { result = data });
        }
        #endregion

        #region - Save Methods
        [HttpPost, Produces("application/json")]
        public async Task<IActionResult> SaveSum([FromBody] Sum model)
        {
            return Json(await repo.SaveAsync(model));
        }
        #endregion

        #region - Delete Methods
        [HttpDelete]
        public async Task<IActionResult> DeleteSumByID(int id)
        {
            return Json(await repo.DeleteAsync(id));
        }
        #endregion

        #endregion
    }
}