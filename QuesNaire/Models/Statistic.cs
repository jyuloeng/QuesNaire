using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuesNaire.Models
{
    public class Statistic
    {
        public string title { get; set; }
        public string update_time { get; set; }
        public int data { get; set; }
        public List<questions> questions = new List<questions> { };
    }

    public class questions
    {
        public string title { get; set; }
        public int flag { get; set; }
        public List<string> options = new List<string> { };
        public List<string> replys = new List<string> { };
    }
}