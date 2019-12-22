using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 后台管理控制器
    /// </summary>
    public class ManagerController : Controller
    {
        // GET: Manager
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 后台登录页
        /// </summary>
        /// <returns></returns>
        public ActionResult ManagerLogin()
        {
            return View();
        }
    }
}