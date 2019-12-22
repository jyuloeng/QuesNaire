using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 登录页控制器
    /// </summary>
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
    }
}