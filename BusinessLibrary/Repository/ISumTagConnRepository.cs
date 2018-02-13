using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ISumTagConnRepository
    {
        #region Sync Methods
        List<SumTagConn> Get_OrderBySumId_DepthTag();
        #endregion

        #region Async Methods

        #endregion
    }
}
