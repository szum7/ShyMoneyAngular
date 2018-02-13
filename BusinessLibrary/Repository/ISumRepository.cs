using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLibrary.Repository
{
    public interface ISumRepository
    {
        List<Sum> GetSync(DateTime? fromDate = null, DateTime? toDate = null);
        Task<List<Sum>> GetAllSum();
        Task<bool> SaveSum(Sum model);
        Task<bool> DeleteSumByID(int id);
    }
}
