using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLibrary.Repository
{
    public interface ISumRepository
    {
        #region Sync Methods
        List<Sum> Get(DateTime? fromDate = null, DateTime? toDate = null);
        Sum Save(Sum model);
        bool Delete(int id);
        #endregion

        #region Async Methods
        Task<List<Sum>> GetAsync(DateTime? fromDate = null, DateTime? toDate = null);
        Task<Sum> SaveAsync(Sum model);
        Task<bool> DeleteAsync(int id);
        #endregion
    }
}
