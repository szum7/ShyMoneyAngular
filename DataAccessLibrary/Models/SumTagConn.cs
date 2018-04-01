using System;
using System.Collections.Generic;

namespace WebApp.Models
{
    public partial class SumTagConnModel
    {
        public decimal ID { get; set; }
        public decimal SUM_ID { get; set; }
        public decimal TAG_ID { get; set; }

        public SumModel SUM { get; set; }
        public TagModel TAG { get; set; }
    }
}
