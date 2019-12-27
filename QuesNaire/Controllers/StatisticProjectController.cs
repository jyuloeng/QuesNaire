using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 报表统计控制器
    /// </summary>
    public class StatisticProjectController : Controller
    {
        // GET: StatisticProject
        public ActionResult Index()
        {
            string naire_id = Request.QueryString["naire_id"];

            NaireWebDataContext db = new NaireWebDataContext();

            //  先找问卷表拿 问卷标题，描述
            var naires = from r in db.naire_info
                        where r.id == int.Parse(naire_id)
                        select new
                        {
                            r.title,
                            r.hint,
                            r.update_time,
                            r.data
                        };

            //  然后找问题表拿 问题id，flag，题目，选项
            var questions = from r in db.question_info
                           where r.naire_id == int.Parse(naire_id)
                           select new
                           {
                               r.id,
                               r.title,
                               r.flag,
                               r.items
                           };

            //  最后找数据表拿数据

            //  不会连表查询。。先拿个json看一下
            //string naires_json = JsonConvert.SerializeObject(naires);
            //string questions_json = JsonConvert.SerializeObject(questions);


            return View();
        }


        public class NaireHeader
        {

            public string title { get; set; }
   
            public string hint { get; set; }

            public string update_time { get; set; }

            public int data { get; set; }
        }
    }
}