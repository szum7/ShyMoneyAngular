using System;
using BusinessLibrary.Repository;
using DataAccessLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApp.Controllers
{
    public class IntellisenseController : Controller
    {
        public IIntellisenseRepo repo;

        public IntellisenseController(IIntellisenseRepo repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult Get()
        {
            return Json(repo.Get());
        }
        #endregion

        #region - Save Methods
        [HttpPost, Produces("application/json")]
        public IActionResult Save([FromBody] IntellisenseModel INTELLISENSE)
        {
            return Json(repo.Save(INTELLISENSE));
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
