using System;
using System.Collections.Generic;

namespace CRUD.Models
{
    public partial class SumTagConn
    {
        public decimal ID { get; set; }
        public decimal SUM_ID { get; set; }
        public decimal TAG_ID { get; set; }

        public Sum SUM { get; set; }
        public Tag TAG { get; set; }
    }
}
