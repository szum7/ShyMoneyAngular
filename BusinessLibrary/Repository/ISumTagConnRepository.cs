using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ISumTagConnRepository
    {
        List<SumTagConnModel> Get_OrderBySumId_DepthTag();
    }
}
