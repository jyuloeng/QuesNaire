using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 注册控制器
    /// </summary>
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
    }
}