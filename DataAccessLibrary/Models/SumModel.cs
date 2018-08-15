using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.Models
{
    public partial class SumModel
    {
        public List<TagModel> Tags { get; set; }

        public SumModel()
        {
            this.Tags = new List<TagModel>();
            this.SumTagConn = new List<SumTagConnModel>();
        }
    }
}
