using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class TagController : Controller
    {
        public ITagRepository repo;

        public TagController(ITagRepository repo)
        {
            this.repo = repo;
        }

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult Get()
        {
            var data = repo.Get();
            return Json(new { result = data });
        }
        #endregion

        #region - Save Methods
        [HttpPost, Produces("application/json")]
        public IActionResult Save([FromBody] Tag TAG)
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