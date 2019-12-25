using Newtonsoft.Json;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 问卷详情控制器
    /// </summary>
    public class ProjectController : Controller
    {
        // GET: Project
        public ActionResult Index()
        {
            //  获得问卷Id
            string naire_id = Request.QueryString["naire_id"];

            ////  根据问卷Id获得相应问题的Id
            NaireWebDataContext db = new NaireWebDataContext();

            ////  获得问卷标题和描述
            var naire_info = from r in db.naire_info
                             where r.id == int.Parse(naire_id)
                             select new
                             {
                                 r.title,
                                 r.hint
                             };
            ////  获得问卷的问题
            var questions = from r in db.question_info
                               where r.naire_id == int.Parse(naire_id)
                               select new
                               {
                                   r.id,
                                   r.naire_id,
                                   r.title,
                                   r.flag,
                                   r.items
                               };

            


            string naire_header = JsonConvert.SerializeObject(naire_info);
            string naire_list = JsonConvert.SerializeObject(questions);

            NaireHeader naireHeader = new NaireHeader();
            naireHeader.title = naire_info.FirstOrDefault().title.ToString();
            naireHeader.hint = naire_info.FirstOrDefault().hint.ToString();

            // List<NaireListItem> naireList = questions.ToList<NaireListItem>();
            string json = JsonConvert.SerializeObject(questions);
            var list = JsonConvert.DeserializeObject<NaireListItem>(json);

            //  根据相应问题的Id获得选项

            //  拼接成JSON给前台生成问卷（挂个data-quesion-id）的属性




            return View();
        }



    }

    public class NaireHeader
    {
        public string title { get; set; }

        public string hint { get; set; }
    }

    public class NaireListItem
    {
        public int id { get; set; }

        public int naire_id { get; set; }

        public string title { get; set; }

        public int flag { get; set; }

        public List<string> items { get; set; }
    }
}