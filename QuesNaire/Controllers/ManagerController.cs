using Newtonsoft.Json;
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
            NaireWebDataContext db = new NaireWebDataContext();
            //  首页显示基本信息
            double user_num = (from r in db.user_info
                            select r.id).Count();
            double naire_num = (from r in db.naire_info
                             select r.id).Count();
            double data_num = (from r in db.data_info
                               select r.id).Count();

            ViewBag.UserNum = user_num;
            ViewBag.NaireNum = naire_num;
            ViewBag.DataNum = data_num;

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

        /// <summary>
        /// 获得最新用户问卷
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult getNewNaireJson()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var naire_result = from r in db.naire_info
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.data
                               };

            return Json(naire_result);
        }

        /// <summary>
        /// 获得未发布问卷
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult getUnPublishNaireJson()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var naire_result = from r in db.naire_info
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.data
                               };

            return Json(naire_result);
        }

        /// <summary>
        /// 获得已发布问卷
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult getPublishedNaireJson()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var naire_result = from r in db.naire_info
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.data
                               };

            return Json(naire_result);
        }

        /// <summary>
        /// 获得全部用户问卷
        /// </summary>
        [HttpPost]
        public JsonResult getAllNaireJson()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var naire_result = from r in db.naire_info
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.data
                               };

            return Json(naire_result);
        }

        /// <summary>
        /// 获得全部用户信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult getAllUserJson()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var user_result = from r in db.user_info
                              select new
                              {
                                  r.id,
                                  r.name,
                                  r.password,
                                  r.avatar
                              };

            return Json(user_result);
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