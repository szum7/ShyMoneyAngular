﻿using System;
using System.Collections.Generic;
using System.Text;
using DataAccessLibrary.Models;

namespace BusinessLibrary.Repository
{
    public interface ITagRepo
    {
        List<TagModel> Get();
        TagModel Save(TagModel model);
        bool Delete(int id);
    }
}
