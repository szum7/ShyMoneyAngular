using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class SumTagConnModel
    {
        public decimal Id { get; set; }
        public decimal SumId { get; set; }
        public decimal TagId { get; set; }

        public SumModel Sum { get; set; }
        public TagModel Tag { get; set; }
    }
}
