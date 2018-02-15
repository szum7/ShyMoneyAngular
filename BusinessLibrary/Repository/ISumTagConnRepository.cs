using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ISumTagConnRepository
    {
        List<SumTagConn> Get_OrderBySumId_DepthTag();
    }
}
