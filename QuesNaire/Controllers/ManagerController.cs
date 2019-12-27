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
            string today = DateTime.Now.ToString("yyyy/MM/dd");//获取当前日期
            NaireWebDataContext db = new NaireWebDataContext();
            var naire_result = from r in db.naire_info where r.start_time == today
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.recycle,
                                   r.recycle_time,
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
                               where r.state == "未发布"
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.recycle,
                                   r.recycle_time,
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
                               where r.state == "收集中"
                               select new
                               {
                                   r.id,
                                   r.title,
                                   r.state,
                                   r.start_time,
                                   r.update_time,
                                   r.recycle,
                                   r.recycle_time,
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
                                   r.recycle,
                                   r.recycle_time,
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
        public JsonResult Manage_Login_Info(string account, string password)
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

        /// <summary>
        /// 修改管理员信息
        /// </summary>
        /// <param name="account"></param>
        /// <param name="name"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Change_Admin_Info(string account,string name,string password)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var rs = from r in db.admin_info
                     where r.account == account
                     select r;
            if (rs != null)
            {
                foreach(admin_info r in rs)
                {
                    r.name = name;
                    r.password = password;
                }
            }
            else
            {
                return Json(0);
            }

            db.SubmitChanges();
            return Json(1);
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

        [HttpPost] //表的编辑
        public void editNaireInfo(naire_info naire)
        {
            NaireWebDataContext db = new NaireWebDataContext();

                var res = from p in db.naire_info
                          where p.id ==naire.id
                          select p;
                if (res.FirstOrDefault()!=null)
                {
                    foreach (naire_info ca in res)
                    {
                        ca.title = naire.title;
                        ca.state = naire.state;
                        ca.update_time = naire.update_time;
                        ca.start_time = naire.start_time;
                        ca.data = naire.data;
                        ca.recycle = naire.recycle;
                    }
                    db.SubmitChanges();
                }
        }

        [HttpPost]
        public void DelateNaireInfo(int naire_id)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            var result = from r in db.naire_info
                         where r.id == naire_id
                         select r;
            db.naire_info.DeleteAllOnSubmit(result);

            List<question_info> question_results = (from r in db.question_info
                                                    where r.naire_id == naire_id
                                                    select r).ToList();
            db.question_info.DeleteAllOnSubmit(question_results);

            for (int j = 0; j < question_results.Count; j++)
            {
                var data_results = from r in db.data_info
                                   where r.question_id == question_results[j].id
                                   select r;
                db.data_info.DeleteAllOnSubmit(data_results);
            }

            db.SubmitChanges();
        }
        [HttpPost]
        public void instertNaireInfo(user_info naire_add)
        {
            user_info ca = new user_info();
            ca.name = naire_add.name;
            ca.password = naire_add.password;
            ca.avatar = ca.avatar;
            NaireWebDataContext db = new NaireWebDataContext();
            db.user_info.InsertOnSubmit(ca);
            db.SubmitChanges();
        }
        [HttpPost]
        public void editNaireInfo_user(user_info naire)
        {
            NaireWebDataContext db = new NaireWebDataContext();

            var res = from p in db.user_info
                      where p.id == naire.id
                      select p;
            if (res.FirstOrDefault() != null)
            {
                foreach (user_info ca in res)
                {
                    ca.name = naire.name;
                    ca.password = naire.password;
                    ca.avatar = naire.avatar;
                   
                }
                db.SubmitChanges();
            }
        }
        [HttpPost]
        public void DelateNaireInfo_User(int naire_id_user)
        {
            NaireWebDataContext db = new NaireWebDataContext();
            try
            {
                var result = from r in db.user_info
                             where r.id == naire_id_user
                             select r;
                db.user_info.DeleteAllOnSubmit(result);
                db.SubmitChanges();
            }
            catch
            {

            }
        }

    }
}