using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using DataAccessLibrary.Models;

namespace WebApp.Controllers
{
    public class TagController : Controller
    {
        public ITagRepo repo;

        public TagController(ITagRepo repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult Get()
        {
            var data = repo.Get();
            return Json(data);
        }
        #endregion

        #region - Save Methods
        [HttpPost, Produces("application/json")]
        public IActionResult Save([FromBody] TagModel TAG)
        {
            return Json(repo.Save(TAG));
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