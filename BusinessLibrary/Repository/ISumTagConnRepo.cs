using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ISumTagConnRepo
    {
        List<SumTagConnModel> Get_OrderBySumId_DepthTag();
    }
}
