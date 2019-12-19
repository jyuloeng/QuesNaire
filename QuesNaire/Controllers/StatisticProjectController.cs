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
            return View();
        }
    }
}