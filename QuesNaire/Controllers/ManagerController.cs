using QuesNaire.App_Code;
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
        [HttpPost]
        public JsonResult Manage_Login_Info(string account,string password)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var rs = from r in db.admin_info
                     where r.account == account
                     where r.password == password
                     select new
                     {
                         r.id,
                         r.account
                     };

            if (rs.FirstOrDefault() == null)
            {
                return Json(0);
            }

            var rs2 = from r in db.admin_info
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