using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.Models
{
    public partial class IntellisenseTagConnModel
    {
        public decimal Id { get; set; }
        public decimal IntellisenseId { get; set; }
        public decimal TagId { get; set; }

        public IntellisenseModel Intellisense { get; set; }
        public TagModel Tag { get; set; }
    }
}
