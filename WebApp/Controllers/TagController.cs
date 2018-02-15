using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using CRUD.Models;

namespace CRUD.Controllers
{
    public class TagController : Controller
    {
        public ITagRepository repo;

        public TagController(ITagRepository repo)
        {
            this.repo = repo;
        }

        #region Sync Methods

        #region - Get Methods
        [HttpGet, Produces("application/json")]
        public IActionResult Get()
        {
            var data = repo.Get();
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
        #endregion

        #region - Save Methods
        #endregion

        #region - Delete Methods
        #endregion

        #endregion
    }
}