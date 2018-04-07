using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class UserModel
    {
        public UserModel()
        {
            Option = new HashSet<OptionModel>();
        }

        public decimal Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public decimal? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string State { get; set; }

        public ICollection<OptionModel> Option { get; set; }
    }
}
