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
        public ISumRepository sumRepo;

        public SumController(ISumRepository val)
        {
            sumRepo = val;
        }

        [HttpGet, Produces("application/json")]
        public IActionResult GetSumsSync()
        {
            var data = sumRepo.GetSync(new DateTime(2017, 08, 10), new DateTime(2018, 10, 10));
            return Json(new { result = data });
        }

        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetSums()
        {
            var data = await sumRepo.GetAllSum();
            return Json(new { result = data });
        }

        [HttpPost, Produces("application/json")]
        public async Task<IActionResult> SaveSum([FromBody] Sum model)
        {
            return Json(await sumRepo.SaveSum(model));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteSumByID(int id)
        {
            return Json(await sumRepo.DeleteSumByID(id));
        }
    }
}