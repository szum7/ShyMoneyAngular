using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class TagModel
    {
        public TagModel()
        {
            IntellisenseTagConn = new HashSet<IntellisenseTagConnModel>();
            SumTagConn = new HashSet<SumTagConnModel>();
        }

        public decimal Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public decimal? QuickbarPlace { get; set; }

        public decimal? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string State { get; set; }

        public ICollection<IntellisenseTagConnModel> IntellisenseTagConn { get; set; }
        public ICollection<SumTagConnModel> SumTagConn { get; set; }        
    }
}
