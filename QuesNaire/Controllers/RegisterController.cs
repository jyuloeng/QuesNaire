
using QuesNaire.Models;
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
        [HttpPost]
        public JsonResult register_info(string account, string password, string name)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var rs = from r in db.user_info
                     where account == r.account
                     select new
                     {
                         r.id,
                         r.account
                     };
            if (rs.FirstOrDefault() != null)
            {
                return Json(0);
            }
            user_info user = new user_info();
            user.account = account;
            user.password = password;
            user.name = name;
            db.user_info.InsertOnSubmit(user);
            db.SubmitChanges();

            var rs2 = from r in db.user_info
                      where account == r.account
                      select new
                      {
                          r.id,
                      };
            var ID = rs2.FirstOrDefault().id.ToString();
            return Json(ID);
        }
        /// <summary>
        /// 判断用户名、手机号、邮箱是否已经存在
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult JudgmentExists(string str)
        {
            NaireWebDataContext db = new NaireWebDataContext();

            if (str=="name")
            {
                var rs = from r in db.user_info
                         where str == r.name
                         select new
                         {
                             r.name
                         };
                if (rs.FirstOrDefault() == null)
                {
                    return Json(1);
                }
            }
            else if(str == "account")
            {
                var rs = from r in db.user_info
                         where str == r.account
                         select new
                         {
                             r.account
                         };
                if (rs.FirstOrDefault() == null)
                {
                    return Json(1);
                }
            }
            return Json(0);
            
        }
    }
}