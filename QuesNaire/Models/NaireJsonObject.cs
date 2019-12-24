using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuesNaire.Models
{
    public class NaireJsonObject
    {
        /// <summary>
        /// 问卷标题
        /// </summary>
        public string title { get; set; }
        /// <summary>
        /// 感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！
        /// </summary>
        public string hint { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<ListItem> list { get; set; }
    }

    public class ListItem
    {
        /// <summary>
        /// 请选择一个选项
        /// </summary>
        public string title { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int flag { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<string> items { get; set; }
    }
}