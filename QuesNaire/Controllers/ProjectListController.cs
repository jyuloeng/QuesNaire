using QuesNaire.App_Code;
using QuesNaire.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuesNaire.Controllers
{
    /// <summary>
    /// 项目列表控制器
    /// </summary>
    public class ProjectListController : Controller
    {
        private string id;
        // GET: Project
        public ActionResult Index()
        {
            id =  Request.QueryString["id"];
            if (id != null)
            {
                HttpCookie cookie = new HttpCookie("user_id");
                cookie.Value = id;
                Response.Cookies.Add(cookie);
            }
            else
                return View();
            if (Request.Cookies["user_id"] != null)
            {
                user_infoDataContext db = new user_infoDataContext();
                var rs = from r in db.user_info
                         where id == r.id.ToString()
                         select new
                         {
                             r.account,
                             r.name,
                             r.avatar
                         };
                _ = Request.Cookies["user_id"];
                var name = rs.FirstOrDefault().name;
                var account = rs.FirstOrDefault().account;
                var avatar = rs.FirstOrDefault().avatar;
                user.Name = name;
                user.Id = int.Parse(id);
                user.Account = account;
                user.Avatar = avatar;
                HttpCookie cookie = new HttpCookie("user_account");
                cookie.Value = user.Account;
                Response.Cookies.Add(cookie);
                HttpCookie cookie2 = new HttpCookie("user_name");
                cookie2.Value = user.Name;
                Response.Cookies.Add(cookie2);
                HttpCookie cookie3 = new HttpCookie("user_avatar");
                cookie3.Value = user.Avatar;
                Response.Cookies.Add(cookie3);
            }
            
            return View();
        }
        private UserInfo user = new UserInfo();
    }
}