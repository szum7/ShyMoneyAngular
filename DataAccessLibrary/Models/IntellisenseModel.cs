using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class IntellisenseModel
    {
        public List<TagModel> Tags { get; set; }

        public IntellisenseModel()
        {
            this.IntellisenseTagConn = new HashSet<IntellisenseTagConnModel>();
            this.Tags = new List<TagModel>();
        }
    }
}
