using QuesNaire.App_Code;
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
        [HttpPost]
        public JsonResult login_info(string account, string password)
        {
            user_infoDataContext db = new user_infoDataContext();
            var rs = from r in db.user_info
                     where account == r.account
                     where password == r.password
                     select new
                     {
                         r.id,
                         r.account
                     };
            if (rs.FirstOrDefault() == null)
            {
                return Json(0);
            }

            var rs2 = from r in db.user_info
                      where account == r.account
                      select new
                      {
                          r.id,
                      };
            var ID = rs2.FirstOrDefault().id.ToString();
            return Json(ID);
        }
    }
}