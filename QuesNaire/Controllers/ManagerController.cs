using Newtonsoft.Json;
using QuesNaire.Models;
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
        private string id { get; set; }
        // GET: Manager
        public ActionResult Index()
        {

            id = Request.QueryString["id"];

            if (id != null)
            {
                HttpCookie cookie = new HttpCookie("manage_id");
                cookie.Value = id;
                Response.Cookies.Add(cookie);
            }
            else
            {
                Response.Redirect("~/Manager/ManagerLogin");
                return View();
            }


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


            getManageInfo();

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

        private AdminInfo admin = new AdminInfo();
        /// <summary>
        /// 获取管理员信息
        /// </summary>
        public void getManageInfo()
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var rs = from r in db.admin_info
                     where id == r.id.ToString()
                     select new
                     {
                         r.account,
                         r.password,
                         r.name
                     };
            var account = rs.FirstOrDefault().account;
            var name = rs.FirstOrDefault().name;
            var password = rs.FirstOrDefault().password;

            admin.Manage_account = account;
            admin.Manage_name = name;
            admin.Manage_password = password;

            HttpCookie cookie = new HttpCookie("manage_account");
            cookie.Value = admin.Manage_account;
            Response.Cookies.Add(cookie);
            HttpCookie cookie2 = new HttpCookie("manage_name");
            cookie2.Value = admin.Manage_name;
            Response.Cookies.Add(cookie2);
            HttpCookie cookie3 = new HttpCookie("manage_password");
            cookie3.Value = admin.Manage_password;
            Response.Cookies.Add(cookie3);



        }
    }
}