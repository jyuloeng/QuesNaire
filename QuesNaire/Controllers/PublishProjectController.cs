using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 发布项目控制器
    /// </summary>
    public class PublishProjectController : Controller
    {
        // GET: PublishProject
        public ActionResult Index()
        {
            string naire_id = Request.QueryString["naire_id"];

            NaireWebDataContext db = new NaireWebDataContext();

            var result = from r in db.naire_info
                         where r.id == int.Parse(naire_id)
                         select new
                         {
                             r.id,
                             r.title,
                             r.state
                         };
            
            ViewBag.NaireInfo = JsonConvert.SerializeObject(result);

            return View();
        }

        /// <summary>
        /// 更改发布状态
        /// </summary>
        [HttpPost]
        public void changeState(string id ,string state)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var result = from r in db.naire_info
                         where r.id == int.Parse(id)
                         select r;

            if (result != null)
            {
                foreach(naire_info r in result)
                {
                    if(state == "0")
                    {
                        r.state = "收集中";
                    }
                    else
                    {
                        r.state = "未发布";
                    }
                }
            }
            db.SubmitChanges();

        }

        public class NaireStateJsonObject
        {
            public string id;
            public string state;
        }
    }
}